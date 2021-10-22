import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state => state.auth.token);
    return (
        <Route
            {...rest}
            render={props => {
                return token ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        />
    );
}

