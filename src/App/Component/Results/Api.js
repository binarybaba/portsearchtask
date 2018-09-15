import axios from 'axios';
import { BASE_URL } from '../../CONSTANT';

const getPortDetails = portId => axios.get(`${BASE_URL}/ports/${portId}`);

export {
    getPortDetails, // eslint-disable-line
};
