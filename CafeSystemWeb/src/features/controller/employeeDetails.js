import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { getEmployees, postEmployee, putEmployee, updateEmployees, getCafe } from '../api/employeeDetails';

const initialState = {
    cafeList: null,
    cur_Cafe: null,
    employeeDetailsData: null,
    status: "idle",
    errorMessage: ""
};

export const getCafeAsync = createAsyncThunk(
    'EmployeeDetails/getCafe',
    async (id, ThunkAPI) => {
        const response = await getCafe(id);
        return response;
    }
);

export const PageAsync = createAsyncThunk(
    'EmployeeDetails/getEmployees',
    async (id, ThunkAPI) => {
        const response = await getEmployees(id);
        return response;
    }
);

export const postEmployeeAsync = createAsyncThunk(
    'EmployeeDetails/postEmployee',
    async (data, ThunkAPI) => {
        const response = await postEmployee(data);
        const resultPromise = Promise.resolve(response);
        resultPromise.then(() => {
            if(data.cafe){
                ThunkAPI.dispatch(updateNUmberOfEmployees(data, 'add', true));
            }
        })

        return response;
    }
);

export const putEmployeeAsync = createAsyncThunk(
    'EmployeeDetails/putEmployee',
    async (data, ThunkAPI) => {
        const response = await putEmployee(data);
        const resultPromise = Promise.resolve(response);
        resultPromise.then(() => {
            if(data.cafe){
                ThunkAPI.dispatch(updateNUmberOfEmployees(data, 'edit', ''));
            }
            ThunkAPI.dispatch(PageAsync(data.id));
        })
        return response;
    }
);

export const updateEmployeesAsync = createAsyncThunk(
    'EmployeeDetails/updateEmployees',
    async (data, ThunkAPI) => {
        const response = await updateEmployees(data);
        return response;
    }
);


export const EmployeeDetailsSlice = createSlice({
    name: 'EmployeeDetails',
    initialState,
    reducers: {
        clearAction: (state, action) => {
            state.employeeDetailsData = null;
        },
        storeCurCafe: (state, action) => {
            state.cur_Cafe = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCafeAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(getCafeAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(getCafeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.cafeList = action.payload;
            state.errorMessage = "";
        });
        builder.addCase(PageAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(PageAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(PageAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.employeeDetailsData = action.payload;
            state.cur_Cafe = action.payload.employees;
            state.cur_Cafe = state.cur_Cafe.cafe;
            state.errorMessage = "";
        });
        builder.addCase(postEmployeeAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(postEmployeeAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(postEmployeeAsync.fulfilled, (state, action) => {
            state.status = 'idle';

            if (action.payload.message) {
                state.errorMessage = action.payload.message;
            } else {
                alert('Employee added successfully');
                state.errorMessage = "";
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
        builder.addCase(putEmployeeAsync.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(putEmployeeAsync.rejected, (state) => {
            state.status = 'rejected';
        });
        builder.addCase(putEmployeeAsync.fulfilled, (state, action) => {
            state.status = 'idle';

            if (action.payload.message) {
                state.errorMessage = action.payload.message;
            } else {
                alert('Employee updated successfully');
                state.errorMessage = "";
            }
        });
    }
});

export const { clearAction, storeCurCafe } = EmployeeDetailsSlice.actions;
export const pageState = (state) => state.employeeDetails;

export const updateNUmberOfEmployees = (data, action, isIncrease) => (dispatch, getState) => {
    if(action === 'add'){
        dispatch(updateEmployeesAsync({ cafe: data.cafe, increase: true }));
    }else{
        if(data.cafe){
            var curCafe = getState().employeeDetails.cur_Cafe;
            if(curCafe && (curCafe !== data.cafe)){
              dispatch(updateEmployeesAsync({ cafe: curCafe, increase: false }));
              dispatch(updateEmployeesAsync({ cafe: data.cafe, increase: true }));
            }else if(!curCafe){
              dispatch(updateEmployeesAsync({ cafe: data.cafe, increase: true }));
            }
          }
    }
  
};

export default EmployeeDetailsSlice.reducer;
