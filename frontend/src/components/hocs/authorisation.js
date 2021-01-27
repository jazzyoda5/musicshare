import React, { useEffect, useState, Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../actions/auth';
import Header from '../header';


const Layout = (props) => {
    const [redirect_to_login, set_redirect_to_login] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    useEffect(() => {
        props.checkAuthenticated();
        console.log('auth : ', isAuthenticated);
        if (isAuthenticated === false) {
            set_redirect_to_login(true);
        }
    }, [ isAuthenticated ]);

    if (redirect_to_login) {
        return (<Redirect to='/login' />);
    }

    return (
        <Fragment>
            <Header />
            {props.children}
        </Fragment>
    );
}


export default connect(null, { checkAuthenticated })(Layout);