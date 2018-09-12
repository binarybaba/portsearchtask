import axios from 'axios';

axios.get('/api/ports/NOOSL')
    .then(res => console.log(res.data));

axios.get('/api/ports/search/shan')
    .then(res => console.log(res.data));

axios.get('/api/rates/NOOSL/CNSTG/2018-06-30/2018-08-30')
    .then(res => console.log(res.data));
