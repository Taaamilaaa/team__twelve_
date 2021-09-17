import axios from 'axios';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'YsjNnwTdurU18i07JYk9pbaKz6rXoV2D';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.countryCode = '';
        this.page = 0;
    };

    fetchApi() {

        const searchParams = new URLSearchParams({
            keyword: this.searchQuery,
            size: '12',
            countryCode: this.countryCode,
            page: this.page,
        })
        const url = `${BASE_URL}events.json?&apikey=${API_KEY}&${searchParams}`;
        return axios.get(url);

    };
    get queryCountry() {
        return this.countryCode.trim();
    };
    set queryCountry(newQueryCountry) {
        this.countryCode = newQueryCountry;
    }
    get query() {
        return this.searchQuery.trim();
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    resetPage() {
        this.page = 0;
    }
    incrementPage() {
        this.page += 1;
    }

}
