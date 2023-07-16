import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../../configs/apiUrl';
import axiosClient from '../../../utils/axiosClient';
import { hideLoading, showLoading } from '../../slices/Loading';
import { LoginDto } from './dto';
import { saveToken, saveUser } from '../../slices/Auth';
import { LOCALSTORE } from '../../../configs/constants';
import { showToast } from '../../slices/Toast';

export const Login = createAsyncThunk(
    'user/Login',
    async(data: LoginDto, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.post(url.AUTH_LOGIN, data);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                window.localStorage.setItem(LOCALSTORE.USER, res.data.user);
                window.localStorage.setItem(LOCALSTORE.TOKEN, res.data.accessToken);
                thunkyApi.dispatch(saveUser(res.data.user));
                thunkyApi.dispatch(saveToken(res.data.accessToken));
                thunkyApi.dispatch(showToast({severity: 'success', summary: 'Đăng nhập', detail: res.data.message}))
                return {
                    action: true,
                    user: res.data.user,
                    token: res.data.accessToken
                }
            } else {
                thunkyApi.dispatch(showToast({severity: 'error', summary: 'Lỗi đăng nhập', detail: res.data.message}))
                return {
                    action: false,
                    user: {},
                    token: '',
                    message: res.data.message
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)

export const Logout = createAsyncThunk(
    'auth/Logout',
    async(data: any, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(url.AUTH_LOGOUT);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                window.localStorage.removeItem(LOCALSTORE.USER);
                window.localStorage.removeItem(LOCALSTORE.TOKEN);
                thunkyApi.dispatch(saveUser({}));
                thunkyApi.dispatch(saveToken(''));
                thunkyApi.dispatch(showToast({severity: 'success', summary: 'Đăng xuất', detail: res.data.message}))
                return {
                    action: true
                }
            } else {
                return {
                    action: false
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)

export const getProfileMe = createAsyncThunk(
    'auth/getProfileMe',
    async(data: any, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(url.AUTH_GETPROFILE);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveUser(res.data.data.Account));
                return {
                    action: true,
                    data: res.data.data.Account
                }
            } else {
                thunkyApi.dispatch(saveUser({}));
                return {
                    action: false,
                    user: {}
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)