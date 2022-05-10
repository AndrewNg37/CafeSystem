import { configureStore } from '@reduxjs/toolkit';
import cafeReducer from '../features/controller/cafe';
import cafeDetailsReducer from '../features/controller/cafeDetails';
import employeesReducer from '../features/controller/employees';
import employeeDetailsReducer from '../features/controller/employeeDetails';

export const store = configureStore({
  reducer: {
    cafes: cafeReducer,
    Employees: employeesReducer,
    cafeDetails: cafeDetailsReducer,
    employeeDetails: employeeDetailsReducer
  },
});
