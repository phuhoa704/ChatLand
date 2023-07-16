import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../../configs/apiUrl';
import axiosClient from '../../../utils/axiosClient';
import { hideLoading, showLoading } from '../../slices/Loading';
import { saveDistricts, saveProvinces, saveWards } from '../../slices/Address';

export const getProvinces = createAsyncThunk(
    'address/getProvinces',
    async(data: any, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(url.ADDRESS_PROVINCES);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveProvinces(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(saveProvinces([]));
                return {
                    action: false,
                    data: []
                }
            }
        }catch(err){
            console.log(err)
        }
    }
)

export const getDistricts = createAsyncThunk(
    'address/getDistricts',
    async(data: number, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(`${url.ADDRESS_DISTRICTS}${data}`);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveDistricts(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(saveDistricts([]));
                return {
                    action: false,
                    data: []
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)

export const getWards = createAsyncThunk(
    'address/getWards',
    async(data: number, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(`${url.ADDRESS_WARDS}${data}`);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveWards(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(saveWards([]));
                return {
                    action: false,
                    data: []
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)