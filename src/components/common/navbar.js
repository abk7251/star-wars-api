import React from 'react';
import { withRouter } from 'react-router-dom';

function Navbar(props) {
    const { pathname } = props.location;
    const route = pathname.split('/');
    const label = route[1] === '' ? 'API' : route[1];
    return (
        <nav>Explore Star Wars {label}</nav>
    )
}

export default withRouter(Navbar);