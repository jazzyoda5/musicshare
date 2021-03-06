import React, { useEffect, useState, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../actions/auth';
import Header from '../header';


const Layout = ({ children, checkAuthenticated, load_user }) => {

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
}


export default connect(null, { checkAuthenticated, load_user })(Layout);