import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmployees, deleteEmployees, updateEmployees } from '../api/employees';

const initialState = {
    employeesData: null,
    status: "idle",
    errorMessage: ""
};

export const PageAsync = createAsyncThunk(
    'Employees/getEmployees',
    async (cafe, ThunkAPI) => {
        const response = await getEmployees(cafe);

        return response;
    }
);

export const updateEmployeesAsync = createAsyncThunk(
    'Employees/updateEmployees',
    async (data, ThunkAPI) => {
        const response = await updateEmployees({ cafe: data.cafe, increase: false });

        return response;
    }
);

export const DeleteAsync = createAsyncThunk(
    'Employees/deleteEmployees',
    async (data, ThunkAPI) => {
        const response = await deleteEmployees(data);
        const resultPromise = Promise.resolve(response);
        resultPromise.then(() => {
            if(data.cafe){
                ThunkAPI.dispatch(updateEmployeesAsync(data));
            }
        })
        return response;
    }
);

export const EmployeesSlice = createSlice({
    name: 'Employees',
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
            state.employeesData = action.payload;
        });
        builder.addCase(DeleteAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(DeleteAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(DeleteAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.employeesData = action.payload;
            if (action.payload.message) {
                state.errorMessage = action.payload.message;
            } else {
                state.errorMessage = "";
                state.employeesData = action.payload;
                console.log(action.payload);
            }

        });
        builder.addCase(updateEmployeesAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(updateEmployeesAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(updateEmployeesAsync.fulfilled, (state, action) => {
            state.status = 'idle';

        });
    }
});

// export const { } = EmployeesSlice.actions;
export const pageState = (state) => state.Employees;

export default EmployeesSlice.reducer;
