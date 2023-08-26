/**
 * This function calculates the gamma of a wine, given the ash, hue, and magnesium levels.
 *
 * @param Ash The ash level of the wine.
 * @param Hue The hue level of the wine.
 * @param Magnesium The magnesium level of the wine.
 * @returns The calculated gamma value or an empty string for invalid input.
 */
export default function calculateGamma(
  Ash: number | string,
  Hue: number | string,
  Magnesium: number | string
) {
  let floatAsh = typeof Ash === "string" ? parseFloat(Ash) : Ash;
  let floatHue = typeof Hue === "string" ? parseFloat(Hue) : Hue;
  let floatMagnesium =
    typeof Magnesium === "string" ? parseFloat(Magnesium) : Magnesium;

  const res = ((floatAsh * floatHue) / floatMagnesium).toFixed(3);
  return parseFloat(res); // Convert the result back to a number.
}
