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

export const SET_USER_REQUEST = 'SET_USER_REQUEST';

export function getUser() {

    return function (dispatch: any) {

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

export function refreshToken(callback: Function) {

    return function (dispatch: any) {

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

export function signIn(form: { email: string, password: string }) {
    
    return function (dispatch: any) {

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

export function signOut() {

    return function (dispatch: any) {

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

export function signUp(form: { name: string, password: string, email: string }) {

    return function (dispatch: any) {

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

export function restorePassword(form: { email: string }) {

    return function (dispatch: any) {

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

export function resetPassword(form: { token: string, password: string }) {

    return function (dispatch: any) {

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

export function updateUser(form: { name: string, email: string, password: string }) {

    return function (dispatch: any) {

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
