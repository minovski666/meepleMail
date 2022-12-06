import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios, {AxiosResponse} from "axios";

export default function ForgotPasswordPage() {
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [emailIsValid, setEmailIsValid] = useState<boolean>();
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [credentialsIsValid, setCredentialsIsValid] = useState<boolean>(true);
    const [requestSent, setRequestSent] = useState(false)
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    const emailChangeHandler = (event: any) => {
        setEnteredEmail(event.target.value);
        setFormIsValid(
            event.target.value.includes('@')
        );
    };


    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };


    const requestChangePassword = () => {
        axios.post(url + "auth/request-reset-password", {
            email: enteredEmail,
        }, {
            withCredentials: true
        }).then((res) => {
            if (res.data) {
                setCredentialsIsValid(true)
                setRequestSent(true)
                setTimeout(() => {
                    window.location.href = "/login"
                }, 1000)
            }
        }, () => {
            setCredentialsIsValid(false)
            setTimeout(() => {
                setRequestSent(false)
            }, 1000)
        })
    }

    const handleKeypress = (event: any) => {
        //it triggers by pressing the enter key
        if (event.keyCode === 13) {
            requestChangePassword();
        }
    };

    return (
        <div className="access-wrapper">
            <div className="access">
                <h1>Reset your password</h1>
                <p>In order to reset your password, please insert your account's email address below. The instructions will be sent shortly to your email address.</p>
                <div>
                    {!credentialsIsValid && (
                        <div className="validation-message error">
                            <span><i className="fas fa-warning"></i></span>
                            <p><span>Oh-oh!</span><br/>There is no account registered with the email address you have entered.</p>
                        </div>
                    )}
                    <div className="access-form-group">
                        {emailIsValid === false && (
                            <span className="validation-tooltip error">Invalid email address</span>
                        )}
                        <input type="email" name="" placeholder="Email address"
                               value={enteredEmail}
                               onChange={emailChangeHandler}
                               onBlur={validateEmailHandler}
                               onKeyDown={handleKeypress}/>
                    </div>

                    <div className="access-action">
                        {requestSent && (<span>Request sent!</span>)}
                        <div>
                            <button className="submit-form-btn" type="submit" onClick={requestChangePassword} disabled={!formIsValid}>Request
                            </button>
                        </div>
                        <p><Link to="/login">Go back to login page</Link></p>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}