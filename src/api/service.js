/**
 * @typedef {object} PersonGroup
 * @property {string} name
 * @property {Person[]} persons
 */
/**
 * @typedef {object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} position
 * @property {Comment[]} comments
 */
/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} personId
 * @property {string} text
 * @property {string} createdAt
 */
/**
 * @typedef {object} ApiServiceOptions
 * @property {string} baseUrl
 */
export default class ApiService {
    /**
     * @param {ApiServiceOptions} options
     */
    constructor({ baseUrl = 'https://61e5bc60c14c7a0017124e3d.mockapi.io/api' } = {}) {
      this.options = { baseUrl }
    }

    query(apiUrl, params) {
      return new Promise((resolve, reject) => {
        fetch(apiUrl, params)
          .then(response => {
            return response.json()
          })
          .then(data => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    /**
     * @returns {Promise.<Person[], Error>}
     */
    getPersons() {
      return this.query(`${this.options.baseUrl}/persons`, { method: 'GET' })
    }
    /**
     * @returns {Promise.<Comment[], Error>}
     */
    getComments() {
      return this.query(`${this.options.baseUrl}/comments`, { method: 'GET' })
    }
}
