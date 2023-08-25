import Wine from "../types/Wine";
import checkApiStatus from "./checkAPIStatus";

/**
 * This function calculates the mode of a wine's category, given the alcohol class and the wine data.
 *
 * @param wineData An array of wine objects.
 * @param category The name of the category to calculate the mode of.
 * @param alcoholClass The alcohol class of the wines to consider.
 * @param isFetching A boolean flag that indicates whether the wine data is still being fetched from the API.
 */
export default function calculateModeFromWine(
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
    const resultArray = wineData
      .filter(
        (wine: Wine) =>
          wine.Alcohol === alcoholClass && typeof wine[category] !== "string"
      )
      .map((wine: Wine) => wine[category] as number);

    /**
     * Create a frequency map of the numbers in the array.
     */
    const frequency: { [key: number]: number } = resultArray.reduce(
      (map: any, num: any) => {
        map[num] = (map[num] || 0) + 1;
        return map;
      },
      {}
    );

    /**
     * Check if there is a mode by iterating through the frequency array and checking if any of the values are greater than 1.
     */
    const frequencyArray = Object.values(frequency);

    let noMode = true;

    for (let i = 0; i < frequencyArray.length; i++) {
      if (frequencyArray[i] > 1) noMode = false;
    }

    /**
     * If there is no mode, return 0. Otherwise, return the number with the highest frequency.
     */
    if (noMode) return 0;
    else {
      let maxFrequency = 0;
      let mode: number = 0;

      for (const num in frequency) {
        if (frequency[num] > maxFrequency) {
          maxFrequency = frequency[num];
          mode = parseFloat(num);
        }
      }

      return parseFloat(mode.toFixed(3));
    }
  }
}
