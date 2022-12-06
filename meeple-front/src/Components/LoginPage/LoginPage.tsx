import React, {useState} from 'react'
// import githubImage from '../../assets/githubImage.png';
// import googleImage from '../../assets/googleImage.png';
// import twitterImage from '../../assets/twitterImage.png';
import axios, {AxiosResponse} from 'axios';
import {Link} from "react-router-dom";


export default function LoginPage() {
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [emailIsValid, setEmailIsValid] = useState<boolean>();
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [credentialsIsValid, setCredentialsIsValid] = useState<boolean>(true);
    const [error, setError] = useState('');
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    const emailChangeHandler = (event: any) => {
        setEnteredEmail(event.target.value);
        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length >= 6
        );
    };

    const passwordChangeHandler = (event: any) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length >= 6 && enteredEmail.includes('@')
        );
    };

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length >= 6);
    };

    const resendLink = () => {
        axios.post(url + "users/resend-link", {
            email: enteredEmail,
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {

        })
    }

    const login = () => {
        axios.post(url + "auth/sign-in", {
                email: enteredEmail,
                password: enteredPassword
            }, {
                withCredentials: true
            }
        ).then((res: AxiosResponse) => {
            if (res.data.message === "Success") {
                setCredentialsIsValid(true)
                window.location.href = "/home"
            } else if (res.data.message === 'User is deactivated') {
                setCredentialsIsValid(false)
                setError('User is deactivated.')
            } else {
                if (res.data.message === 'Please Verify your email address') {
                    setCredentialsIsValid(false)
                    setError('Please Verify your email address.')
                }
            }
        }, () => {
            setCredentialsIsValid(false)
            setError('Wrong email address and/or password. Please try again.')
        })
    }

    const handleKeypress = (event: any) => {
        //it triggers by pressing the enter key
        if (event.keyCode === 13) {
            login();
        }
    };

    const googleLogin = () => {
        window.open(url + "auth/google", "_self");
    }

    // const githubLogin = () => {
    //     window.open("http://localhost:4000/api//auth/github", "_self");
    // }
    //
    // const twitterLogin = () => {
    //     window.location.href = "http://localhost:4000/api/auth/twitter"
    // }

    return (
        <div className="access-wrapper">
            <div className="access">
                <h1>Log in</h1>
                <div>
                    {!credentialsIsValid && (
                        <div className="validation-message error">
                            <span><i className="fas fa-warning"></i></span>
                            <p><span>Oh-oh!</span><br/>{error}
                                {error === 'Please Verify your email address.' &&
                                    <a href={'#'}{...error === 'Please Verify your email address.'}
                                       onClick={resendLink}>Resend
                                        Link</a>
                                }
                            </p>
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
                    <div className="access-form-group">
                        {passwordIsValid === false && (
                            <span className="validation-tooltip error">Invalid password entry</span>
                        )}
                        <input type="password" name="" placeholder="Password"
                               value={enteredPassword}
                               onChange={passwordChangeHandler}
                               onBlur={validatePasswordHandler}
                               onKeyDown={handleKeypress}/>
                    </div>

                    <div className="access-action">

                        <div>
                            <button className="google-login" type="submit" onClick={googleLogin}></button>
                            <button className="submit-form-btn" type="submit" onClick={login}
                                    disabled={!formIsValid}>Log in
                            </button>
                        </div>
                        <Link className="forgot-password-link" to="/forgot-password">Forgot password?</Link>
                        <p>No account yet? <Link to="/register">Register here.</Link></p>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    )
}
