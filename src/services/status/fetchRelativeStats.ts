import { Dayjs } from "dayjs";

import { fetchStats } from "./fetchStats";
import { IParsedStats } from "./interfaces/IStats";

export interface IFetchRelativeStatsParams {
  from: Dayjs;
  to: Dayjs;
}

export function fetchRelativeStats(
  params: IFetchRelativeStatsParams
): Promise<IParsedStats[]> {
  const { from, to } = params;
  const diff = to.diff(from, "day");
  const requests = [];

  for (let i = 0; i <= diff; i += 1) {
    requests.push(fetchStats({ moment: from.add(i, "day").toISOString() }));
  }

  return Promise.all(requests).then((all) =>
    all.reduce<IParsedStats[]>((result, item, index) => {
      if (index === 0) {
        return [
          ...item.filter(({ date }) =>
            all.length === 1
              ? from.isBefore(date) && to.isAfter(date)
              : from.isBefore(date)
          ),
        ];
      }

      if (index === all.length - 1) {
        return [...result, ...item.filter(({ date }) => to.isAfter(date))];
      }

      return [...result, ...item];
    }, [])
  );
}
