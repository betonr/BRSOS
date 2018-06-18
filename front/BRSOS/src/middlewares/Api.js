import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://192.168.1.36:3000/brsos/api/`
    })
}