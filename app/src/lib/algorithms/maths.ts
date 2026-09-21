/**
 * @function calculateMean
 * @description This script will find the mean value of a array of numbers.
 * @param {number[]} numbers - Array of numeric values
 * @return {number} - mean of input numbers
 */
export const calculateMean = (numbers: number[]): number => {
  if (numbers.length < 1) {
    return 0; // Return 0 instead of throwing for UI robustness
  }
  const sum = numbers.reduce((sum, current) => sum + current, 0)
  return sum / numbers.length
}

/**
 * @function calculateMedian
 * @description This function will find the median value of an array of numbers.
 * @param {number[]} numbers Array of numeric values (will be sorted internally).
 * @return {number} The median of input numbers.
 */
export const calculateMedian = (numbers: number[]): number => {
  if (numbers.length < 1) {
    return 0;
  }
  
  // Create a copy and sort it internally so we don't rely on the caller
  const sorted = [...numbers].sort((a, b) => a - b);
  const totalNumbers = sorted.length

  if (totalNumbers % 2 === 0) {
    const index = totalNumbers / 2
    return (sorted[index - 1] + sorted[index]) / 2
  } else {
    const index = (totalNumbers + 1) / 2
    return sorted[index - 1]
  }
}
