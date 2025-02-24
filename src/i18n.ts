import * as i18next from 'i18next'
import en from './../public/locales/en'
import pt from './../public/locales/pt'
import { log } from './logs'

i18next
  .init({
    lng: 'pt',
    debug: false,
    load: 'languageOnly',
    resources: {
      en: en,
      pt: pt
    }
  }, (err, t) => {
  if (err) return console.error(err)
    log.error({i18n: err})
})

export default i18next