import React, { useEffect, useRef } from "react";

import dayjs from "dayjs";

import Chart, { ChartPoint } from "chart.js";

import { createCrowdChart } from "../utils/createCrowdChart";

export interface ICrowdChartProps {
  data: ChartPoint[];
  drag?: boolean;
}

export const CrowdChart = ({ data, drag }: ICrowdChartProps) => {
  const chartCtx = useRef<Chart | null>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  const currentHour = dayjs().minute(30).second(0).millisecond(0);

  useEffect(() => {
    if (canvasElement?.current) {
      const min = currentHour.subtract(3, "hour").toDate();
      const max = currentHour.add(3, "hour").toDate();

      chartCtx.current = createCrowdChart({
        canvas: canvasElement.current,
        drag: drag,
        min: min,
        max: max,
        limit: {
          min: currentHour.hour(0).toDate(),
          max: currentHour.hour(24).toDate(),
        },
      });
    }
  }, [canvasElement, drag, currentHour]);

  useEffect(() => {
    if (chartCtx?.current instanceof Chart) {
      const chart = chartCtx.current;
      const datasets = chart.data.datasets;

      if (datasets && datasets.length > 0) {
        datasets[0].data = data;
        chart.update();
      }
    }
  }, [chartCtx, data]);

  return <canvas ref={canvasElement} />;
};

export default CrowdChart;
