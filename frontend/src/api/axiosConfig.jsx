import axios from 'axios'
import React from 'react'
  
    const api = axios.create({
        baseURL:'http://localhost:4500'
    })
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )



export default api
