import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import NoSsr from "@material-ui/core/NoSsr";

import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale, EventTracker } from "@devexpress/dx-react-chart";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";

const mockedData = [
  { time: "10", crowdLevel: 6.93 },
  { time: "11", crowdLevel: 3.018 },
  { time: "12", crowdLevel: 2.525 },
  { time: "13", crowdLevel: 4.44 },
  { time: "14", crowdLevel: 3.682 },
];

export const CrowdChart = () => {
  const [targetItem, setTargetItem] = useState(undefined);

  return (
    <NoSsr>
      <Paper>
        <Chart data={mockedData}>
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="crowdLevel" argumentField="time" />

          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={setTargetItem} />
        </Chart>
      </Paper>
    </NoSsr>
  );
};

export default CrowdChart;