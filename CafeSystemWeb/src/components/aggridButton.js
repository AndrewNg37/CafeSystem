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
        this.props.Delete(this.props.value[0], this.props.value[1]);
    }
    render() {
        return (
            <Box sx={{display: 'flex'}}>
                <Link to={this.props.value[2] + '/' + this.props.value[3]} style={{marginRight: 10, color:'black'}}>Edit</Link>
                <span className="cursor_pointer" onClick={this.btnClickedHandler} to={'/Cafe'}><u>Delete</u></span>
            </Box>

        )
    }
}