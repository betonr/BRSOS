import Api from './Api'

export default {
  get (token) {
    return Api().get('/ocorrencias', 
    { 
      headers: { 
        'Authorization': `${token}`,
      } 
    })
  },

  register (credentials, token) {
    return Api().post('/ocorrencia/register', credentials, { 
      headers: { 
        'Authorization': `${token}`,
      } 
    })
  },

  delete (id) {
    return Api().delete('/ocorrencia/delete/'+id)
  }
}