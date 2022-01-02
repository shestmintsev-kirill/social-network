import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type MapPropsType = {
    isAuth: boolean;
};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        const { isAuth, ...restProps } = props;

        if (!isAuth) return <Redirect to="/login" />;

        return <WrappedComponent {...(restProps as WCP)} />;
    };

    return connect<MapPropsType, unknown, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
}
