// button-services -bakend server-controler-response return 
import axios from "axios"

export const axiosInstance=axios.create({});
  // order in functions matters
export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
      method: method,
      url: url,
        data:bodyData? bodyData:null,
        headers:headers?headers:null,
        params:params?params:null,
    });
}