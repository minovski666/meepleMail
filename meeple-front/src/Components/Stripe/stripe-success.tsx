import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {SyncOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {myContext} from '../../Context';
import {IUser} from "../../types/maintypes";
import happy from "../../assets/happy.png"

const StripeSuccess = () => {
    const userObject = useContext(myContext) as IUser;
    let history = useNavigate()
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    const getSubscriptionStatus = async () => {
        const {data} = await axios.get(url + "payment/subscription-status",
            {
                withCredentials: true
            });

        if (data && data.length === 0) {
            history('/')
        } else {

            //update user in local storage
            //update use in context
            setTimeout(() => {
                history('/profile')
            }, 3000)
        }
    }

    useEffect(() => {
        getSubscriptionStatus()
    }, [])

    return (
        <div className="post-stripe-wrapper">
            <div>
                <img src={happy} alt=""/>
                <h1>Congrats, {userObject.firstName}!</h1>
                <p>Your subscription to meeplemail was successful!</p>
                <span>You will be redirected automatically. If the page doesn't reload, please click <a
                    href="src/Components/Stripe/stripe-success">here</a>.</span>

                <p><i className="fa-solid fa-spinner fa-spin"></i></p>
            </div>
        </div>
    )
}
export default StripeSuccess;