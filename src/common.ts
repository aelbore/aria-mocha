export interface CoverageOptions {
  thresholds?: ThresholdOptions;
  reporters?: string[];
  checkCoverage?: boolean;
}

export interface ThresholdOptions {
  statements?: number,
  lines?: number,
  functions?: number,
  branches?: number,
}