import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, EventTracker } from '@devexpress/dx-react-chart';
import { Chart, BarSeries, ArgumentAxis, ValueAxis, Tooltip } from '@devexpress/dx-react-chart-material-ui';

const mockedData = [
  { time: '10', crowdLevel: 6.930 },
  { time: '11', crowdLevel: 3.018 },
  { time: '12', crowdLevel: 2.525 },
  { time: '13', crowdLevel: 4.440 },
  { time: '14', crowdLevel: 3.682 },
];

export const MainChart = () => {
  const [targetItem, setTargetItem] = useState(undefined);

  return (
    <NoSsr>
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid item style={{ width: '100%' }}>
          <Paper>
            <Chart data={mockedData}>
              <ArgumentScale factory={scaleBand} />
              <ArgumentAxis />
              <ValueAxis />

              <BarSeries
                valueField="crowdLevel"
                argumentField="time"
              />

              <EventTracker />
              <Tooltip targetItem={targetItem} onTargetItemChange={setTargetItem} />
            </Chart>
          </Paper>
        </Grid>
        <Grid item>
          <Button variant="contained" color="inherit">
            Discover statistic
          </Button>
        </Grid>
      </Grid>
    </NoSsr>
  )
};

export default MainChart;
