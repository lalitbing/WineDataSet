/**
 * This function fetches the wine data from the API.
 *
 * @param setIsFetching A function to set the fetching state.
 */

// make sure to run nodeServer before starting this application
export default async function fetchWineData(setIsFetching: Function) {
  try {
    // Make a request to the API
    // Check if the response is successful.
    // If the response is not successful, throw an error.
    const response = await fetch("http://localhost:8080/");
    if (!response.ok) {
      throw new Error("Failed to fetch data from Wine-Data.json");
    }

    const data = await response.json();
    setIsFetching(false);
    return data;
  } catch (error) {
    console.error("Error fetching wine data:", error);
    setIsFetching(false);
    return null;
  }
}
