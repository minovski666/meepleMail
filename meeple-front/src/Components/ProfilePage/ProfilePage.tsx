import React, {useContext, useEffect, useState} from 'react'
import {myContext} from '../../Context';
import axios, {AxiosResponse} from "axios";
import moment from "moment";
import bob from "../../assets/images/bob.jpg"
import {Link} from "react-router-dom";
import ReportBugModal from "../Homepage/ReportBug";
import DeleteSourceModal from "../Homepage/DeleteSourceModal";
import DeleteUserModal from "./DeleteUserModal";
import deleteUserModal from "./DeleteUserModal";


export default function Profile() {
    const [userObject, setUserObject] = useState<any>(useContext(myContext))
    const [subscriptions, setSubscriptions] = useState<any>([]);
    const [prices, setPrices] = useState([]);
    const [showPlans, setShowPlans] = useState('');
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredOldPassword, setEnteredOldPassword] = useState('');
    const [enteredNewPassword, setEnteredNewPassword] = useState('');
    const [enteredRePassword, setEnteredRePassword] = useState('');
    const [invalidPassword, setInvalidPassword] = useState<boolean>()
    const [matchPassword, setMatchPassword] = useState<boolean>()
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [image, setImage] = useState('');
    const [isOpenReportBugModal, setIsOpenReportBugModal] = useState(false);

    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';


    const updateCurrentUser = () => {
        axios.get(url + "users/current-user",
            {withCredentials: true})
            .then((res: AxiosResponse) => {
                if (res.data) {
                    setUserObject(res.data);
                }
            })
    }

    const firstNameChangeHandler = (event: any) => {
        setEnteredFirstName(event.target.value)
    }

    const lastNameChangeHandler = (event: any) => {
        setEnteredLastName(event.target.value)
    }

    const oldPasswordChangeHandler = (event: any) => {
        setEnteredOldPassword(event.target.value)
    }

    const newPasswordChangeHandler = (event: any) => {
        setEnteredNewPassword(event.target.value)
    }

    const rePasswordChangeHandler = (event: any) => {
        setEnteredRePassword(event.target.value)
    }

    const addHandlerFirstLastName = (event: any) => {
        event.preventDefault();
        axios.put(url + 'users/details/' + userObject.id, {
            firstName: enteredFirstName ? enteredFirstName : userObject.firstName,
            lastName: enteredLastName ? enteredLastName : userObject.lastName,
        }).then(response => {
            if (response.status === 200) {
                updateCurrentUser()
                setEnteredFirstName('')
                setEnteredLastName('')
            }
        })
    }

    const addChangeHandlerOldPassword = (event: any) => {
        event.preventDefault();
        axios.put(url + "users/check-password/" + userObject.id, {
            password: enteredOldPassword,
        }).then(response => {
            if (response.data.data === true) {
                setInvalidPassword(true)
            } else {
                setInvalidPassword(false)
            }
        })
    }

    const addChangeHandlerNewPassword = (event: any) => {
        event.preventDefault();
        if (enteredNewPassword === enteredRePassword) {
            setMatchPassword(true)
            axios.put(url + "users/password/" + userObject.id, {
                password: enteredNewPassword,
            }).then(response => {
                if (response.status === 200) {
                    setEnteredNewPassword('')
                    setEnteredRePassword('')
                }
            })
        } else {
            setMatchPassword(false)
        }
    }

    const handleDeleteUser = () => {
        axios.post(url + 'users/delete-user/' + userObject.id, {}, {withCredentials: true}).then((response) => {
            window.location.href = '/'
        })
    }

    const imageChangeHandler = (event: any) => {
        const formData = new FormData();
        formData.append('photo', event.target.files[0]);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.put(url + "users/photo/" + userObject.id, formData, config)
            .then((response) => {
                if (response.data.success) {
                    setImage('')
                    updateCurrentUser()
                }
            })
    }

    useEffect(() => {
        updateCurrentUser()
    }, [])

    useEffect(() => {

        const getSubscriptions = async () => {
            const {data} = await axios.get(url + 'payment/subscriptions',
                {
                    withCredentials: true
                })
            setSubscriptions(data.data);
        }
        if (userObject) {
            setSubscriptions(userObject.subscriptions);

            if (userObject.subscriptions.length > 0) {
                setShowPlans('false')
            }
            if (userObject.subscriptions.length < 1) {
                setShowPlans('true')
            }
        }

        fetchPrices();
    }, [userObject])

    const manageSubscriptions = async () => {
        const {data} = await axios.get(url + 'payment/customer-portal',
            {
                withCredentials: true
            })
        window.open(data);
    }

    const fetchPrices = async () => {
        const {data} = await axios.get(url + 'payment/prices');
        setPrices(data);
    }

    const handleClick = async (e: any, price: any) => {
        e.preventDefault();
        if (userObject) {
            const {data} = await axios.post(url + 'payment/create-subscription', {
                priceId: price.id,
            }, {
                withCredentials: true
            });
            window.open(data);
        }
    }

    const showPlansClick = () => {
        setShowPlans('true')
    }

    const deleteUser = () => {
        handleDeleteUser()
        setIsOpenDeleteModal(false)
    }

    return (
        <div>
            <div className="settings-wrapper">
                <div>
                    <h1>Settings</h1>
                    <span>Change your account settings bellow</span>
                    <div className="main-content">
                        <div className="settings-header">
                            <div className="sh-user-cont">
                                <div className="sh-uc-userimage">
                                    <form className="settings-image-form" method="POST" action=""
                                          encType="multipart/form-data">
                                        <input type="file" name="" onChange={imageChangeHandler}/>
                                        <button type="submit" className="update" id="settingsImage"
                                                name="settingsImage">Update
                                        </button>
                                    </form>
                                    {/*https://meeplemail.com/api/uploads/*/}
                                    {/*<img src={userObject.profilePicture ? 'http://localhost:4000/uploads/'+userObject.profilePicture : bob} alt=""/>*/}
                                    <img src={userObject.profilePicture ? userObject.profilePicture : bob} alt=""/>
                                </div>
                                <span>{userObject.firstName}</span>
                                <span>{userObject.lastName}</span>
                            </div>
                        </div>

                        {/* <!-- Personal Tab -->*/}
                        <div className="settings-tabs">
                            <input className="tab-checkbox personal" type="radio" name="tabs" defaultChecked={true}
                                   id="personal"/>
                            <label htmlFor="personal">Personal</label>
                            <div className="tab">
                                <div className="tab-lside">
                                    <div className="settings-form">
                                        <form onSubmit={addHandlerFirstLastName}>
                                            <div className="settings-form-group">
                                                <p>First Name</p>
                                                <input type="text" placeholder="" value={enteredFirstName}
                                                       onChange={firstNameChangeHandler}/>
                                            </div>
                                            <div className="settings-form-group">
                                                <p>Last Name</p>
                                                <input type="text" placeholder="" value={enteredLastName}
                                                       onChange={lastNameChangeHandler}/>
                                            </div>
                                            <div className="settings-form-group settings-last-group">
                                                <button type="submit" className="update" name="">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Security Tab -->*/}
                            <input className="tab-checkbox security" type="radio" name="tabs" id="security"/>
                            <label htmlFor="security">Security</label>
                            <div className="tab">
                                <div className="tab-lside">
                                    <div className="settings-form">
                                        <form onSubmit={addChangeHandlerNewPassword} className="password_change">
                                            <div className="settings-form-group">
                                                <p>Email Address</p>
                                                <input type="text" name="" value={userObject.email} disabled/>
                                                {/* <!-- SWAP EMAIL WITH AN ACTUAL EMAIL VARIABLE -->*/}
                                            </div>
                                            {userObject.provider === 'Local' &&
                                                <div className="settings-form-group">
                                                    <p>Old Password</p>
                                                    {invalidPassword === false && (
                                                        <span className="validation-tooltip error">Wrong password</span>
                                                    )}
                                                    <input type="password" placeholder="" value={enteredOldPassword}
                                                           onChange={oldPasswordChangeHandler}
                                                           onKeyUp={addChangeHandlerOldPassword}/>
                                                </div>
                                            }
                                            {userObject.provider === 'Local' &&
                                                <div className="settings-form-group">
                                                    <p>New Password</p>
                                                    <input type="password" placeholder="" value={enteredNewPassword}
                                                           onChange={newPasswordChangeHandler}
                                                           disabled={!invalidPassword}/>
                                                </div>
                                            }
                                            {userObject.provider === 'Local' &&
                                                <div className="settings-form-group">
                                                    {matchPassword === false && (
                                                        <span
                                                            className="validation-tooltip error">Password did not match!</span>
                                                    )}
                                                    <p>Re-Type New Password</p>
                                                    <input type="password" placeholder="" value={enteredRePassword}
                                                           onChange={rePasswordChangeHandler}
                                                           disabled={!invalidPassword}/>
                                                </div>
                                            }
                                            {userObject.provider === 'Local' &&
                                                <div className="settings-form-group settings-last-group">
                                                    <button type="submit" className="update" name="">Update</button>
                                                </div>
                                            }
                                            {userObject.provider === 'google' &&
                                                <span>This account was registered through Google</span>
                                            }
                                        </form>
                                    </div>
                                </div>
                                <div className="tab-rside">
                                    <div className="settings-account-delete">
                                        <span>Account Deletion</span>
                                        <p>Permanently delete your account and related account data?</p>
                                        <a className="delete-account" onClick={() => setIsOpenDeleteModal(true)}>Delete
                                            Account</a>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Billing Tab -->*/}
                            <input className="tab-checkbox security" type="radio" name="tabs" id="billing"/>
                            <label htmlFor="billing">Billing</label>
                            <div className="tab">
                                <div className="tab-lside">
                                    {subscriptions && subscriptions.map((sub: any) => (
                                        <div className="active-subscription" key={sub.id}>
                                            <h2>Active Subscription</h2>
                                            <p>{(sub.plan.amount / 100).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: sub.plan.currency,
                                            })}</p>
                                            <span>{sub.plan.nickname} Subscription</span>
                                            <div>
                                                <span>Subscription started on:</span>
                                                <p>{moment(sub.current_period_start * 1000)
                                                    .format('MMMM Do YYYY')
                                                    .toString()}</p>
                                                <span>Subscription renews on:</span>
                                                <p>{moment(sub.current_period_end * 1000)
                                                    .format('MMMM Do YYYY')
                                                    .toString()}</p>
                                            </div>
                                            {/*<a onClick={showPlansClick}>Change the plan</a>*/}
                                            <a onClick={manageSubscriptions}>Manage subscription</a>
                                            {/*<Link to="/stripe/cancel">Cancel the subscription</Link>*/}
                                        </div>
                                    ))}
                                    {subscriptions.length < 1 && (
                                        <div className="active-subscription">
                                            <h2>No Active Subscription</h2>
                                        </div>
                                    )}
                                </div>
                                {showPlans === 'true' && (
                                    <div className="tab-rside">
                                        <div className="pick-plan">
                                            <h2>Pick a Plan</h2>
                                            <div className="plan-tabs">
                                                <input className="" defaultChecked={true} type="radio" name="plan-tabs"
                                                       id="annualy"/>
                                                <label htmlFor="annualy">Annual</label>
                                                <div className="tab">
                                                    <span className="discount">$5̶9̶.8̶8̶</span>
                                                    <h3 className="discounted">$49.99</h3>
                                                    <span>Billed yearly</span>
                                                    <ul>
                                                        <li><span className="free-months"><i
                                                            className="icon-star"></i> Two months for free. Every year.</span>
                                                        </li>
                                                        <li><span><i
                                                            className="icon-tag"></i> You will decide the sources</span>
                                                        </li>
                                                        <li><span><i className="icon-calendar"></i> Organize the newsletter at your liking</span>
                                                        </li>
                                                        <li><span><i className="icon-mail"></i> Your favorite content in one place</span>
                                                        </li>
                                                        <li><span><i className="icon-heart"></i> Support a small indie team of three</span>
                                                        </li>
                                                    </ul>
                                                    {prices && prices.map((price: any) => (
                                                        <a key={price.id}
                                                           className={subscriptions.length >= 1 && price.id === subscriptions[0].plan.id ? "disabled" : ""}
                                                           onClick={(e) => handleClick(e, price)}>{subscriptions.length >= 1 && price.id === subscriptions[0].plan.id ? "Current Plan" : "Subscribe now"}</a>
                                                    ))[1]}
                                                </div>
                                                <input className="" type="radio" name="plan-tabs" id="monthly"/>
                                                <label htmlFor="monthly">Monthly</label>
                                                <div className="tab">
                                                    <h3>$4.99</h3>
                                                    <span>Billed every month</span>
                                                    <ul>
                                                        <li><span><i
                                                            className="icon-tag"></i> You will decide the sources</span>
                                                        </li>
                                                        <li><span><i className="icon-calendar"></i> Organize the newsletter at your liking</span>
                                                        </li>
                                                        <li><span><i className="icon-mail"></i> Your favorite content in one place</span>
                                                        </li>
                                                        <li><span><i className="icon-heart"></i> Support a small indie team of three</span>
                                                        </li>
                                                    </ul>
                                                    {prices && prices.map((price: any) => (
                                                        <a key={price.id}
                                                           className={subscriptions.length >= 1 && price.id === subscriptions[0].plan.id ? "disabled" : ""}
                                                           onClick={(e) => handleClick(e, price)}>{subscriptions.length >= 1 && price.id === subscriptions[0].plan.id ? "Current Plan" : "Subscribe now"}</a>
                                                    ))[0]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report-bug">
                    <a onClick={() => setIsOpenReportBugModal(true)}><i className="fa-solid fa-bug"></i></a>
                </div>
                {isOpenReportBugModal && <ReportBugModal setIsOpenReportBugModal={setIsOpenReportBugModal}
                                                         close={() => setIsOpenReportBugModal(false)}/>}
            </div>
            {isOpenDeleteModal &&
                <DeleteUserModal setIsOpenDeleteModal={setIsOpenDeleteModal}
                                 close={() => setIsOpenDeleteModal(false)}
                                 confirm={() => deleteUser()}/>}
        </div>
    )
}