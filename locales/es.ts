const translation = {
  serverInit: 'Servidor iniciando',
  serverHost: 'escuchando en {{host}}:{{port}}',
  dotenvxHello: 'Hello {{env}}',
  testsServerInit: 'Inicio del servidor de prueba',
  testsServerHost: 'escuchando pruebas en {{host}}:{{port}}',
  databaseInit: 'base de datos de inicio',
  databaseConn: 'base de datos conectada',
  databaseConnError: 'Problema de conexión a la base de datos',
  databaseDisconnectError: 'Base de datos con problema de desconexion',
  lib: {
    noResults: 'No se encontraron resultados',
  },
  libPolygonValidation: `Cuerpo de solicitud no válido. Debe ser de tipo Polygon (GeoJSON). 
    Ejemplo: 
    {
      type: "Polygon",
      coordinates: [[[number, number], [number, number], [number, number], [number, number], ...[number, number][]]]
    }
    El primer par de coordenadas [number, number] debe ser igual al último par de coordenadas [number, number], ya que éste cierra el polígono.
    El número mínimo de pares de coordenadas [number, number] es 4.
    En respecto a las coordenadas [number, number]: El primer número es la longitud y el segundo es la latitud.
    La longitud suele estar entre -180 y 180.
    Y la latitud suele estar entre -90 y 90.

    Referencia de especificación (en inglés): https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6`,
  libPointValidation: `Cuerpo de solicitud no válido. Debe ser de tipo Polygon (GeoJSON). 
    Ejemplo: 
    {
      type: "Point",
      coordinates: [number, number]
    }
    El número máximo de pares de coordenadas [number, number] es 1.
    En respecto a las coordenadas [number, number]: El primer número es la longitud y el segundo es la latitud.
    La longitud suele estar entre -180 y 180.
    Y la latitud suele estar entre -90 y 90.
  
    Referencia de especificación (en inglés): https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2`,
  libAddressValidation: 'Dirección no válida',
  libCoordinatesValidation: 'Coordenadas inválidas',
  apiRegionNotFound: 'Región (region) no encontrada',
  apiRegionLocationValidation:
    'La ubicación (location) y las coordenadas (coordinates) de la región (region) son obligatorias.',
  apiRegionUpdateParametersMissing:
    'Es necessario informar los parámetros para realizar la actualización.',
  apiRegionUserValidation: 'El usuario (user) debe ser del tipo ObjectID.',
  apiUserNotFound: 'Usuario (user) no encontrado',
  apiUserSchemaValidation: 'Necesitas enviar la dirección (address) o ubicación (location)',
  apiUserLocationValidation:
    'Se requieren la ubicación (location) y las coordenadas (coordinates) del usuario.',
  apiUserUpdateParametersMissing:
    'Es necesario informar los parámetros del usuario (user) para realizar la actualización.',
  apiRegionLocationCoordinatesValidation: 'Las coordenadas (coordinates) no son válidas',
  apiRegionLocationCoordinatesInvalid:
    'Las coordenadas (coordinates) del polígono (polygon) no son válidas.',
  apiRegionLocationPolygonCoordinatesInvalid:
    'El primer y el último par de coordenadas deben ser iguales para ser un polígono.',
  apiRegionLocationCoordinatesOrder:
    'Cada par de coordenadas necesita una longitud y una latitud, en ese orden.',
  apiRegionLocationCoordinatesInformation:
    'La longitud y la latitud deben representarse mediante números.',
  apiRegionNameRequired: 'Necesitas darle un nombre (name) a la región (region).',
  apiRegionUserRequired: 'Debe asignar un usuario a la región.',
  apiRegionLocationRequired: 'Debe proporcionar una ubicación (location) para la región (region).',
  apiUserLocationCoordinatesValidation: 'Las coordenadas (coordinates) no son válidas.',
  apiUserLocationInvalid: 'La ubicación (location) no es válida.',
  apiUserAddressValidation: 'Su dirección debe ser texto',
  apiUnsupportedQueryParameter:
    'Parámetro de consulta no admitido. El único parámetro aceptado es expandir. Y su valor sólo puede ser verdadero o falso. Este parámetro permite que la ruta envíe subdocumentos dentro de los documentos, cuando corresponda.',
  i18nLangChanged: 'El idioma cambió a {{lang}}',
  i18nLangChangeError: 'Se produjo un error al cambiar el idioma a {{lang}}',
  i18nUnsupportedLangHeader:
    'Idioma no soportado. Las opciones aceptadas para el encabezado Accept-Language son: pt (portugués), es (español), en (inglés) o * (todo). No se aceptarán opciones distintas a éstas. El idioma predeterminado es portugués (pt).',
  clientMenuUsers: 'Usuarios',
  clientMenuRegions: 'Regiones',
  clientMenuSearchByDistance: 'Búsqueda por distancia',
  clientMenuSearchByPoint: 'Búsqueda por punto',
  userRegistrationTitle: 'Registro de usuario',
  userRegistrationLabelName: 'Nombre',
  userRegistrationInputNameErrorMsg: 'Por favor, introduzca un nombre válido',
  userRegistrationLabelEmail: 'E-mail',
  userRegistrationInputEmailErrorMsg: 'Por favor, introduzca un email válido',
  userRegistrationLabelAddress: 'Dirección',
  userRegistrationInputAddressErrorMsg: 'Por favor, proporcione una dirección válida',
  userRegistrationLabelLocation: 'Ubicación',
  userRegistrationLabelLongitude: 'Longitud',
  userRegistrationInputLongitudeErrorMsg: 'Por favor, introduzca una longitud válida',
  userRegistrationLabelLatitude: 'Latitud',
  userRegistrationInputLatitudeErrorMsg: 'Por favor, introduzca una latitud válida',
  userRegistrationInputUserFormErrorMsg: 'Proporcione únicamente la dirección o ubicación',
  userRegistrationSubmitButton: 'Enviar',
  userListingTitle: 'Lista de Usuarios',
  tableHeaderIndex: '#',
  tableHeaderNameEmail: 'Nombre / Email',
  tableHeaderAddress: 'Dirección',
  tableHeaderLongLat: 'Longitud / Latitud',
  navPrev: 'Anterior',
  navNext: 'Próximo',
};

export default { translation };
