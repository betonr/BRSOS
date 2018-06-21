import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://192.168.43.149:3000/brsos/api/`
    })
}