import React, { useState, useRef, useEffect, createRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { PageAsync, pageState, DeleteAsync } from '../controller/employees';
import EditDeleteBtn from "../../components/aggridButton";
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export function Employees() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = useParams();
  const state = useSelector(pageState);
  const employeeData = state.employeesData;
  const todayDate = moment().startOf('day');

  useEffect(() => {
    if(urlParams.cafe){
      dispatch(PageAsync(urlParams.cafe));
    }else{
      dispatch(PageAsync());
    }
  
  }, [dispatch, urlParams]);

  const [openDeletePopup, setDeletePopup] = React.useState(false);
  const [selectDeleteId, setSelectDeleteId] = React.useState('');

  const [columnDefs] = useState(
    [
      { headerName: "Name", field: "name" },
      { headerName: "Email address", field: "email_address" },
      { headerName: "Phone number", field: "phone_number" },
      {
        headerName: "Days worked in the café",
        field: "start_datetime",
        valueGetter: params => params.data.start_datetime,
        valueFormatter: params => moment.duration(todayDate.diff(moment(params.value, "YYYY-MM-DD"))).asDays(),
      },
      { headerName: "Café name", field: "cafe" },
      {
        headerName: "Action",
        field: "_id",
        cellRenderer: "btnCellRenderer",
        valueGetter: params => [params.data._id, params.data.cafe, '/Employees/EmployeeDetails', params.data._id],
        cellRendererParams: {
          Delete: function (id, cafe) {
            setSelectDeleteId({ id: id, cafe: cafe });
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

  // var [isRedirect, setRedirect] = useState(false);

  const redirectToEdit = () => {
    navigate('/Employees/EmployeeDetails');
  }

  const searchByCafe = (e) => {
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
          <h1>Employees Management</h1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row' }} >
          <Box sx={{ mr: 2, flexGrow: 1 }}>
            <TextField
              label="Search by cafe"
              defaultValue={urlParams.cafe}
              size="small"
              sx={{ width: '100%' }}
              onBlur={(e)=>searchByCafe(e)}
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
              rowData={employeeData ? employeeData.employees : []}
              defaultColDef={defaultColDef}
              frameworkComponents={{
                btnCellRenderer: EditDeleteBtn
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
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletePopup}>Cancel</Button>
          <Button onClick={DeleteCafe} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
