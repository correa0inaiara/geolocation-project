const translation = {
  serverInit: 'Server start up',
  serverHost: 'listining on {{host}}:{{port}}',
  dotenvxHello: 'Hello {{env}}',
  testsServerInit: 'Tests server starting',
  testsServerHost: 'listening for tests on {{host}}:{{port}}',
  databaseInit: 'initializing database',
  databaseConn: 'database connected',
  databaseConnError: 'Database connecting error',
  databaseDisconnectError: 'Database disconnecting error',
  lib: {
    noResults: 'No results found',
  },
  libPolygonValidation: `Invalid request body. Must be of type Polygon (GeoJSON).
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
  libPointValidation: `Invalid request body. Must be of type Point (GeoJSON). 
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
  libAddressValidation: 'Invalid address',
  libCoordinatesValidation: 'Invalid Coordinates',
  apiRegionNotFound: 'Region not found',
  apiRegionLocationValidation: 'Region location and coordinates are required',
  apiRegionUpdateParametersMissing: 'You need to specify the region parameters to update',
  apiRegionUserValidation: 'User needs to be an ObjectID',
  apiUserNotFound: 'User not found',
  apiUserSchemaValidation: 'You need to provide either address or location',
  apiUserLocationValidation: 'User location and coordinates are required',
  apiRegionLocationCoordinatesValidation: 'Coordinates are invalid',
  apiRegionLocationCoordinatesInvalid: 'Polygon Coordinates are invalid',
  apiRegionLocationPolygonCoordinatesInvalid:
    'The first and last points needs to be the same to complete the polygon',
  apiRegionLocationCoordinatesOrder: 'Each point needs a longitude and a latitude, in this order',
  apiRegionLocationCoordinatesInformation:
    'The longitude and latitude points needs to represented in numbers',
  apiRegionNameRequired: 'You need to give the region a name',
  apiRegionUserRequired: 'You need to provide a user for the region',
  apiRegionLocationRequired: 'You need to provide a location for the region',
  apiUserLocationCoordinatesValidation: 'Coordinates are invalid',
  apiUserLocationInvalid: 'Location is invalid',
  apiUserAddressValidation: 'Your address needs to be a string',
  apiUnsupportedQueryParameter:
    'Unsupported query parameter. The only acceptable query parameter is expand, which can either be true or false. This parameter allows the route to send subdocuments contained within documents, when is the case.',
  i18nLangChanged: 'Language switched to {{lang}}',
  i18nLangChangeError: 'An error occured when trying to change the lang to {{lang}}',
  i18nUnsupportedLangHeader:
    "Unsupported language. The accepted options for the Accept-Language header are: pt (portuguese), es (spanish), en (english) or * (all). Options different then these aren't accepted. The default language is portuguese (pt).",
  clientMenuUsers: 'Users',
  clientMenuRegions: 'Regions',
  clientMenuSearchByDistance: 'Search By Distance',
  clientMenuSearchByPoint: 'Search By Point',
  userRegistrationTitle: 'Users Registration',
  userRegistrationLabelName: 'Name',
  userRegistrationInputNameErrorMsg: 'Please, provide a valid name',
  userRegistrationLabelEmail: 'Email',
  userRegistrationInputEmailErrorMsg: 'Please, provide a valid email',
  userRegistrationLabelAddress: 'Address',
  userRegistrationInputAddressErrorMsg: 'Please, provide a valid address',
  userRegistrationLabelLocation: 'Location',
  userRegistrationLabelLongitude: 'Longitude',
  userRegistrationInputLongitudeErrorMsg: 'Please, provide a valid longitude',
  userRegistrationLabelLatitude: 'Latitude',
  userRegistrationInputLatitudeErrorMsg: 'Please, provide a valid latitude',
  userRegistrationInputUserFormErrorMsg: 'Please, provide either address or location',
  userRegistrationSubmitButton: 'Submit',
  userListingTitle: 'Users Listing',
  tableHeaderIndex: '#',
  tableHeaderNameEmail: 'Name / Email',
  tableHeaderAddress: 'Address',
  tableHeaderLongLat: 'Longitude / Latitude',
  navPrev: 'Prev',
  navNext: 'Next',
};

export default { translation };
