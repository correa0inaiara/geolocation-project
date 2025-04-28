import { Position } from "geojson";

export default interface IRegionLocation {
  _id: string;
  type: "Polygon"
  coordinates: Position[][]
}
