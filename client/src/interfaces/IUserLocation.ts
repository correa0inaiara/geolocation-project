import { Position } from "geojson";

export default interface IUserLocation {
  _id: string;
  type: "Point"
  coordinates: Position
}



/* 
{
    "_id": "67c88b2a431ab0d81aeb5e6a",
    "name": "Mitchell Daugherty V",
    "email": "Alexandro_Bednar95@gmail.com",
    "address": "Durganville Ohio Morocco",
    "location": {
        "_id": "67c88b2b431ab0d81aeb5e6b",
        "type": "Point"
    },
    "createdAt": "2025-03-05T17:34:34.203Z",
    "updatedAt": "2025-03-05T17:34:34.203Z",
    "__v": 0
}

*/