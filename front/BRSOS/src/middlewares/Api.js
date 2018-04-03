import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://betonoronha.com.br/brsos/api/`
    })
}