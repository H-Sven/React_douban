import axios from "axios";
import qs from "qs";



axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;  //请求携带cookie
axios.defaults.crossDomain = true;  //请求携带额外数据(不包含cookie)
axios.defaults.baseURL = `/v2/movie`; //请求地址baseUrl
//http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify({
        ...config.data
      });
    }else{
      config.params = {
        ...config.params,
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // alert("网络错误，请刷新重试");
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(response => {
      if (response.statusText === 'OK') {
        resolve(response.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
        if (response.statusText === 'OK') {
          resolve(response.data);
        }
      },err => {
        reject(err);
      }
    );
  });
}