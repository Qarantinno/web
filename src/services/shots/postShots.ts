import { AxiosResponse } from 'axios';

import { httpClient } from '../../utils/httpClient';
import { PlaceSizes } from '../../enums/PlaceSizes';

export interface IPostShotsParams {
  people: number;
  place: {
    type?: string;
    modifier: PlaceSizes;
  };
  source?: 'web';
  shotAt?: string;
  trackingData?: {
    sessionId?: string;
    sourceId?: 'web';
  };
}

export function postShots(params?: IPostShotsParams): Promise<AxiosResponse> {
  return httpClient.post(`/shots`, {
    params: {
      ...params,
      source: 'web',
      trackingData: {
        sessionId: params?.trackingData?.sourceId,
        sourceId: 'web'
      }
    }
  });
}
