import React from 'react';

export default class aggridImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <img
                alt="logo"
                style={{width:'auto', height: '25px'}}
                src={process.env.HTTPS ? 'https://' + this.props.value : 'http://' + this.props.value}
            />

        )
    }
};