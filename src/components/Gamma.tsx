import React, { useCallback, useEffect, useState } from "react";
import fetchWineData from "../api/fetchWineData";
import Wine from "../types/Wine";
import checkApiStatus from "../utils/checkAPIStatus";
import calculateMeanFromWine from "../utils/calculateMeanFromWine";
import calculateModeFromWine from "../utils/calculateModeFromWine";
import calculateMedianFromWine from "../utils/calculateMedianFromWine";
import calculateGamma from "../utils/calculateGamma";

function Gamma() {
  const [wineData, setWineData] = useState<Wine[] | undefined>();
  const [isFetching, setIsFetching] = useState<boolean>();

  // This function fetches the wine data from the API and calculates the gamma value for each wine.
  async function getData() {
    const data = await fetchWineData(setIsFetching);
    const newWineData = data?.map((wine: Wine) => ({
      ...wine,
      // Calculate the gamma value for the wine.
      gamma: calculateGamma(wine.Ash, wine.Hue, wine.Magnesium),
    }));
    setWineData(newWineData);
  }

  useEffect(() => {
    getData();
  }, []);

  const returnUniqueAlcoholClasses = useCallback(() => {
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

  // This function returns the mean of the gamma values for each alcohol class in the wine data or an empty array if the wine data is not available
  function returnMeanGamma() {
    if (
      checkApiStatus(wineData, isFetching) &&
      Array.isArray(wineData) &&
      alcoholClasses.length > 0
    ) {
      const meanFlavinoids: number[] = [];
      for (const val of alcoholClasses) {
        const mean = calculateMeanFromWine(wineData, "gamma", val, isFetching);
        if (mean !== undefined) {
          meanFlavinoids.push(Number(mean));
        }
      }

      return meanFlavinoids;
    }
    return [];
  }

  // This function returns the mode of the gamma values for each alcohol class in the wine data or an empty array if the wine data is not available
  function returnModeGamma() {
    if (
      checkApiStatus(wineData, isFetching) &&
      Array.isArray(wineData) &&
      alcoholClasses.length > 0
    ) {
      const modeFlavinoids: number[] = [];
      for (const val of alcoholClasses) {
        const mode = calculateModeFromWine(wineData, "gamma", val, isFetching);
        if (mode !== undefined) {
          modeFlavinoids.push(mode);
        }
      }

      return modeFlavinoids;
    }
    return [];
  }

  // This function returns the median of the gamma values for each alcohol class in the wine data or an empty array if the wine data is not available
  function returnMedianGamma() {
    if (
      checkApiStatus(wineData, isFetching) &&
      Array.isArray(wineData) &&
      alcoholClasses.length > 0
    ) {
      const medianFlavinoids: number[] = [];
      for (const val of alcoholClasses) {
        const median = calculateMedianFromWine(
          wineData,
          "gamma",
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
            <th className="table-heading">Gamma Mean</th>
            {checkApiStatus(wineData, isFetching) && Array.isArray(wineData) ? (
              returnMeanGamma().map((item: any, key: number) => {
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
            <th className="table-heading">Gamma Median</th>
            {checkApiStatus(wineData, isFetching) && Array.isArray(wineData) ? (
              returnMedianGamma().map((item: any, key: number) => {
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
            <th className="table-heading">Gamma Mode</th>
            {checkApiStatus(wineData, isFetching) && Array.isArray(wineData) ? (
              returnModeGamma().map((item: any, key: number) => {
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

export default Gamma;
