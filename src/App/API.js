import axios from 'axios';
import { BASE_URL } from './CONSTANT';
import { debounce } from './Util';

const searchPort = searchQuery => debounce(() => axios.get(`${BASE_URL}/ports/search/${searchQuery}`));

export {
    searchPort, // eslint-disable-line
};
