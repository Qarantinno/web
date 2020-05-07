import MockAdapter from 'axios-mock-adapter';
import { AxiosResponse } from 'axios';

import { httpClient } from '../utils/httpClient';
import { Statuses } from '../enums/Statuses';

export interface IGetStatusResponse {
  status: Statuses
}

export function getStatus(): Promise<AxiosResponse<IGetStatusResponse>> {
  const mock = new MockAdapter(httpClient, { delayResponse: 1500 });

  const statuses = [
    Statuses.PERFECT,
    Statuses.NICE,
    Statuses.NOT_BEST,
    Statuses.NO_WAY,
  ];

  mock.onGet("/status").reply(200, {
    status: statuses[Math.floor(Math.random() * 4)]
  });

  return httpClient.get("/status");
}
