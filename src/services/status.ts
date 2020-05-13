import { AxiosResponse } from 'axios';

import dayjs from "dayjs";

import { httpClient } from '../utils/httpClient';
import { Statuses } from '../enums/Statuses';

export interface IInterval { from: number; to: number; }

export interface IHourStats { name: string; value: number; }

export interface IHalvesStatus { name: string; value: number; }

export interface IGetStatsResponse {
  hours: IHourStats[];
  halves: IHalvesStatus[];
}

export interface IGetStatusParams {
  moment?: string;
  place?: string;
  placeModifier?: string;
  weekDay?: string;
}

export function getStats(params?: IGetStatusParams): Promise<AxiosResponse<IGetStatsResponse>> {
  return httpClient.get(`/stats`, { params });
}

export function getRelativeStats(interval?: IInterval): Promise<IHourStats[]> {
  if (interval) {
    const from = interval.from < 0 
      ? dayjs().subtract(-interval.from, 'hour') 
      : dayjs().add(interval.from, 'hour');

    const to = interval.to < 0
      ? dayjs().subtract(-interval.to, 'hour')
      : dayjs().add(interval.to, 'hour');
    
    if (to.date() - from.date() === 1) {
      return Promise.all([
        getStats({ moment: from.toISOString() }),
        getStats({ moment: to.toISOString() }),
      ]).then(([before, after]) => {
        return [
          ...before.data.hours.filter(item => {
            const [ hour ] = item.name.split(':').map(unit => parseInt(unit));
            return hour >= from.hour();
          }),
          ...after.data.hours.filter(item => {
            const [ hour ] = item.name.split(':').map(unit => parseInt(unit));
            return hour <= to.hour();
          })
        ]
      })
    }
    
    return getStats().then(({ data }) => {
      return data.hours.filter(item => {
        const [ hour ] = item.name.split(':').map(unit => parseInt(unit));
        return hour >= from.hour() && hour <= to.hour();
      })
    });
  }

  return getStats().then(({ data }) => data.hours );
}

export function getStatusFromStats(hours: IHourStats[]): Statuses {
  const time = new Date();
  time.setMinutes(time.getMinutes() + 20);

  const countOfPeople = hours.find(hour => hour.name === `${time.getHours()}:00`)?.value;

  return getStatusFromCountOfPeople(countOfPeople);
}

export function getStatusFromCountOfPeople(value: number | undefined) {
  if (value === undefined) return Statuses.UNDEFINED;

  const isItPerfect = value <= 20;
  const isItNice = value > 20 && value <= 30;
  const isItNormal = value > 30 && value < 60;
  const isItBad = value >= 60;

  if (isItPerfect) return Statuses.PERFECT;
  if (isItNice) return Statuses.NICE;
  if (isItNormal) return Statuses.NOT_BEST;
  if (isItBad) return Statuses.NO_WAY;

  return Statuses.UNDEFINED;
}
