import axios from 'axios';

let base='http://localhost:56649/api/Stocks';

export const ApiPutOrPostStock= params =>{ return axios.put(`${base}/PutOrPostStock`,params).then(res=>res.data);};
export const ApiGetStock = params =>{ return axios.get(`${base}/NewGetStock`,params).then(res=>res.data);};
export const ApiPutStocksell =params =>{ return axios.put(`${base}/PutStocksell`,params).then(res=>res.data);};
export const ApiPutOnSell =params =>{ return axios.put(`${base}/PutOnSell`,params).then(res=>res.data);};
export const ApiGetStockByName =params =>{ return axios.get(`${base}/GetByName`,{params:params});};