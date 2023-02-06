import Localbase from 'localbase'
let settingsDB = new Localbase('settingsDB')
export default (context, inject) => {
  inject('settingsDB', settingsDB)
}
