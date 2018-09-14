import axios from 'axios';
import { BASE_URL } from '../../CONSTANT';

const getRates = ({
                      originPortId,
                      destinationPortId,
                      fromDate,
                      toDate,
}) => axios.get(`${BASE_URL}/rates/${originPortId}/${destinationPortId}/${fromDate}/${toDate}`);

export {
    getRates, // eslint-disable-line
};
