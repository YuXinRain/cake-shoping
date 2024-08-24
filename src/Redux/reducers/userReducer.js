import { createSlice } from '@reduxjs/toolkit'
import { getLogin, getMe, getRegister, PatchUser } from '../../WebAPI'
import { setAuthToken } from '../../token'

const initialState = {
    user: '',
    isLodding: false,
    err: '',
    emailError: '',
    editOpen: false,
    phoneError: '',
    }

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
        state.err = action.payload
    },
    setUser: (state, action) => {
        state.user = action.payload
    },
    setLodding: (state, action) => {
        state.isLodding = action.payload
    },
    setEmailError: (state, action) => {
        state.emailError = action.payload
    },
    setEditOpen: (state, action) => {
        state.editOpen = action.payload
    },
    setPhoneError: (state, action) => {
        state.phoneError = action.payload
    }
  },
})

export const { setError, setUser, setLodding, setEmailError, setEditOpen, setPhoneError } = userReducer.actions

export const getUser = (data) => (dispatch) => {
    dispatch(setLodding(true))
    getLogin(data).then(res => {
        setAuthToken(res.token)
        if(res.ok === 0){
            dispatch(setError(res.message))
            dispatch(setLodding(false))
        }
        getMe().then(data => {
            if(data.ok === 1){
                dispatch(setUser(data.result))
                dispatch(setLodding(false))
            }
        }).catch(err => console.log(err))
   }   
    )
    .catch(err => console.log(err))
}

export const postRegister = (data) => (dispatch) => {
    dispatch(setLodding(true))
    getRegister(data).then(res => {
        setAuthToken(res.token)
        if(res.ok === 0){
            dispatch(setError(res.message))
            dispatch(setLodding(false))
        }
        getMe().then(data => {
            if(data.ok === 1){
                dispatch(setUser(data.result))
                dispatch(setLodding(false))
            }
        }).catch(err => console.log(err))
})
    .catch(err=> console.log(err))
}

export const patchUserAll = (data) => (dispatch) => {
    PatchUser(data).then(res => {
        if(res.ok === 1){
            console.log(res)
            getMe().then(text => {
                if(text.ok === 1){
                    dispatch(setUser(text.result))
                }
            }).catch(err => console.log(err))
        }
    })
}
export const validate = (email, phoneNumber, userAll) => (dispatch) => {
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    }
    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
      }
    if (!validateEmail(email)) {
        dispatch(setEmailError('請輸入有效的電子郵件'));
        dispatch(setEditOpen(true))
        return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
        dispatch(setPhoneError("請輸入有效的手機格式"));
        dispatch(setEditOpen(true))
        return;
    }
    dispatch(setEditOpen(false))
    dispatch(setEmailError(' '))
    dispatch(setPhoneError(' '))
    dispatch(patchUserAll(userAll))
}

export default userReducer.reducer