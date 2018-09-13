import axios from 'axios';
import { BASE_URL } from '../CONSTANT';

const searchPort = searchQuery => axios.get(`${BASE_URL}/ports/search/${searchQuery}`);

export {
    searchPort, // eslint-disable-line
};
