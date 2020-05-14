import React, { useEffect, useRef } from 'react';

import Chart from "chart.js";

import { getStatusFromCountOfPeople, IHourStats } from '../services/status';
import { theme } from '../utils/theme';
import { Statuses } from '../enums/Statuses';

export interface ICrowdChartProps {
  data?: IHourStats[];
}

export const CrowdChart = ({ data }: ICrowdChartProps) => {
  const canvasElement = useRef(null);

  useEffect(() => {
    const ctx = canvasElement.current;

    if (ctx && data) {
      new Chart(ctx, {
        type: 'bar',
        options: {
          tooltips: {
            cornerRadius: 2
          },
          legend: {
            display: false
          }
        },
        data: {
          labels: data.map(item => item.name),
          datasets: [{
            data: data.map(item => item.value),
            backgroundColor: ({ dataIndex}) => {
              if (!dataIndex) return theme.palette.info.main;
              const value = data[dataIndex].value;

              switch (getStatusFromCountOfPeople(value)) {
                case Statuses.PERFECT:
                  return theme.palette.success.main;
                case Statuses.NICE:
                  return theme.palette.info.main;
                case Statuses.NOT_BEST:
                  return theme.palette.warning.main;
                case Statuses.NO_WAY:
                  return theme.palette.error.main;
                default:
                  return theme.palette.info.main;
              }
            }
          }],
        }
      });
    }
  }, [canvasElement, data])

  return <canvas ref={canvasElement} />;
};

export default CrowdChart;
