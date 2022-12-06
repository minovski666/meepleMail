import {Link, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";

export default function ChangePasswordPage() {
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
    const [reEnteredPassword, setReEnteredPassword] = useState<string>('');
    const [rePasswordIsValid, setRePasswordIsValid] = useState<boolean>();
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    const passwordChangeHandler = (event: any) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length >= 6
        );
    };

    const rePasswordChangeHandler = (event: any) => {
        setReEnteredPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length >= 6 && event.target.value === enteredPassword
        );
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length >= 6);
    };

    const validateRePasswordHandler = () => {
        setRePasswordIsValid(reEnteredPassword.trim().length >= 6 && reEnteredPassword === enteredPassword);
    };

    const changePassword = () => {
        axios.post(url + "auth/reset-password/new-password", {
            userId: searchParams.get('id'),
            token: searchParams.get('token'),
            password: enteredPassword
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data) {
                window.location.href = "/login"
            }
        })
    }

    return (
        <div className="access-wrapper">
            <div className="access">
                <h1>Change Password</h1>
                <div>

                    <div className="access-form-group">
                        {passwordIsValid === false && (
                            <span className="validation-tooltip error">Invalid password entry</span>
                        )}
                        <input type="password" name="" placeholder="Password"
                               value={enteredPassword}
                               onChange={passwordChangeHandler}
                               onBlur={validatePasswordHandler}/>

                    </div>
                    <div className="access-form-group">
                        {passwordIsValid === false && (
                            <span className="validation-tooltip error">Invalid password entry</span>
                        )}
                        <input type="password" name="" placeholder="Re-type Password"
                               value={reEnteredPassword}
                               onChange={rePasswordChangeHandler}
                               onBlur={validateRePasswordHandler}/>

                    </div>
                    <div className="access-action">
                        <div>
                            <button className="submit-form-btn" onClick={changePassword} disabled={!formIsValid}>Update
                                Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}