import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../../configs/apiUrl';
import axiosClient from '../../../utils/axiosClient';
import { hideLoading, showLoading } from '../../slices/Loading';
import { saveListKeyword } from '../../slices/Keywords';

export const findAllKeywords = createAsyncThunk(
    'keyword/findAllKeywords',
    async(data: any, thunkyApi) => {
        try {
            thunkyApi.dispatch(showLoading());
            const res = await axiosClient.get(url.KEY_WORD_FIND_ALL);
            thunkyApi.dispatch(hideLoading());
            if(res.data.success) {
                thunkyApi.dispatch(saveListKeyword(res.data.data));
                return {
                    action: true,
                    data: res.data.data
                }
            } else {
                thunkyApi.dispatch(saveListKeyword([]));
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