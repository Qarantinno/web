import { Statuses } from "../../../enums/Statuses";

export function getStatusFromCountOfPeople(value: number) {
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
