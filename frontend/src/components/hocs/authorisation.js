import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../actions/auth';


const Authorisation = (props) => {
    const [redirect_to_login, set_redirect_to_login] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
        console.log('auth : ', isAuthenticated);
        if (isAuthenticated === false) {
            set_redirect_to_login(true);
        }
    }, [ isAuthenticated ]);

    if (redirect_to_login) {
        return (<Redirect to='/login' />);
    }

    return (
        <div style={{ height: '100%' }}>
            {props.children}
        </div>
    );
}





export default connect(null, { checkAuthenticated, load_user })(Authorisation);