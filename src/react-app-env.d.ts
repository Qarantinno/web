/// <reference types="react-scripts" />

declare module 'react-full-height' {
  import { ReactNode } from 'react';

  function FullHeightComp(props?: {
    children: ReactNode;
    className: string;
    startWidth?: number;
    endWidth?: number;
    canExceed?: boolean;
  }): JSX.Element;
  export default FullHeightComp;
}
