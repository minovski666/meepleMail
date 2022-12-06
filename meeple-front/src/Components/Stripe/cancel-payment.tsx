import React, {useContext, useEffect} from 'react';
import {WarningTwoTone} from '@ant-design/icons';
import sad from "../../assets/sad.png"
import {IUser} from "../../types/maintypes";
import {myContext} from "../../Context";
import {useNavigate} from "react-router-dom";


const StripeCancel = () => {
    const userObject = useContext(myContext) as IUser;
    let history = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            history('/profile')
        }, 3000)
    }, [])

    return (
        <div className="post-stripe-wrapper">
            <div>
                <img src={sad} alt=""/>
                <h1>We're sorry to see you go, {userObject.firstName}!</h1>
                <p>Your subscription to meeplemail was canceled!</p>
                <span>You will be redirected automatically. If the page doesn't reload, please click <a
                    href="src/Components/Stripe/cancel-payment">here</a>.</span>

                <p><i className="fa-solid fa-spinner fa-spin"></i></p>
            </div>
        </div>
    )
}
export default StripeCancel;