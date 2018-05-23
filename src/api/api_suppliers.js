import axios from 'axios';

let base='http://localhost:56649/api/Suppliers';

export const ApiGetSuppliers = params =>{ return axios.get(`${base}/Getsupplier`,{params:params});};
export const ApiPostAddSupplier = params =>{return axios.post(`${base}/PostAddSupplier`,params).then(res=>res.data);};
export const ApiGetSupplierByName = params =>{return axios.get(`${base}/GetSupplierByName`,{params,params});};
export const ApiPutSupplier = params =>{return axios.put(`${base}/PutSupplierByPara`,params).then(res =>res.data);};
export const ApiDeleteSupplier = params =>{return axios.delete(`${base}/DeleteSupplierByID`,{params,params});};