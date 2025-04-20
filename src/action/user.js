import axios from 'axios'
import { setUser } from '../reducers/userReducer'
import { API_URL } from '../config'
import { hideLoader, showLoader } from '../reducers/appReducer'

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/register`, {
            email,
            password
        })
        alert(response.data.msg)
    } catch (e) {
        alert(e.response.data.msg)
    } 
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.post(`${API_URL}api/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.get(`${API_URL}api/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )

            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log(response.data)
        } catch (e) {
            console.log(e.response.data.msg)
            localStorage.removeItem('token')
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )

            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(hideLoader())
        }
    }
}

