import axios from 'axios';

let base='http://localhost:56649/api/SulProducts';

export const ApiGetSulProducts =params =>{ return axios.get(`${base}/GetSproduct`,{params:params});};
export const ApiPostAddSulProduct =params =>{return axios.post(`${base}/PostAddSulProduct`,params).then(res =>res.data);};
export const ApiGetSulProductsByName = params =>{ return axios.get(`${base}/GetSulProductsByName`,{params,params});};
export const ApiPutSulProduct = params =>{return axios.put(`${base}/PutSulProductByPara`,params).then(res=>res.data);};
export const ApiDeleteSulProduct = params =>{return axios.delete(`${base}/DeleteSulProductByID`,{params,params});};
export const ApiNewGetSulProduct = params =>{ return axios.get(`${base}/NewGetSproduct`,params).then(res=>res.data);};