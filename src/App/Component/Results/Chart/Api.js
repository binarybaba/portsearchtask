import axios from 'axios';
import { BASE_URL } from '../../../CONSTANT';

const getRates = (originPortId, destinationPortId, from, to) => (
    axios.get(`${BASE_URL}/rates/${originPortId}/${destinationPortId}/${from}/${to}`)
);

export {
    getRates, // eslint-disable-line
};
