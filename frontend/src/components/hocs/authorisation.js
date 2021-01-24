import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../actions/auth';


const Authorisation = (props) => {

    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);

    return (
        <div>
            {props.children}
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });


export default connect(null, { checkAuthenticated, load_user })(Authorisation);