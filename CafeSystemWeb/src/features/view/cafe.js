import React, { useState, useRef, useEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { PageAsync, pageState, DeleteAsync } from '../controller/cafe';
import EditDeleteBtn from "../../components/aggridButton";
import RedirectToEmployeeFilter from "../../components/redirectToEmployee";
import aggridImage from "../../components/aggridImage";
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export function Cafe() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(pageState);
  const cafeData = state.cafeData;
  const urlParams = useParams();

  useEffect(() => {
    dispatch(PageAsync());
  }, [dispatch]);

  const [openDeletePopup, setDeletePopup] = React.useState(false);
  const [selectDeleteId, setSelectDeleteId] = React.useState('');

  const [columnDefs] = useState(
    [
      {
        headerName: "Logo",
        field: 'logo',
        cellRenderer: aggridImage,
      },
      { headerName: "Name", field: "name" },
      { headerName: "Description", field: "description" },
      {
        headerName: "Employees",
        field: "employees",
        cellRenderer: "btnRedirect",
        valueGetter: params => [params.data.name, params.data.employees]
      },
      { headerName: "Location", field: "location" },
      {
        headerName: "Action",
        field: "_id",
        cellRenderer: "btnCellRenderer",
        valueGetter: params => [params.data._id, params.data.name, '/Cafe/CafeDetails', params.data._id],
        cellRendererParams: {
          Delete: function (id, name) {
            setSelectDeleteId({ id: id, name: name });
            handleOpenDeletePopup();
          }
        }
      }
    ]
  );

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const redirectToEdit = () => {
    navigate('/Cafe/CafeDetails');
  }

  const searchByLocation = (e) => {
    var target = e.target.value;
    dispatch(PageAsync(target));
  }

  const handleOpenDeletePopup = () => {
    setDeletePopup(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
  };

  const DeleteCafe = () => {
    dispatch(DeleteAsync(selectDeleteId));
    setDeletePopup(false);
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
          <h1>Cafe Management</h1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }} >
          <Box sx={{ mr: 2, flexGrow: 1 }}>
            <TextField
              label="Search by location"
              size="small"
              sx={{ width: '100%' }}
              onBlur={(e) => searchByLocation(e)}
              inputProps={{
                maxLength: 10
              }}
            />
          </Box>

          <Button variant="contained" sx={{ mb: 2 }} onClick={redirectToEdit}><AddIcon style={{ marginRight: 2 }} /> Add New</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="ag-theme-balham"
            style={{
              height: '100%',
              minHeight: '500px',
              width: '100%'
            }}
          >
            <AgGridReact
              rowStyle={{ display: 'flex', alignItems: 'center' }}
              columnDefs={columnDefs}
              rowData={cafeData ? cafeData.cafe : []}
              defaultColDef={defaultColDef}
              frameworkComponents={{
                btnCellRenderer: EditDeleteBtn,
                btnRedirect: RedirectToEmployeeFilter
              }}
            >
            </AgGridReact>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={openDeletePopup}
        onClose={handleCloseDeletePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this cafe? If continue, all the employees which under this cafe will be deleted too.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletePopup}>Cancel</Button>
          <Button onClick={DeleteCafe} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container >
  );
}
