export type Coordinates = [number, number];

export type PointBody = {
  type: 'Point';
  coordinates: Coordinates;
};

export type PolygonBody = {
  type: 'Polygon';
  coordinates: [[Coordinates, Coordinates, Coordinates, Coordinates, ...Coordinates[]]];
};

export type QueryBody = {
  expand?: boolean;
};

export class QueryParam {
  expand: boolean;

  constructor(expand: boolean) {
    this.expand = expand;
  }
}
