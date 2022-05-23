import axios from "axios"

export const request = axios.create({
  baseURL: 'https://api.realworld.io'
})

export default ({ store, redirect }) => {
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  request.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    const { response } = error;
    if (response.status === 401) {
      return redirect('/login')
    }
    return Promise.reject(error);
  });
}