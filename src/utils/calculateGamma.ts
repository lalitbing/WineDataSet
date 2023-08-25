/**
 * This function calculates the gamma of a wine, given the ash, hue, and magnesium levels.
 *
 * @param Ash The ash level of the wine.
 * @param Hue The hue level of the wine.
 * @param Magnesium The magnesium level of the wine.
 */
export default function calculateGamma(
  Ash: number,
  Hue: number,
  Magnesium: number
) {
  /**
   * Check if the input values are not strings.
   */
  if (
    typeof Ash !== "string" &&
    typeof Hue !== "string" &&
    typeof Magnesium !== "string"
  ) {
    /**
     * Calculate the gamma by multiplying the ash and hue levels and dividing by the magnesium level.
     */
    const res = parseFloat(((Ash * Hue) / Magnesium).toFixed(3));
    return res;
  } else return "";

  /**
   * If any of the input values are strings, return an empty string.
   */
}
