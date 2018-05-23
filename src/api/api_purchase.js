import axios from 'axios';

let base='http://localhost:56649/api/Purchases';

export const ApiAddPurchase = params =>{ return axios.post(`${base}/PostAddPurchase`,params).then(res =>res.data);};
export const ApiGetPurchases = params =>{ return axios.get(`${base}/NewGetPurchase`,params).then(res=>res.data);};
export const ApiGetPurchaseByName = params =>{ return axios.get(`${base}/GetPurchasesByName`,{params:params});};
export const ApiGetPurchaseByDate = params =>{ return axios.get(`${base}/GetPurchasesByDate`,{params:params});};
