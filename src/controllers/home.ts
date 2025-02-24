import i18next from "../i18n"

export const HomeController = function (req, res) {
  const menu = {
    users: i18next.t('clientMenuUsers'),
    regions: i18next.t('clientMenuRegions'),
    searchDistance: i18next.t('clientMenuSearchByDistance'),
    searchPoint: i18next.t('clientMenuSearchByPoint'),
  }

  const userRegistration = {
    title: i18next.t('userRegistrationTitle'),
    labelName: i18next.t('userRegistrationLabelName'),
    inputNameErrorMsg: i18next.t('userRegistrationInputNameErrorMsg'),
    labelEmail: i18next.t('userRegistrationLabelEmail'),
    inputEmailErrorMsg: i18next.t('userRegistrationInputEmailErrorMsg'),
    labelAddress: i18next.t('userRegistrationLabelAddress'),
    inputAddressErrorMsg: i18next.t('userRegistrationInputAddressErrorMsg'),
    labelLocation: i18next.t('userRegistrationLabelLocation'),
    labelLongitude: i18next.t('userRegistrationLabelLongitude'),
    inputLongitudeErrorMsg: i18next.t('userRegistrationInputLongitudeErrorMsg'),
    labelLatitude: i18next.t('userRegistrationLabelLatitude'),
    inputLatitudeErrorMsg: i18next.t('userRegistrationInputLatitudeErrorMsg'),
    inputUserFormErrorMsg: i18next.t('userRegistrationInputUserFormErrorMsg'),
    submitButton: i18next.t('userRegistrationSubmitButton')
  }

  const userListing = {
    title: i18next.t('userListingTitle')
  }

  const tableHeader = {
    index: i18next.t('tableHeaderIndex'),
    nameEmail: i18next.t('tableHeaderNameEmail'),
    address: i18next.t('tableHeaderAddress'),
    longLat: i18next.t('tableHeaderLongLat')
  }

  const nav = {
    prev: i18next.t('navPrev'),
    next: i18next.t('navNext')
  }

  const params = {menu, userRegistration, userListing, tableHeader, nav}
  res.render('home', params)
}