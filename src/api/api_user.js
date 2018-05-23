import axios from 'axios';

let base='http://localhost:56649/api/Staffs';

export const ApiLogin = params => { return axios.post(`${base}/PostLogin`, params).then(res => res.data);};
export const ApiGetStaffsByName = params => { return axios.get(`${base}/GetStaffsByName`, { params: params });};
export const ApiGetStaffs =params =>{ return axios.get(`${base}/GetStaffs`).then(res => res.data);};
export const ApiAddStaff =params =>{ return axios.post(`${base}/PostAddStaff`,params).then(res => res.data);};
export const ApiDeleteStaff =params =>{return axios.delete(`${base}/DeleteStaffByID`,{params:params});};
export const ApiPutStaff = params =>{return axios.put(`${base}/PutStaffBypara`,params).then(res => res.data);};
export const ApiGetStaffByID =params =>{ return axios.get(`${base}/GetStaffByID`,{params:params});};
export const ApiPutPeopleBypara =params =>{return axios.put(`${base}/PutPeopleBypara`,params).then(res=>res.data);};
export const ApiGetStaffsByPage =params =>{ return axios.get(`${base}/GetStaffsByPage`,{params:params});};