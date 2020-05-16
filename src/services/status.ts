import { AxiosResponse } from 'axios';

import dayjs, { Dayjs } from 'dayjs';

import { httpClient } from '../utils/httpClient';
import { Statuses } from '../enums/Statuses';

export interface IHourStats { name: string; value: number; date: Date }

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
  const date = params?.moment;

  return httpClient.get(`/stats`, { params }).then((res) => {
    if (!date) {
      const hours = res.data.hours.map((item: IHourStats) => ({
        ...item,
        date: dayjs()
          .hour(Number.parseInt(item.name.split(':')[0]))
          .minute(0)
          .second(0)
          .millisecond(0)
      }));

      return {
        ...res,
        data: { ...res.data, hours }
      }
    }

    const hours = res.data.hours.map((item: IHourStats) => ({
      ...item,
      date: dayjs(date)
        .hour(Number.parseInt(item.name.split(':')[0]))
        .minute(0)
        .second(0)
        .millisecond(0)
    }));

    return {
      ...res,
      data: { ...res.data, hours }
    }
  });
}

export interface IGetRelativeStatsParams { from: Dayjs; to: Dayjs; }

export function getRelativeStats(params?: IGetRelativeStatsParams): Promise<IHourStats[]> {
  if (!params) {
    return getStats().then(({ data }) => data.hours );
  }

  const { from, to } = params;

  const diff = to.diff(from, 'day');

  const requests = [];

  for (let i = 0; i <= diff; i += 1) {
    requests.push(getStats({ moment: from.add(i, 'day').toISOString() }));
  }

  return Promise.all(requests)
    .then(all => all.reduce<IHourStats[]>((result, item, index) => {
      if (index === 0) {
        return [
          ...item.data.hours.filter(({ date }) => all.length === 1
            ? from.isBefore(date) && to.isAfter(date)
            : from.isBefore(date)
          ),
        ];
      }

      if (index === all.length - 1) {
        return [
          ...result,
          ...item.data.hours.filter(({ date }) => to.isAfter(date)),
        ];
      }

      return [
        ...result,
        ...item.data.hours,
      ];
    }, []));
}

export function getStatusFromStats(hours: IHourStats[]): Statuses {
  const time = dayjs().add(20, 'minute');
  const countOfPeople = hours.find(item => time.isSame(item.date, 'hour'))?.value;

  return getStatusFromCountOfPeople(countOfPeople);
}

export function getChartDataFromStats(hours: IHourStats[]) {
  return hours.map(item => {
    const time = dayjs(item.date).minute(0).second(0).millisecond(0);

    return {
      x: time.toDate(),
      y: item.value
    }
  })
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
