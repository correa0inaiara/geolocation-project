import { PointBody, PolygonBody } from '../classes/Requests';
import { isArray, isLatitude, isLongitude, isValid } from '../utils';

export const validatePointBody = (data: PointBody) => {
  if (!isValid(data)) return false;

  if (!isValid(data?.type) || data.type !== 'Point' || !isArray(data.coordinates)) return false;

  if (data.coordinates.length != 2) return false;

  if (!isValid(data.coordinates[0]) || !isValid(data.coordinates[1])) return false;

  if (typeof data.coordinates[0] != 'number' || typeof data.coordinates[1] != 'number')
    return false;

  if (!isLongitude(data.coordinates[0]) || !isLatitude(data.coordinates[1])) return false;

  return true;
};

export const validatePolygonBody = (data: PolygonBody) => {
  if (!isValid(data)) return false;

  if (!isValid(data?.type) || data.type !== 'Polygon' || !isArray(data.coordinates)) return false;

  if (
    data.coordinates.length != 1 ||
    !isArray(data.coordinates[0]) ||
    data.coordinates[0].length < 4
  )
    return false;

  // checks is each one of the first inner array is an array by itself of 2 elements each with both being a number
  let isArr = true;
  for (const item of data.coordinates[0]) {
    if (!isArray(item) || item.length != 2) isArr = false;
  }
  if (!isArr) return false;

  let isItemValid = true;
  for (const item of data.coordinates[0]) {
    if (!isValid(item[0]) || !isValid(item[1])) isItemValid = false;
  }
  if (!isItemValid) return false;

  let isNum = true;
  for (const item of data.coordinates[0]) {
    if (typeof item[0] != 'number' || typeof item[1] != 'number') isNum = false;
  }
  if (!isNum) return false;

  let isValidCoordinate = true;
  for (const item of data.coordinates[0]) {
    if (!isLongitude(item[0]) || !isLatitude(item[1])) isValidCoordinate = false;
  }
  if (!isValidCoordinate) return false;

  // checks if the first and the last coordinates are the same
  const length = data.coordinates[0].length;
  if (
    data.coordinates[0][0][0] != data.coordinates[0][length - 1][0] ||
    data.coordinates[0][0][1] != data.coordinates[0][length - 1][1]
  )
    return false;

  return true;
};
