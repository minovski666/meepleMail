import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {

    const [validUrl, setValidUrl] = useState<boolean>(false);
    const param = useParams();
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    useEffect(() => {
        axios.get(url + `users/${param.id}/verify/${param.token}`).then((response) => {
            if (response.data.message === 'Email verified successfully') {
                setValidUrl(true);
            }
        })
    }, [param]);

    return (
        <div className="access-wrapper">
            <div className="access">
                <h1>Verify Email</h1>
                <div>
                    {validUrl ? (
                        <div className="access-form-group">
                            <span>Email verified successfully!</span>
                            <Link to={'/login'}> Login</Link>
                        </div>
                    ) : (
                        <div className="access-action">
                            <p>Invalid Link</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}