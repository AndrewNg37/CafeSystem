import React, { useState, useRef, useEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, TextField, Box, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PageAsync, pageState, putEmployeeAsync, postEmployeeAsync, clearAction, getCafeAsync, updateEmployeesAsync } from '../controller/employeeDetails';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';

export function EmployeeDetails() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(pageState);
  const employeeData = state.employeeDetailsData ? state.employeeDetailsData.employees : "";
  const cafeList = state.cafeList ? state.cafeList.cafe : [];
  const curCafe = state.cur_Cafe ? state.cur_Cafe : "";
  const urlParams = useParams();

  useEffect(() => {
    dispatch(getCafeAsync(employeeData && employeeData.cafe ? employeeData.cafe : ''));
    if (urlParams.id) {
      dispatch(PageAsync(urlParams.id));
    } else {
      dispatch(clearAction());
      document.getElementById('submissionForm').reset();
    }
  }, [dispatch, urlParams]);

  const redirectToList = () => {
    navigate('/Employees');
  }

  const clearForm = () => {
    dispatch(clearAction());
    setName('');
    setEmail('');
    setPhone('');
    setCafe('');
    setGender('');
    setDateTime('');
    document.getElementById('submissionForm').reset();
  }

  const [phoneValid, setPhoneValidation] = React.useState(true);
  const formSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    var serialize = require('form-serialize');
    var formSerialize = document.querySelector('#submissionForm');
    var obj = serialize(formSerialize, { hash: true });

    if (obj.phone_number.charAt(0) !== '8' && obj.phone_number.charAt(0) !== '9') {
      setPhoneValidation(false);
    } else {
      setPhoneValidation(true);
      if (urlParams.id) {
        obj.id = urlParams.id;
        dispatch(putEmployeeAsync(obj));

      } else {
        dispatch(postEmployeeAsync(obj));
        clearForm();
      }
    }


  }

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [cafe, setCafe] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [dateTime, setDateTime] = React.useState('');

  const fieldChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email_address':
        setEmail(e.target.value);
        break;
      case 'phone_number':
        setPhone(e.target.value);
        break;
      case 'cafe':
        setCafe(e.target.value);
        break;
      case 'gender':
        setGender(e.target.value);
        break;
      case 'start_datetime':
        setDateTime(e.target.value);
        break;

      default:
    }
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {(state.status !== 'idle' || state.status === 'rejected') && <Box className="loadingScreen"><img src="./loading.gif" className="icons-loading" alt="" /></Box>}
        </Grid>
      </Grid>

      {state.errorMessage && <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity="error">{state.errorMessage}</Alert>
        </Grid>
      </Grid>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Employee Details</h1>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon />
            <Link to={'/Employees'} className="text-decoration-none" > Back</Link>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Box component="form" autoComplete="off" onSubmit={(e) => formSubmit(e)} id="submissionForm">
            <Box sx={{ border: '1px solid #F4F4F4' }}>
              <Box>
                <TextField
                  name="name"
                  label="Employee Name"
                  value={name ? name : employeeData ? employeeData.name : ''}
                  onChange={fieldChange}
                  size="small"
                  sx={{ width: '100%', mt: 2 }}
                  inputProps={{
                    minLength: 6,
                    maxLength: 10
                  }}
                  required
                />

              </Box>
              <Box>
                <TextField
                  name="email_address"
                  label="Email Address"
                  value={email ? email : employeeData ? employeeData.email_address : ''}
                  onChange={fieldChange}
                  size="small"
                  sx={{ width: '100%', mt: 2 }}
                  type="email"
                  required
                />

              </Box>
            </Box>
            <Box>
              <TextField
                name="phone_number"
                label="Phone Number"
                value={phone ? phone : employeeData ? employeeData.phone_number : ''}
                onChange={fieldChange}
                size="small"
                sx={{ width: '100%', mt: 2 }}
                type="number"
                inputProps={{
                  minLength: 8
                }}
                required
              />
              {!phoneValid && <small style={{ color: 'red' }}>Phone number is not start from 8 or 9</small>}
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
              <label style={{ marginRight: '10px' }}><input type="radio" name="gender" onChange={fieldChange} value="Male" required checked={gender ? (gender === 'Male') : (employeeData && employeeData.gender && employeeData.gender === 'Male')} /> Male</label>
              <label><input type="radio" name="gender" onChange={fieldChange} value="Female" checked={gender ? (gender === 'Female') : (employeeData && employeeData.gender && employeeData.gender === 'Female')} required /> Female</label>

            </Box>
            <Box>
              <TextField
                name="start_datetime"
                label="Start Date"
                value={dateTime ? moment(dateTime).format('YYYY-MM-DD') : employeeData ? moment(employeeData.start_datetime).format('YYYY-MM-DD') : ''}
                onChange={fieldChange}
                size="small"
                sx={{ width: '100%', mt: 2 }}
                type="date"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="CafeLabel">Cafe</InputLabel>
                <Select
                  value={cafe ? cafe : employeeData ? employeeData.cafe : ''}
                  labelId="CafeLabel"
                  name="cafe"
                  // value={age}
                  label="Cafe"
                  size="small"
                  sx={{ width: '100%' }}
                  onChange={fieldChange}
                >
                  <MenuItem value="">None</MenuItem>
                  {cafeList && cafeList.map((data, index) => {
                    return (
                      <MenuItem key={index} value={data.name}>{data.name}</MenuItem>
                    )
                  })
                  }
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 3 }}>
              <Button variant="contained" color="error" sx={{ mr: 1 }} onClick={redirectToList}> Cancel</Button>
              <Button variant="contained" type="submit">Submit</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container >
  );
}
