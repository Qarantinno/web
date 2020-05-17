import dayjs from "dayjs";

import { IParsedStats } from "../interfaces/IStats";

export function getChartDataFromStats(stats: IParsedStats[]) {
  return stats.map((item) => {
    const time = dayjs(item.date).minute(0).second(0).millisecond(0);

    return {
      x: time.toDate(),
      y: item.value,
    };
  });
}
