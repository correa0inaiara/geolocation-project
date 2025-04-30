const translation = {
  serverInit: 'Servidor iniciando',
  serverHost: 'escutando em {{host}}:{{port}}',
  dotenvxHello: 'Hello {{env}}',
  testsServerInit: 'Servidor de testes iniciando',
  testsServerHost: 'escutando testes em {{host}}:{{port}}',
  databaseInit: 'iniciando banco de dados',
  databaseConn: 'banco de dados conectado',
  databaseConnError: 'Banco de dados com problema na conexão',
  databaseDisconnectError: 'Banco de dados com problema na desconexão',
  lib: {
    noResults: 'Resultados não encontrados',
  },
  libPolygonValidation: `Corpo da requisição inválido. Deve ser do tipo Polygon (GeoJSON). 
    Exemplo: 
    {
      type: "Polygon",
      coordinates: [[[number, number], [number, number], [number, number], [number, number], ...[number, number][]]]
    }
    O primeiro par de coordenadas [number, number] deve ser igual ao último par de coordenadas [number, number], pois assim fecha o polígono.
    O mínimo de pares de coordenadas [number, number] é 4.
    Em relação às coordenadas [number, number]: O primeiro número é a longitude e o segundo a latitude.
    A longitude costuma ficar entre -180 e 180.
    E a latitude costuma ficar entre -90 e 90.

    Referência da especificação (em inglês): https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6`,
  libPointValidation: `Corpo da requisição inválido. Deve ser do tipo Point (GeoJSON). 
    Exemplo: 
    {
      type: "Point",
      coordinates: [number, number]
    }
    O máximo de pares de coordenadas [number, number] é 1.
    Em relação às coordenadas [number, number]: O primeiro número é a longitude e o segundo a latitude.
    A longitude constuma ficar entre -180 e 180.
    E a latitude constuma ficar entre -90 e 90.
  
    Referência da especificação (em inglês): https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.2`,
  libAddressValidation: 'Endereço inválido',
  libCoordinatesValidation: 'Coordenadas inválidas',
  apiRegionNotFound: 'Região (region) não encontrada',
  apiRegionLocationValidation:
    'Localização (Location) e coordenadas (coordinates) da região (region) são obrigatórias',
  apiRegionUpdateParametersMissing:
    'Você precisa informar os paramêtros para realizar a atualização',
  apiRegionUserValidation: 'Usuário (user) precisa ser do tipo ObjectID',
  apiUserNotFound: 'Usuário (user) não encontrado',
  apiUserSchemaValidation: 'Você precisa enviar ou endereço (address) ou localização (location)',
  apiUserLocationValidation:
    'Localização (Location) e coordenadas (coordinates) do usuário (user) são obrigatórias',
  apiUserUpdateParametersMissing:
    'Você precisa informar os paramêtros do usuário (user) para realizar a atualização',
  apiRegionLocationCoordinatesValidation: 'Coordenadas (coordinates) são inválidas',
  apiRegionLocationCoordinatesInvalid:
    'Coordenadas (coordinates) do polígono (polygon) são inválidas',
  apiRegionLocationPolygonCoordinatesInvalid:
    'O primeiro e o último par de coordenadas precisam ser os mesmos para ser um polígono (polygon).',
  apiRegionLocationCoordinatesOrder:
    'Cada par de coordenadas precisa de uma longitude e de uma latitude, nessa ordem.',
  apiRegionLocationCoordinatesInformation:
    'A longitude e a latitude precisam ser representadas por números',
  apiRegionNameRequired: 'Você precisa dar um nome (name) a região (region)',
  apiRegionUserRequired: 'Você precisa atribuir um usuário (user) a região (region)',
  apiRegionLocationRequired:
    'Você precisa informar uma localização (location) para a região (region)',
  apiUserLocationCoordinatesValidation: 'Coordenadas (coordinates) são inválidas',
  apiUserLocationInvalid: 'Localização (location) é inválida',
  apiUserAddressValidation: 'O seu endereço (address) precisa ser um texto',
  apiUnsupportedQueryParameter:
    'Query parâmetro não suportado. O único parâmetro aceito é expand (expandir). E seu valor só pode ser true (verdadeiro) ou false (falso). Esse parâmetro permite que a rota envie subdocumentos dentro de documentos, quando for o caso.',
  i18nLangChanged: 'Idioma alterado para {{lang}}',
  i18nLangChangeError: 'Ocorreu um erro ao alterar o idioma para {{lang}}',
  i18nUnsupportedLangHeader:
    'Idioma não suportado. As opções aceitas para o cabeçalho Accept-Language são: pt (português), es (espanhol), en (inglês) ou * (todas). Opções diferentes dessas não serão aceitas. O idioma padrão é o português (pt).',
  clientMenuUsers: 'Usuários',
  clientMenuRegions: 'Regiões',
  clientMenuSearchByDistance: 'Busca pela Distância',
  clientMenuSearchByPoint: 'Busca por Ponto',
  userRegistrationTitle: 'Cadastro de Usuários',
  userRegistrationLabelName: 'Nome',
  userRegistrationInputNameErrorMsg: 'Por favor, informe um nome válido',
  userRegistrationLabelEmail: 'E-mail',
  userRegistrationInputEmailErrorMsg: 'Por favor, informe um e-mail válido',
  userRegistrationLabelAddress: 'Endereço',
  userRegistrationInputAddressErrorMsg: 'Por favor, informe um endereço válido',
  userRegistrationLabelLocation: 'Localização',
  userRegistrationLabelLongitude: 'Longitude',
  userRegistrationInputLongitudeErrorMsg: 'Por favor, informe uma longitude válido',
  userRegistrationLabelLatitude: 'Latitude',
  userRegistrationInputLatitudeErrorMsg: 'Por favor, informe uma latitude válido',
  userRegistrationInputUserFormErrorMsg: 'Por favor, informe apenas endereço ou localização',
  userRegistrationSubmitButton: 'Enviar',
  userListingTitle: 'Lista de Usuários',
  tableHeaderIndex: '#',
  tableHeaderNameEmail: 'Nome / E-mail',
  tableHeaderAddress: 'Endereço',
  tableHeaderLongLat: 'Longitude / Latitude',
  navPrev: 'Anterior',
  navNext: 'Próximo',
};

export default { translation };
