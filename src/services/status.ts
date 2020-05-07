import MockAdapter from "axios-mock-adapter";
import { AxiosResponse } from 'axios';

import { httpClient } from "../utils/httpClient";
import { Statuses } from '../enums/Statuses';

export interface IGetStatusResponse {
  status: Statuses
}

export function getStatus(): Promise<AxiosResponse<IGetStatusResponse>> {
  const mock = new MockAdapter(httpClient, { delayResponse: 3000 });
  mock.onGet("/status").reply(200, {
    status: Statuses.NOT_THE_BEST
  });

  return httpClient.get("/status");
}
