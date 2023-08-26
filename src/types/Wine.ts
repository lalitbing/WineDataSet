/**
 * This interface defines the properties of a wine.
 *
 * @property Alcohol The alcohol content of the wine.
 * @property Malic Acid The malic acid content of the wine.
 * @property Ash The ash content of the wine.
 * @property Alcalinity of ash The alkalinity of the ash content of the wine.
 * @property Magnesium The magnesium content of the wine.
 * @property Total phenols The total phenols content of the wine.
 * @property Flavanoids The flavanoids content of the wine.
 * @property Nonflavonoid phenols The nonflavonoid phenols content of the wine.
 * @property Proanthocyanins The proanthocyanins content of the wine.
 * @property Color intensity The color intensity of the wine.
 * @property Hue The hue of the wine.
 * @property OD280/OD315 of diluted wines The OD280/OD315 of diluted wines content of the wine.
 * @property Unknown An unknown property of the wine.
 * @property gamma An optional property that specifies the gamma of the wine.
 */

export default interface Wine {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number;
  Proanthocyanins: number;
  "Color intensity": number;
  Hue: number;
  "OD280/OD315 of diluted wines": number;
  Unknown: number;
  gamma?: number;
}
