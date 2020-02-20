import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";


export default class Empty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div/>
        );
    }
}


