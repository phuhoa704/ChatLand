import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../../configs/apiUrl';
import axiosClient from '../../../utils/axiosClient';
import { hideLoading, showLoading } from '../../slices/Loading';
import { saveListTypeMap } from '../../slices/TypeMap';

export const getTypeMap = createAsyncThunk(
    'typemap/getTypeMap',
    async(data: any, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(url.TYPE_MAP_FIND_ALL_ACTIVE);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveListTypeMap(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(saveListTypeMap([]));
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