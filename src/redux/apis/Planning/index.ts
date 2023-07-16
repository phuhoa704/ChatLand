import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../../configs/apiUrl';
import axiosClient from '../../../utils/axiosClient';
import { hideLoading, showLoading } from '../../slices/Loading';
import { readDataDto, searchListPlanningDto } from './dto';
import { saveListPlanning, savePostById, saveReadData } from '../../slices/Planning';

export const searchListPlanning = createAsyncThunk(
    'planning/searchListPlanning',
    async(data: searchListPlanningDto, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.post(url.POST_SEARCH_CUSTOMER, data);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveListPlanning(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(saveListPlanning([]));
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

export const findOnePostById = createAsyncThunk(
    'planning/findOnePostById',
    async(data: number, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(`${url.POST_FIND_ONE}/${data}`);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(savePostById(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(savePostById({}));
                return {
                    action: false,
                    data: {}
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)

export const viewPostById = createAsyncThunk(
    'planning/viewPostById',
    async(data: number, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(`${url.VIEW_POST}/${data}`);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(savePostById(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(savePostById({}));
                return {
                    action: false,
                    data: {}
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)

export const readData = createAsyncThunk(
    'planning/readData',
    async(data: readDataDto, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.post(url.READ_DATA, data);
            thunkyApi.dispatch(hideLoading());
            if(res.data.result) {
                thunkyApi.dispatch(saveReadData(res.data));
                return {
                    action: true,
                    data: res.data
                }
            } else {
                thunkyApi.dispatch(saveReadData({}));
                return {
                    action: false,
                    data: {}
                }
            }
        }catch(err){
            console.log(err);
        }
    }
)