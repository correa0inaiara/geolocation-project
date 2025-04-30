export type Coordinates = [number, number];

export interface PointBody {
  type: 'Point';
  coordinates: Coordinates;
};

export interface PolygonBody {
  type: 'Polygon';
  coordinates: [[Coordinates, Coordinates, Coordinates, Coordinates, ...Coordinates[]]];
};

export interface QueryBody {
  expand?: boolean;
};

export class QueryParam {
  expand: boolean;

  constructor(expand: boolean) {
    this.expand = expand;
  }
}
