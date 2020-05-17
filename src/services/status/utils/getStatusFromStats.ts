import dayjs from "dayjs";

import { Statuses } from "../../../enums/Statuses";

import { IParsedStats } from "../interfaces/IStats";
import { getStatusFromCountOfPeople } from "./getStatusFromCountOfPeople";

export function getStatusFromStats(stats: IParsedStats[]): Statuses {
  const time = dayjs().add(20, "minute");
  const found = stats.find((item) => time.isSame(item.date, "hour"));

  return found ? getStatusFromCountOfPeople(found.value) : Statuses.UNDEFINED;
}
