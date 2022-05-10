import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCafe, deleteCafe, updateEmployees } from '../api/cafe';

const initialState = {
    cafeData: null,
    status: "idle",
    errorMessage: ""
};

export const PageAsync = createAsyncThunk(
    'Cafe/getCafe',
    async (location, ThunkAPI) => {
        const response = await getCafe(location);
        return response;
    }
);

export const DeleteAsync = createAsyncThunk(
    'Cafe/deleteCafe',
    async (data, ThunkAPI) => {
        const response = await deleteCafe(data);
       
        return response;
    }
);

export const CafeSlice = createSlice({
    name: 'Cafe',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(PageAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(PageAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(PageAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.cafeData = action.payload;
            state.errorMessage = "";
        });
        builder.addCase(DeleteAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(DeleteAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(DeleteAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if(action.payload.message){
                state.errorMessage = action.payload.message;
            }else{
                state.errorMessage = "";
                state.cafeData = action.payload;
            }
           
        });
    }
});

// export const { } = CafeSlice.actions;
export const pageState = (state) => state.cafes;

export default CafeSlice.reducer;
