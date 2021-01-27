import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../loader';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    console.log('is authenticated, layout: ', isAuthenticated);

    if (isAuthenticated === null) {
        return (<Loader />)
    }
    return (
        <Route
            {...rest}
            render={props => isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />}
        />
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(PrivateRoute);