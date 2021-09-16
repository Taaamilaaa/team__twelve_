import axios from 'axios';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
// const API_KEY = 'YsjNnwTdurU18i07JYk9pbaKz6rXoV2D';
const API_KEY =  'UJKc1h7Ed8GE2JElxN8lqmVTNX8pNJn5'

export default class ApiService {
    constructor(countryCode, page, searchQuery) {
        this.searchQuery = searchQuery;
        this.countryCode = countryCode;
        this.page = page;
    };
    
    fetchApi() {

         const searchParams = new URLSearchParams({
            keyword: this.searchQuery,
            size: '12',
            locale: this.countryCode,
            page: this.page,
        })
        const url = `${BASE_URL}events.json?&apikey=${API_KEY}&${searchParams}`;
        return axios.get(url);
        
    };

}


