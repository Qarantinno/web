/// <reference types="react-scripts" />

declare module 'react-div-100vh' {
  import { ReactNode } from 'react';

  function FullHeight(props?: {
    children: ReactNode;
    style?: any;
  }): JSX.Element;
  export default FullHeight;
}
