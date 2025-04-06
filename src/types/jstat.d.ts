declare module 'jstat' {
  export const jStat: {
    mean: (arr: number[]) => number;
    stdev: (arr: number[]) => number;
    correlation: (arr1: number[], arr2: number[]) => number;
    covariance: (arr1: number[], arr2: number[]) => number;
    normal: {
      sample: (mean: number, std: number) => number;
    };
  };
} 