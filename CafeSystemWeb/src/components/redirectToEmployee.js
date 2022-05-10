import React from 'react';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default class EditDeleteBtn extends React.Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.redirectToEmplyee(this.props.value);
    }
    render() {
        return (
            <Box sx={{display: 'flex'}}>
                <Link to={`/Employees/${this.props.value[0]}`} style={{marginRight: 10, color:'black'}}>{this.props.value[1]}</Link>
                {/* <span className="cursor_pointer" onClick={this.btnClickedHandler} to={'/Cafe'}><u>Delete</u></span> */}
            </Box>

        )
    }
}