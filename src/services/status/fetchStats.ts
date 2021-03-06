import dayjs from "dayjs";

import { httpClient } from "../../utils/httpClient";

import { IStats, IParsedStats } from "./interfaces/IStats";
import { CancelToken } from 'axios';

export interface IFetchStatsResponse {
  hours: IStats[];
  halves: IStats[];
}

export interface IFetchStatsParams {
  moment: string;
  place?: string;
  placeModifier?: string;
  weekDay?: string;
}

export function fetchStats(params: IFetchStatsParams, cancelToken: CancelToken): Promise<IParsedStats[]> {
  return httpClient
    .get<IFetchStatsResponse>(`/stats`, { params, cancelToken })
    .then(({ data }) => {
      return data.hours.map(({ name, value }: IStats) => {
        const hour = Number.parseInt(name.split(":")[0]);
        const date = dayjs(params.moment)
          .hour(hour)
          .minute(0)
          .second(0)
          .millisecond(0)
          .toDate();

        return { date, value };
      });
    });
}
