import Wine from "../types/Wine";
import isEmpty from "./isEmpty";

/**
 * This function checks the API status and returns true if the wine data is not empty and is not fetching.
 *
 * @param wineData An array of wine objects.
 * @param isFetching A boolean flag that indicates whether the wine data is still being fetched from the API.
 */
export default function checkApiStatus(
  wineData: Wine[] | undefined,
  isFetching: boolean | undefined
) {
  /**
   * Return true if the wine data is not empty and is not fetching.
   */
  return !isEmpty(wineData) && !isFetching;
}
