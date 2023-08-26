import Wine from "../types/Wine";
import checkApiStatus from "./checkAPIStatus";

/**
 * This function calculates the mean of a wine's category, given the alcohol class and the wine data.
 *
 * @param wineData An array of wine objects.
 * @param category The name of the category to calculate the mean of.
 * @param alcoholClass The alcohol class of the wines to consider.
 * @param isFetching A boolean flag that indicates whether the wine data is still being fetched from the API.
 */
export default function calculateMeanFromWine(
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

    // console.log(category, alcoholClass, result);

    /**
     * Calculate the mean by adding all the numbers in the array and dividing by the number of numbers.
     */
    const mean =
      result.reduce((acc: number, curr: number) => acc + curr, 0) /
      result.length;

    /**
     * Round the mean to 3 decimal places.
     */
    return mean.toFixed(3);
  }
}
