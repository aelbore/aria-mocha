
export function parseThresholds(threshold?: string) {
  const thresholds = threshold?.split(',') ?? []
  // @ts-ignore
  const entries = new Map(thresholds.map(threshold => (
    threshold.split('=').map(value => {
      const item = parseInt(value)
      return !!item ? item: value 
    })
  )))
  return (Object.fromEntries(entries) as import('../coverage').ThresholdOptions)
}