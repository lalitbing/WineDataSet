import React, { useCallback, useEffect, useState } from "react";
import fetchWineData from "../api/fetchWineData";
import Wine from "../types/Wine";
import checkApiStatus from "../utils/checkAPIStatus";
import calculateMeanFromWine from "../utils/calculateMeanFromWine";
import calculateModeFromWine from "../utils/calculateModeFromWine";
import calculateMedianFromWine from "../utils/calculateMedianFromWine";

function FlavanoidMeanMedianMode() {
  const [wineData, setWineData] = useState<Wine[] | undefined>();
  const [isFetching, setIsFetching] = useState<boolean>();

  // This function fetches the wine data from the API.
  async function getData() {
    const data = await fetchWineData(setIsFetching);
    setWineData(data);
  }

  // This function is called once when the component mounts. It calls the `getData()` function to fetch the wine data.
  useEffect(() => {
    getData();
  }, []);

  // This function returns the unique alcohol classes in the wine data or an empty array if the wine data is not available.
  const returnUniqueAlcoholClasses = useCallback(() => {
    // Check if the API status is good, the wine data is not empty, and the component is not fetching.
    if (checkApiStatus(wineData, isFetching) && Array.isArray(wineData)) {
      const uniqueAlcoholValues: Array<number> = [];
      for (const wine of wineData) {
        const alcohol = wine.Alcohol;
        if (!uniqueAlcoholValues.includes(alcohol)) {
          uniqueAlcoholValues.push(alcohol);
        }
      }
      return uniqueAlcoholValues;
    }
    return [];
  }, [wineData]);

  const alcoholClasses = returnUniqueAlcoholClasses();

  // This function returns the mean of the flavanoids for each alcohol class in the wine data or an empty array if the wine data is not available
  function returnMeanFlavinoids() {
    if (
      checkApiStatus(wineData, isFetching) &&
      Array.isArray(wineData) &&
      alcoholClasses.length > 0
    ) {
      const meanFlavinoids: number[] = [];
      for (const val of alcoholClasses) {
        const mean = calculateMeanFromWine(
          wineData,
          "Flavanoids",
          val,
          isFetching
        );
        if (mean !== undefined) {
          meanFlavinoids.push(Number(mean));
        }
      }

      return meanFlavinoids;
    }
    return [];
  }

  // This function returns the median of the flavanoids for each alcohol class in the wine data or an empty array if the wine data is not available
  function returnModeFlavinoids() {
    if (
      checkApiStatus(wineData, isFetching) &&
      Array.isArray(wineData) &&
      alcoholClasses.length > 0
    ) {
      const modeFlavinoids: number[] = [];
      for (const val of alcoholClasses) {
        const mode = calculateModeFromWine(
          wineData,
          "Flavanoids",
          val,
          isFetching
        );
        if (mode !== undefined) {
          modeFlavinoids.push(mode);
        }
      }

      return modeFlavinoids;
    }
    return [];
  }
  // This function returns the median of the flavanoids for each alcohol class in the wine data or an empty array if the wine data is not available
  function returnMedianFlavinoids() {
    if (
      checkApiStatus(wineData, isFetching) &&
      Array.isArray(wineData) &&
      alcoholClasses.length > 0
    ) {
      const medianFlavinoids: number[] = [];
      for (const val of alcoholClasses) {
        const median = calculateMedianFromWine(
          wineData,
          "Flavanoids",
          val,
          isFetching
        );
        if (median !== undefined && typeof median !== "string") {
          medianFlavinoids.push(median);
        }
      }

      return medianFlavinoids;
    }
    return [];
  }

  return (
    <>
      <table className="table-container">
        <tbody>
          <tr className="table-row">
            <th className="table-heading">Measure</th>
            {checkApiStatus(wineData, isFetching) &&
            Array.isArray(wineData) &&
            alcoholClasses.length > 0 ? (
              alcoholClasses.map((item: any, key: number) => {
                return (
                  <td className="table-cell" key={key}>
                    {item}
                  </td>
                );
              })
            ) : (
              <td className="table-cell">Loading...</td>
            )}
          </tr>
          <tr className="table-row">
            <th className="table-heading">Flavanoids Mean</th>
            {checkApiStatus(wineData, isFetching) && Array.isArray(wineData) ? (
              returnMeanFlavinoids().map((item: any, key: number) => {
                return (
                  <td className="table-cell" key={key}>
                    {item}
                  </td>
                );
              })
            ) : (
              <td className="table-cell">Loading...</td>
            )}
          </tr>
          <tr className="table-row">
            <th className="table-heading">Flavanoids Median</th>
            {checkApiStatus(wineData, isFetching) && Array.isArray(wineData) ? (
              returnMedianFlavinoids().map((item: any, key: number) => {
                return (
                  <td className="table-cell" key={key}>
                    {item}
                  </td>
                );
              })
            ) : (
              <td className="table-cell">Loading...</td>
            )}
          </tr>
          <tr className="table-row">
            <th className="table-heading">Flavanoids Mode</th>
            {checkApiStatus(wineData, isFetching) && Array.isArray(wineData) ? (
              returnModeFlavinoids().map((item: any, key: number) => {
                return (
                  <td className="table-cell" key={key}>
                    {item}
                  </td>
                );
              })
            ) : (
              <td className="table-cell">Loading...</td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default FlavanoidMeanMedianMode;
