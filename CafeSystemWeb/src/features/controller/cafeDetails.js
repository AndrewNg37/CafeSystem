import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getCafe, postCafe, putCafe, updateCafeName } from '../api/cafeDetails';

const initialState = {
    cafeDetailsData: null,
    currentCafeName: null,
    status: "idle",
    errorMessage: ""
};

export const PageAsync = createAsyncThunk(
    'CafeDetails/getCafe',
    async (id, ThunkAPI) => {
        const response = await getCafe(id);
        return response;
    }
);

export const postCafeAsync = createAsyncThunk(
    'CafeDetails/postCafe',
    async (data, ThunkAPI) => {
        const response = await postCafe(data);
        return response;
    }
);

export const putCafeAsync = createAsyncThunk(
    'CafeDetails/putCafe',
    async (data, ThunkAPI) => {
        const response = await putCafe(data);
        const resultPromise = Promise.resolve(response);
        resultPromise.then(() => {
            ThunkAPI.dispatch(PageAsync(data.id));
        })
        return response;
    }
);

export const updateCafeNameAsync = createAsyncThunk(
    'CafeDetails/updateCafeName',
    async (data, ThunkAPI) => {
        const response = await updateCafeName(data);
        return response;
    }
);


export const CafeDetailsSlice = createSlice({
    name: 'CafeDetails',
    initialState,
    reducers: {
        clearAction: (state, action) => {
            state.cafeDetailsData = null;
        },
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
            state.cafeDetailsData = action.payload;
            state.currentCafeName = action.payload.cafe.name;
            state.errorMessage = "";
        });
        builder.addCase(postCafeAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(postCafeAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(postCafeAsync.fulfilled, (state, action) => {
            state.status = 'idle';

            if (action.payload.message) {
                state.errorMessage = action.payload.message;
            } else {
                alert('Cafe added successfully');
                state.errorMessage = "";
            }
        });
        
        builder.addCase(updateCafeNameAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(updateCafeNameAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(updateCafeNameAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(putCafeAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(putCafeAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(putCafeAsync.fulfilled, (state, action) => {
            state.status = 'idle';

            if (action.payload.message) {
                state.errorMessage = action.payload.message;
            } else {
                alert('Cafe updated successfully');
                state.errorMessage = "";
            }
        });
    }
});

export const { clearAction } = CafeDetailsSlice.actions;
export const pageState = (state) => state.cafeDetails;

export default CafeDetailsSlice.reducer;
