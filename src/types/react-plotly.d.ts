declare module 'react-plotly.js' {
  import { Component } from 'react';

  interface PlotParams {
    data: Array<{
      type: string;
      mode?: string;
      x: any[];
      y: any[];
      text?: any[];
      name?: string;
      marker?: {
        size?: number;
        color?: any;
        colorscale?: string;
        showscale?: boolean;
        colorbar?: {
          title?: string;
        };
      };
      hoverinfo?: string;
    }>;
    layout: {
      title?: string;
      xaxis?: {
        title?: string;
      };
      yaxis?: {
        title?: string;
      };
      width?: number;
      height?: number;
    };
  }

  export default class Plot extends Component<PlotParams> {}
} 