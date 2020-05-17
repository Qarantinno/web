/// <reference types="react-scripts" />

declare module "react-div-100vh" {
  import { ReactNode } from "react";

  function FullHeight(props?: {
    children: ReactNode;
    style?: any;
  }): JSX.Element;
  export default FullHeight;
}

declare module "chartjs-plugin-zoom" {
  import { Chart, ChartOptions } from "chart.js";

  const ZoomPlugin: {
    id: "zoom";
    afterInit: (chart: Chart) => void;
    beforeUpdate: (chart: Chart, options: ChartOptions) => void;
    beforeInit: (chart: Chart, options: ChartOptions) => void;
    beforeDatasetsDraw: (chart: Chart) => void;
    destroy: (chart: Chart) => void;
  };
  export default ZoomPlugin;
}
