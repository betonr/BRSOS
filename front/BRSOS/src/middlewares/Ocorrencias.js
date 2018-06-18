import Api from './Api'

export default {
  get () {
    return Api().get('/ocorrencias')
  },
  register (credentials) {
    return Api().post('/ocorrencia/register', credentials)
  }
}