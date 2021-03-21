import axios from 'axios'
const baseUrl = '/api'


const getAll = () => {
    const request = axios.get(`${baseUrl}/persons`)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(`${baseUrl}/persons`, newPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/persons/${id}`)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/persons/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }