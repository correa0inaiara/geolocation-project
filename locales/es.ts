const translation = {
  server: {
    init: 'Servidor iniciando',
    host: 'escuchando en {{host}}:{{port}}',
    dotenv: 'Hello {{env}}'
  },
  tests: {
    server: {
      init: 'Inicio del servidor de prueba',
      host: 'escuchando pruebas en {{host}}:{{port}}',
      dotenv: 'Hello {{env}}'
    },
  },
  database: {
    init: 'base de datos de inicio',
    conn: 'base de datos conectada',
    connError: 'Problema de conexión a la base de datos',
    disconnError: 'Base de datos con problema de desconexion'
  },
  lib: {
    noResults: 'No se encontraron resultados',
    validation: {
      polygon: `Cuerpo de solicitud no válido. Debe ser de tipo Polygon (GeoJSON). 
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
      point: `Cuerpo de solicitud no válido. Debe ser de tipo Polygon (GeoJSON). 
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
      address: 'Dirección no válida',
      coordinates: 'Coordenadas no válidas'
    }
  },
  api: {
    region: {
      notFound: 'Región (region) no encontrada',
      validation: {
        coordinates: {
          invalid: 'Las coordenadas (coordinates) no son válidas',
        },
        location: {
          require: 'Debe proporcionar una ubicación (location) para la región (region).',
          invalid: 'Localização (location) é inválida',
          polygon: {
            required: 'La ubicación (location) y las coordenadas (coordinates) de la región (region) son obligatorias.',
            invalid: 'Las coordenadas (coordinates) del polígono (polygon) no son válidas.',
            coordinates: 'El primer y el último par de coordenadas deben ser iguales para ser un polígono.',
            order: 'Cada par de coordenadas necesita una longitud y una latitud, en ese orden.',
            information: 'La longitud y la latitud deben representarse mediante números.'
          },
          name: 'Necesitas darle un nombre (name) a la región (region).',
          address: 'Su dirección (address) debe ser texto'
        },
        missingParam: 'Es necessario informar los parámetros para realizar la actualización',
        userId: 'El usuario (user) debe ser del tipo ObjectID',
        userRequired: 'Debe asignar un usuario (user) a la región (region)'
      }
    },
    user: {
      notFound: 'Usuario (user) no encontrado',
      validation: {
        coordinates: {
          invalid: 'Las coordenadas (coordinates) no son válidas.'
        },
        missingParam: 'Se requieren la ubicación (location) y las coordenadas (coordinates) del usuario.',
        schema: 'Necesitas enviar la dirección (address) o ubicación (location)',
        location: 'Se requieren la ubicación (location) y las coordenadas (coordinates) del usuario.',
        address: 'Su dirección (address) debe ser texto'
      }
    },
    query: {
      unsupported: 'Parámetro de consulta no admitido. El único parámetro aceptado es expandir. Y su valor sólo puede ser verdadero o falso. Este parámetro permite que la ruta envíe subdocumentos dentro de los documentos, cuando corresponda.'
    },
    headers: {
      unsupportedLang: 'Idioma no soportado. Las opciones aceptadas para el encabezado Accept-Language son: pt (portugués), es (español), en (inglés) o * (todo). No se aceptarán opciones distintas a éstas. El idioma predeterminado es portugués (pt).',
    }
  },
  i18n: {
    langChanged: 'El idioma cambió a {{lang}}',
    langChangedError: 'Se produjo un error al cambiar el idioma a {{lang}}',
  },

  // clientMenuUsers: 'Usuarios',
  // clientMenuRegions: 'Regiones',
  // clientMenuSearchByDistance: 'Búsqueda por distancia',
  // clientMenuSearchByPoint: 'Búsqueda por punto',
  // userRegistrationTitle: 'Registro de usuario',
  // userRegistrationLabelName: 'Nombre',
  // userRegistrationInputNameErrorMsg: 'Por favor, introduzca un nombre válido',
  // userRegistrationLabelEmail: 'E-mail',
  // userRegistrationInputEmailErrorMsg: 'Por favor, introduzca un email válido',
  // userRegistrationLabelAddress: 'Dirección',
  // userRegistrationInputAddressErrorMsg: 'Por favor, proporcione una dirección válida',
  // userRegistrationLabelLocation: 'Ubicación',
  // userRegistrationLabelLongitude: 'Longitud',
  // userRegistrationInputLongitudeErrorMsg: 'Por favor, introduzca una longitud válida',
  // userRegistrationLabelLatitude: 'Latitud',
  // userRegistrationInputLatitudeErrorMsg: 'Por favor, introduzca una latitud válida',
  // userRegistrationInputUserFormErrorMsg: 'Proporcione únicamente la dirección o ubicación',
  // userRegistrationSubmitButton: 'Enviar',
  // userListingTitle: 'Lista de Usuarios',
  // tableHeaderIndex: '#',
  // tableHeaderNameEmail: 'Nombre / Email',
  // tableHeaderAddress: 'Dirección',
  // tableHeaderLongLat: 'Longitud / Latitud',
  // navPrev: 'Anterior',
  // navNext: 'Próximo',
};

export default { translation };
