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
 * @returns The calculated median.
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
     * Filter the wine data to only include wines with the specified alcohol class.
     */
    const result = wineData
      .filter((wine: any) => wine.Alcohol === alcoholClass)
      .map((wine: any) => {
        const categoryValue = wine[category];
        if (category === "Flavanoids") {
          if (categoryValue === "string")
            return parseFloat(parseFloat(categoryValue).toFixed(3));
          else return categoryValue;
        } else {
          return categoryValue;
        }
      });

    /**
     * Check if there's enough data to calculate the median.
     */
    if (result.length === 0) {
      return undefined; // Return undefined if no data is available.
    }

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

  return undefined; // Return undefined if conditions are not met.
}
