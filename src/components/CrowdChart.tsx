import React, { useEffect, useRef } from 'react';

import Chart from "chart.js";
import "chartjs-plugin-zoom";

import { getStatusFromCountOfPeople, IHourStats } from '../services/status';
import { theme } from '../utils/theme';
import { Statuses } from '../enums/Statuses';

export interface ICrowdChartProps {
  data: IHourStats[];
  zoom?: boolean;
  drag?: boolean;
}

export const CrowdChart = ({ data, zoom, drag }: ICrowdChartProps) => {
  const canvasElement = useRef(null);

  useEffect(() => {
    const ctx = canvasElement.current;

    if (ctx && data) {
      new Chart(ctx, {
        type: 'bar',
        options: {
          responsive: true,
          tooltips: {
            cornerRadius: 2
          },
          legend: {
            display: false
          },
          plugins: {
            zoom: {
              sensitivity: 1,
              pan: {
                enabled: drag,
                mode: 'x'
              },
              zoom: {
                rangeMax: {
                  x: 5,
                },
                enabled: zoom,
                mode: 'x',
              }
            }
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
  }, [canvasElement, data, drag, zoom])

  return <canvas ref={canvasElement} />;
};

export default CrowdChart;
