import React, {useEffect, useState} from 'react'
import axios, {AxiosResponse} from 'axios';
import {Link, useLocation} from 'react-router-dom';

export default function Register() {
    const location = useLocation()
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [emailIsValid, setEmailIsValid] = useState<boolean>();
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
    const [enteredFirstName, setEnteredFirstName] = useState<string>('');
    const [firstNameIsValid, setFirstNameIsValid] = useState<boolean>();
    const [enteredLastName, setEnteredLastName] = useState<string>('');
    const [lastNameIsValid, setLastNameIsValid] = useState<boolean>();
    const [formIsValid, setFormIsValid] = useState<boolean>(false);
    const [emailFromLanding, setEmailFromLanding] = useState<any>(location.state)
    const [msg, setMsg] = useState('')
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    useEffect(() => {
        if (location.state) {
            setEmailFromLanding(location.state)
            setEnteredEmail(emailFromLanding)
        }
    })

    const googleLogin = () => {
        window.open(url + "auth/google", "_self");
    }

    const firstNameChangeHandler = (event: any) => {
        setEnteredFirstName(event.target.value);
        setFormIsValid(
            event.target.value.trim().length >= 2 && enteredEmail.includes('@') && enteredPassword.trim().length >= 6 && enteredLastName.trim().length >= 2
        );
    };
    const lastNameChangeHandler = (event: any) => {
        setEnteredLastName(event.target.value);
        setFormIsValid(
            event.target.value.trim().length >= 2 && enteredEmail.includes('@') && enteredPassword.trim().length >= 6 && enteredFirstName.trim().length >= 2
        );
    };
    const emailChangeHandler = (event: any) => {
        setEnteredEmail(event.target.value);
        setFormIsValid(
            event.target.value.includes('@') && enteredFirstName.trim().length >= 2 && enteredPassword.trim().length >= 6 && enteredLastName.trim().length >= 2
        );
    };
    const passwordChangeHandler = (event: any) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length >= 6 && enteredFirstName.trim().length >= 2 && enteredEmail.includes('@') && enteredLastName.trim().length >= 2
        );
    };


    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    };
    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length >= 6);
    };
    const validateFirstNameHandler = () => {
        setFirstNameIsValid(enteredFirstName.trim().length >= 2);
    };
    const validateLastNameHandler = () => {
        setLastNameIsValid(enteredLastName.trim().length >= 2);
    };

    const register = () => {
        axios.post(url + "auth/sign-up", {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            password: enteredPassword
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === true) {
                setMsg("Success! Confirmation email has been sent. You will receive activation link in your provided email address.")
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2500)
            }
        })
    }

    const handleKeypress = (event: any) => {
        //it triggers by pressing the enter key
        if (event.keyCode === 13) {
            register();
        }
    };

    return (
        <div className="access-wrapper">
            <div className="access">
                <h1>Register</h1>
                <div>
                    <div className="access-form-group">
                        {msg !== '' && <span className=''>{msg}</span>}
                        {firstNameIsValid === false && (
                            <span className="validation-tooltip error">Invalid first name entry</span>
                        )}
                        <input type="text" name="" placeholder="First Name"
                               value={enteredFirstName}
                               onChange={firstNameChangeHandler}
                               onBlur={validateFirstNameHandler}
                               onKeyDown={handleKeypress}/>
                    </div>
                    <div className="access-form-group">
                        {lastNameIsValid === false && (
                            <span className="validation-tooltip error">Invalid last name entry</span>
                        )}
                        <input type="text" name="" placeholder="Last Name"
                               value={enteredLastName}
                               onChange={lastNameChangeHandler}
                               onBlur={validateLastNameHandler}
                               onKeyDown={handleKeypress}/>
                    </div>
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
                            <button className="submit-form-btn" onClick={register} disabled={!formIsValid}>Register
                            </button>
                        </div>
                        <p>Have an account? <Link to="/login">Log in.</Link></p>

                    </div>
                </div>
            </div>
        </div>
    )
}