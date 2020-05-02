import MockAdapter from "axios-mock-adapter";

import { httpClient } from "../utils/httpClient";

export function getPlaces() {
  const mock = new MockAdapter(httpClient);
  mock.onGet("/places").reply(200, [
    {
      id: 4,
      name: "Green",
      type: "product",
      modifier: "super",
      address: "Минск ул.Петра Глебки 5",
      coordinate: {
        id: 3,
        lat: 53.90827480000001,
        lng: 27.4697201,
      },
    },
    {
      id: 5,
      name: "ProStore",
      type: "product",
      modifier: "regular",
      address: "Минск ул.Дзержинского 134",
      coordinate: {
        id: 1,
        lat: 53.90827480000001,
        lng: 27.4697201,
      },
    },
  ]);

  return httpClient.get("/places");
}
