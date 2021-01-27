import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';

const Loader = () => {
    return (
        <Container style={{ marginTop: '2rem' }}>
            <CircularProgress />
        </Container>
    );
}

export default Loader;
