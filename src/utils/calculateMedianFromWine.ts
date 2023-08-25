import Wine from "../types/Wine";
import checkApiStatus from "./checkAPIStatus";
import mergeSort from "./mergeSort";
/**
 * This function calculates the median of a wine's category, given the alcohol class and the wine data.
 *
 * @param wineData An array of wine objects.
 * @param category The name of the category to calculate the median of.
 * @param alcoholClass The alcohol class of the wines to consider.
 * @param isFetching A boolean flag that indicates whether the wine data is still being fetched from the API.
 */
export default function calculateMedianFromWine(
  wineData: Wine[] | undefined,
  category: keyof Wine,
  alcoholClass: number,
  isFetching: boolean | undefined
) {
  /**
   * Check if the API status is good and the wine data is an array.
   */
  if (checkApiStatus(wineData, isFetching) && Array.isArray(wineData)) {
    /**
     * Filter the wine data to only include wines with the specified alcohol class and whose category is not a string.
     */
    const result = wineData
      .filter(
        (wine: Wine) =>
          wine.Alcohol === alcoholClass && typeof wine[category] !== "string"
      )
      .map((wine: Wine) => wine[category] as number);

    /**
     * Sort the wine data in ascending order.
     */
    const sortedRes = mergeSort(result);

    /**
     * Get the middle element of the sorted array.
     */
    const middle = Math.floor(sortedRes.length / 2);

    /**
     * Calculate the median by averaging the middle two elements if the array has an even number of elements. Otherwise, return the middle element.
     */
    const median =
      sortedRes.length % 2 === 0
        ? (sortedRes[middle - 1] + sortedRes[middle]) / 2
        : sortedRes[middle];

    return parseFloat(median.toFixed(3));
  }
}
