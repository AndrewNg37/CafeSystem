import React, { useState, useRef, useEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, TextField, Box, Alert } from '@mui/material';
import { PageAsync, pageState, putCafeAsync, postCafeAsync, updateCafeNameAsync, clearAction } from '../controller/cafeDetails';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function CafeDetails() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(pageState);
  const cafeData = state.cafeDetailsData ? state.cafeDetailsData.cafe : "";
  const cur_cafeName = state.currentCafeName ? state.currentCafeName : "";
  
  const urlParams = useParams();

  useEffect(() => {
    if (urlParams.id) {
      dispatch(PageAsync(urlParams.id));
    } else {
      dispatch(clearAction());
      document.getElementById('submissionForm').reset();
    }
  }, [dispatch, urlParams]);

  const redirectToList = () => {
    navigate('/Cafe');
  }

  const [isSizevalid, setSizeValidation] = React.useState(true);
  const checkFileSize = (e) => {
    var fileSize = (e.target.files[0].size / 1024 / 1024).toFixed(2);
    if (parseFloat(fileSize) > 2) {
      setSizeValidation(false);
    } else {
      setSizeValidation(true);
    }
  }

  const clearForm = () => {
    dispatch(clearAction());
    setName('');
    setDescription('');
    setLocation('');
    document.getElementById('submissionForm').reset();
  }

  const formSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    var serialize = require('form-serialize');
    var formSerialize = document.querySelector('#submissionForm');
    var obj = serialize(formSerialize, { hash: true });
    var logo = document.getElementById('logoFile') && document.getElementById('logoFile').files ? document.getElementById('logoFile').files[0] : '';

    if (logo) {
      if (isSizevalid) {
        obj.logo = logo;
        if (urlParams.id) {
          obj.id = urlParams.id;
          dispatch(putCafeAsync(obj));
          dispatch(updateCafeNameAsync({current_cafe: cur_cafeName, new_cafe: obj.name}));
        } else {
          dispatch(postCafeAsync(obj));
          clearForm();
        }
      }
    } else {
      obj.logo = cafeData.logo;
      if (urlParams.id) {
        obj.id = urlParams.id;
        dispatch(putCafeAsync(obj));
        dispatch(updateCafeNameAsync({current_cafe: cur_cafeName, new_cafe: obj.name}));
      } else {
        dispatch(postCafeAsync(obj));
        clearForm();
      }
    }

  }

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = React.useState('');

  const fieldChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'location':
        setLocation(e.target.value);
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
          <h1>Cafe Details</h1>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon />
            <Link to={'/Cafe'} className="text-decoration-none" > Back</Link>
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
                  label="Cafe Name"
                  value={name ? name : cafeData ? cafeData.name : ''}
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
                  multiline
                  rows={5}
                  maxRows={5}
                  name="description"
                  label="Description"
                  value={description ? description : cafeData ? cafeData.description : ''}
                  onChange={fieldChange}
                  sx={{ width: '100%', mt: 2 }}
                  inputProps={{
                    maxLength: 256
                  }}
                />
              </Box>
            </Box>
            <Box>
              <TextField
                name="location"
                label="Location"
                value={location ? location : cafeData ? cafeData.location : ''}
                onChange={fieldChange}
                size="small"
                sx={{ width: '100%', mt: 2 }}
                required
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              {cafeData && cafeData.logo && <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <span>Current Logo: &nbsp;</span>
                <img src={'//' + cafeData.logo} alt={cafeData ? cafeData.name : ''} style={{ maxWidth: '50px' }} />
              </Box>}
              <Box as="span" sx={{ pr: 1 }}><small><b>Upload Cafe Logo:</b></small></Box>
              <input
                type="file"
                id="logoFile"
                accept=".jpg, .png"
                style={{ marginTop: '10px' }}
                onChange={(e) => checkFileSize(e)}
              />
              {!isSizevalid && <Box sx={{ color: 'red' }}><small>Invalid file size!</small></Box>}
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
