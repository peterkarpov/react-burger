import { Dispatch } from 'redux';
import { AppDispatch, AppThunk } from '../../utils/types';
import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    refreshTokenRequest,
    registerRequest,
    resetPasswordRequest,
    restorePasswordRequest,
    updateUserRequest
} from "../authApi";
import { deleteCookie, getCookie, setCookie } from "../utils";

export const SET_USER_REQUEST: 'SET_USER_REQUEST' = 'SET_USER_REQUEST';

export interface ISetUserRequest {
    readonly type: typeof SET_USER_REQUEST,
    readonly user: {
        email: string
    } | null,
}

export type TAythDispatchType = | ISetUserRequest;

export const getUser: AppThunk = function () {

    return function (dispatch: AppDispatch | AppThunk) {

        getUserRequest()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    //setUser({ ...data.user, id: data.user.email });
                    dispatch({
                        type: SET_USER_REQUEST,
                        user: data.user
                    });

                }
                return data.success;
            })
            .catch((error) => {
                if (error.message === 'jwt expired') {
                    return dispatch(refreshToken(getUser));
                } else {
                    console.log(error);
                }
            });
    }
}

export const refreshToken: AppThunk = function (callback: Function) {

    return function (dispatch: AppDispatch) {

        refreshTokenRequest({ token: getCookie('refresh-token') || '' })
            .then(res => {
                return res.json();
            })
            .then((data: any) => {

                if (data.accessToken) {
                    const authToken = data.accessToken.split('Bearer ')[1];

                    if (authToken) {
                        setCookie('token', authToken, null);
                    }
                }

                if (data.refreshToken) {
                    setCookie('refresh-token', data.refreshToken, null);
                }

                if (data.success && data.user) {
                    dispatch({
                        type: SET_USER_REQUEST,
                        user: data.user
                    });
                }

                dispatch(callback());

                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export const signIn: AppThunk = function (form: { email: string, password: string }) {

    return function (dispatch: Dispatch<ISetUserRequest>) {

        loginRequest(form)
            .then(res => {
                return res.json();
            })
            .then(data => {

                if (data.accessToken) {
                    const authToken = data.accessToken.split('Bearer ')[1];

                    if (authToken) {
                        setCookie('token', authToken, null);
                    }
                }

                if (data.refreshToken) {
                    setCookie('refresh-token', data.refreshToken, null);
                }

                if (data?.success) {
                    dispatch({
                        type: SET_USER_REQUEST,
                        user: data.user
                    });
                }

                return data;
            })
            .catch((error) => {
                console.log(error);
            });

    }
};

export const signOut: AppThunk = function () {

    return function (dispatch: AppDispatch | AppThunk) {

        const token = getCookie('refresh-token') || '';

        dispatch({
            type: SET_USER_REQUEST,
            user: null
        });

        deleteCookie('token');
        deleteCookie('refresh-token');

        logoutRequest({ token: token })
            .catch((error) => {
                if (error.message === 'jwt expired') {
                    return dispatch(refreshToken(signOut));
                }
            });;

    }

};

export const signUp: AppThunk = function (form: { name: string, password: string, email: string }) {

    return function (dispatch: AppDispatch) {

        registerRequest(form)
            .then(res => {
                return res.json();
            })
            .then(data => {

                if (data.accessToken) {
                    const authToken = data.accessToken.split('Bearer ')[1];

                    if (authToken) {
                        setCookie('token', authToken, null);
                    }
                }

                if (data.refreshToken) {
                    setCookie('refresh-token', data.refreshToken, null);
                }

                if (!data.success) {
                    console.log(data.message)
                }

                if (data?.success) {
                    dispatch({
                        type: SET_USER_REQUEST,
                        user: data.user
                    });
                }

                return data;
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export const restorePassword: AppThunk = function (form: { email: string }) {

    return function (dispatch: AppDispatch) {

        const data = restorePasswordRequest(form)
            .then(res => {
                return res.json();
            })
            .then(data => {

                if (!data.success) {
                    console.log(data.message)
                }

                return data;
            })
            .catch((error) => {
                console.log(error)
            });

        return data;
    }
}

export const resetPassword: AppThunk = function (form: { token: string, password: string }) {

    return function (dispatch: Dispatch) {

        const data = resetPasswordRequest(form)
            .then(res => {
                return res.json();
            })
            .then(data => {

                if (!data.success) {
                    console.log(data.message)
                }

                return data;
            })
            .catch((error) => {
                console.log(error)
            });

        return data;
    }
}

export const updateUser: AppThunk = function (form: { name: string, email: string, password: string }) {

    return function (dispatch: AppDispatch | AppThunk) {

        const data = updateUserRequest(form)
            .then(res => {
                return res.json();
            })
            .then(data => {

                if (!data.success) {
                    console.log(data.message)
                }

                return data;
            })
            .then((data) => {

                if (data.success) {
                    dispatch(signOut());
                }

                return data;
            })
            .then((data) => {

                if (data.success) {
                    dispatch(signIn({ email: form.email, password: form.password }));
                }

                return data;
            })
            .catch((error) => {
                if (error.message === 'jwt expired') {
                    return dispatch(refreshToken(updateUser));
                }
                console.log(error)
            });

        return data;
    }
}
