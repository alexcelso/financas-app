import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://financas-api-minhas.herokuapp.com/'
})

class ApiService {
    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }
}
export default ApiService;