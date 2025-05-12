const translation = {
  server: {
    init: 'Server start up',
    host: 'listining on {{host}}:{{port}}',
    dotenv: 'Hello {{env}}'
  },
  tests: {
    server: {
      init: 'Tests server starting',
      host: 'listening for tests on {{host}}:{{port}}',
      dotenv: 'Hello {{env}}'
    },
  },
  database: {
    init: 'initializing database',
    conn: 'database connected',
    connError: 'Database connecting error',
    disconnError: 'Database disconnecting error'
  },
  lib: {
    noResults: 'No results found',
    validation: {
      polygon: `Invalid request body. Must be of type Polygon (GeoJSON).
        Example: 
        {
          type: "Polygon",
          coordinates: [[[number, number], [number, number], [number, number], [number, number], ...[number, number][]]]
        }
        The first pair of coordinates [number, number] must be the same as the last pair of coordinates, because this way the polygon is closed.
        The minimun pair of coordinates [number, number] is 4.
        About the coordinates [number, number]: The first number is the longitude and the second the latitude.
        The longitude is usually between -180 and 180.
        The latitude is usually between -90 and 90.
        
        Reference of the specification: https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6`,
      point: `Invalid request body. Must be of type Point (GeoJSON). 
        Example: 
        {
          type: "Point",
          coordinates: [number, number]
        }
        The maximun pair of coordinates [number, number] is 1.
        About the coordinates [number, number]: The first number is the longitude and the second the latitude.
        The longitude is usually between -180 and 180.
        The latitude is usually between -90 and 90.
        
        Reference of the specification: https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2`,
      address: 'Invalid address',
      coordinates: 'Invalid Coordinates'
    }
  },
  api: {
    region: {
      notFound: 'Region not found',
      validation: {
        coordinates: {
          invalid: 'Coordinates are invalid',
        },
        location: {
          require: 'You need to provide a location for the region',
          invalid: 'Location is invalid',
          polygon: {
            required: 'Region location and coordinates are required',
            invalid: 'Polygon Coordinates are invalid',
            coordinates: 'The first and last points needs to be the same to complete the polygon',
            order: 'Each point needs a longitude and a latitude, in this order',
            information: 'The longitude and latitude points needs to represented in numbers'
          },
          name: 'You need to give the region a name',
          address: 'Your address needs to be a string'
        },
        missingParam: 'You need to specify the region parameters to update',
        userId: 'User needs to be an ObjectID',
        userRequired: 'You need to provide a user for the region'
      }
    },
    user: {
      notFound: 'User not found',
      validation: {
        coordinates: {
          invalid: 'Coordinates are invalid'
        },
        missingParam: 'You need to specify the user parameters to update',
        schema: 'You need to provide either address or location',
        location: 'User location and coordinates are required',
        address: 'Your address needs to be a string'
      }
    },
    query: {
      unsupported: 'Unsupported query parameter. The only acceptable query parameter is expand, which can either be true or false. This parameter allows the route to send subdocuments contained within documents, when is the case.'
    },
    headers: {
      unsupportedLang: "Unsupported language. The accepted options for the Accept-Language header are: pt (portuguese), es (spanish), en (english) or * (all). Options different then these aren't accepted. The default language is portuguese (pt).",
    }
  },
  i18n: {
    langChanged: 'Language switched to {{lang}}',
    langChangedError: 'An error occured when trying to change the lang to {{lang}}',
  }
  // clientMenuUsers: 'Users',
  // clientMenuRegions: 'Regions',
  // clientMenuSearchByDistance: 'Search By Distance',
  // clientMenuSearchByPoint: 'Search By Point',
  // userRegistrationTitle: 'Users Registration',
  // userRegistrationLabelName: 'Name',
  // userRegistrationInputNameErrorMsg: 'Please, provide a valid name',
  // userRegistrationLabelEmail: 'Email',
  // userRegistrationInputEmailErrorMsg: 'Please, provide a valid email',
  // userRegistrationLabelAddress: 'Address',
  // userRegistrationInputAddressErrorMsg: 'Please, provide a valid address',
  // userRegistrationLabelLocation: 'Location',
  // userRegistrationLabelLongitude: 'Longitude',
  // userRegistrationInputLongitudeErrorMsg: 'Please, provide a valid longitude',
  // userRegistrationLabelLatitude: 'Latitude',
  // userRegistrationInputLatitudeErrorMsg: 'Please, provide a valid latitude',
  // userRegistrationInputUserFormErrorMsg: 'Please, provide either address or location',
  // userRegistrationSubmitButton: 'Submit',
  // userListingTitle: 'Users Listing',
  // tableHeaderIndex: '#',
  // tableHeaderNameEmail: 'Name / Email',
  // tableHeaderAddress: 'Address',
  // tableHeaderLongLat: 'Longitude / Latitude',
  // navPrev: 'Prev',
  // navNext: 'Next',
};

export default { translation };
