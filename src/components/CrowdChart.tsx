import React, { useEffect, useRef } from 'react';

import dayjs from 'dayjs';

import { ChartPoint } from 'chart.js';
import { crowdChart } from '../utils/crowdChart';

export interface ICrowdChartProps {
  data: ChartPoint[];
  drag?: boolean;
}

export const CrowdChart = ({ data, drag }: ICrowdChartProps) => {
  const chartCtx = useRef<any>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasElement?.current) {
      const min = dayjs().subtract(3, 'hour').minute(30).second(0).toDate();
      const max = dayjs().add(3, 'hour').minute(30).second(0).toDate();

      chartCtx.current = crowdChart({
        canvas: canvasElement.current,
        drag: drag,
        min: min,
        max: max,
        limit: {
          min: dayjs().hour(0).minute(0).second(0).subtract(30, 'minute').toDate(),
          max: dayjs().hour(24).minute(0).second(0).add(30, 'minute').toDate(),
        }
      });
    }
  }, [canvasElement, drag]);
  
  useEffect(() => {
    if (chartCtx?.current?.data?.datasets) {
      chartCtx.current.data.datasets[0].data = data;
      chartCtx.current.update();
    }
  }, [chartCtx, data]);

  return (
    <canvas ref={canvasElement} />
  );
};

export default CrowdChart;
