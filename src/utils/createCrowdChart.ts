import Chart, { ChartColor, ChartPoint, Scriptable } from 'chart.js';

import ZoomPlugin from "chartjs-plugin-zoom";

import { theme } from './theme';
import { getStatusFromCountOfPeople } from '../services/status/utils/getStatusFromCountOfPeople';
import { Statuses } from '../enums/Statuses';

export const backgroundColor: Scriptable<ChartColor> = ({ dataIndex: index, dataset }) => {
  if (!index) return theme.palette.info.main;
  if (!dataset) return theme.palette.info.main;
  const { data } = dataset;
  if (!data) return theme.palette.info.main;
  const item = data[index] as ChartPoint
  if (!item) return theme.palette.info.main;
  const value = item.y as number;

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

export interface ICrowdChartParams {
  canvas: HTMLCanvasElement;
  min: Date;
  max: Date;
  drag?: boolean;
  limit: {
    min: Date;
    max: Date;
  };
}

export const createCrowdChart: (params: ICrowdChartParams) => Chart = (params: ICrowdChartParams) => {
  const { canvas, drag = false, min, max, limit } = params;
  
  return new Chart(canvas, {
    type: 'bar',
    plugins: [ZoomPlugin],
    options: {
      responsive: true,
      tooltips: {
        cornerRadius: 2
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              max: 100,
              min: 0
            }
          }
        ],
        xAxes:[
          {
            type: 'time',
            ticks: { 
              min,
              max,
            },
            distribution: 'linear',
            time: {
              stepSize: 1,
              unit: 'hour',
              displayFormats: {
                hour: 'HH:mm'
              }
            },
            gridLines: {
              offsetGridLines: true
            }
          },
        ],
      },
      plugins: {
        zoom: {
          sensitivity: 1,
          pan: {
            rangeMin: {
              x: limit.min
            },
            rangeMax: {
              x: limit.max
            },
            enabled: drag,
            mode: 'x'
          }
        }
      },
    },
    data: {
      datasets: [{
        data: [],
        backgroundColor
      }],
    }
  })
}
