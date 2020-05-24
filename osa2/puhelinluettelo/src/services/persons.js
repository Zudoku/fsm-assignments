import axios from 'axios'
const baseUrl = 'http://localhost:3001'


const getAll = () => {
    const request = axios.get(`${baseUrl}/persons`)
    return request.then(response => response.data)
}

const create = newPerson => {
    return axios.post(`${baseUrl}/persons`, newPerson)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/persons/${id}`)
}

export default { getAll, create, remove }