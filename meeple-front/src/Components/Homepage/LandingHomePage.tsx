import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer";
import meeple from "../../assets/images/meeple.png"
import hello from "../../assets/images/hello.svg"
import emailSvg from "../../assets/images/email.svg"
import info from "../../assets/images/info.svg"
import shelf from "../../assets/images/shelf.svg"
import axios from "axios";
import {myContext} from '../../Context';
import LetsConnectModal from "./LetsConnectModal";
import ThankYouModal from "./ThankYouModal";
import ReportBugModal from "./ReportBug";


export default function LandingHomePage() {

    const userObject = useContext(myContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenThankYouModal, setIsOpenThankYouModal] = useState(false);
    const [isOpenReportBugModal, setIsOpenReportBugModal] = useState(false);
    const history = useNavigate()
    const [prices, setPrices] = useState([]);
    const [sources, setSources] = useState([]);
    const [email, setEmail] = useState('')
    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';
    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const {data} = await axios.get(url + "payment/prices");
        setPrices(data);
    }

    const fetchSources = async () => {
        const {data} = await axios.get(url + "source/all");
        setSources(data);
    }
    const handleClick = async (e: any, price: any) => {
        e.preventDefault();
        if (userObject) {
            const {data} = await axios.post(url + "payment/create-subscription", {
                priceId: price.id,
            });
            window.open(data);
        } else {
            history('/register')
        }

    }

    const getEmail = (event: any) => {
        setEmail(event.target.value)
    }

    useEffect(() => {
        fetchSources()
    },[])

    const handleCreateAccount = () => {
        if (email !== '' && email.includes('@')) {
            axios.post(url + "landing-page", {
                email: email,
            }).then((response) => {
                if (response.status === 200) {
                    setEmail('')
                    setIsOpenThankYouModal(true)
                }
            });
            // history('/register', {state: email})
        }
    }

    return (
        <div>
            <div className="hero-section">
                <div>
                    <img src={meeple} alt=""/>
                    <div className="hs-info">
                        <span><img src={hello} alt="Welcome to meeplemail"/>Welcome to meeplemail</span>
                        <h1>Your personal daily<br/>board game digest</h1>
                        <p>All board game discussions, crowdfunding campaigns, your favorite creators served in a
                            daily email digest.</p>
                        {!userObject &&
                            <div className="request-access">
                                <div className="ra-form-group">
                                    <input type="text" value={email} onChange={getEmail} placeholder="Enter your email address"/>
                                    <button type="submit" onClick={handleCreateAccount}>Create an Account</button>
                                </div>
                            </div>
                        }
                        <span><img src={emailSvg} alt="Request access"/>Register for an early access and join +150 people that are already in.</span>
                    </div>
                </div>
            </div>
            {/*<div className="brief-info">
                <div>
                    {prices && prices.map((price: any) => (
                        <PriceCard key={price.id} price={price} handleSubscription={handleClick}/>
                    ))}

                </div>
            </div>*/}
            <div className="sources-showcase">
                <div>
                    <h2>Tame the info. Save the time.</h2>
                    <p>Pick your favorite sources. Create your own newsletter.<br/> Never miss anyting. All in one
                        place.</p>
                    <ul>
                        {sources && sources.map((source: any) => (
                            <li key={source.id}><img src={source.image} alt={source.name}/></li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="brief-info">
                <div>
                    <div className="brief-info-tile">
                        <div>
                            <img src={info} alt="Welcome to meeplemail"/>
                            <h3>Cherry-pick from the clutter</h3>
                            <p>Choose your sources. Receive your daily digest. Enjoy your favorite content without all
                                noise of the Internet.</p>
                        </div>
                    </div>
                    <div className="brief-info-tile">
                        <div>
                            <img src={info} alt="Welcome to meeplemail"/>
                            <h3>Stay productive and informed</h3>
                            <p>With all information around, staying focused and finding relevant info is difficult. We
                                got you covered!</p>
                        </div>
                    </div>
                    <div className="brief-info-tile">
                        <div>
                            <img src={shelf} alt="Welcome to meeplemail"/>
                            <h3>Organized and nice-looking</h3>
                            <p>Receive your daily digests directly in your email inbox or read them in your personal
                                dashboard on our site.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-creator-cta">
                <div>
                    <h3>Are you content creator?</h3>
                    <p>If you are active content creator and you want your content to be published through meeplemail -
                        contact us!</p>
                    <a onClick={() => setIsOpen(true)}>Let's Connect</a>
                </div>
            </div>
            {userObject && (
                <div className="report-bug">
                    <a onClick={() => setIsOpenReportBugModal(true)}><i className="fa-solid fa-bug"></i></a>
                </div>
            )}
            {isOpen && <LetsConnectModal setIsOpen={setIsOpen} close={() => setIsOpen(false)}/>}
            {isOpenReportBugModal &&  <ReportBugModal setIsOpenReportBugModal={setIsOpenReportBugModal} close={() => setIsOpenReportBugModal(false)}/>}

            {isOpenThankYouModal && <ThankYouModal setIsOpenThankYouModal={setIsOpenThankYouModal} close={() => setIsOpenThankYouModal(false)}/>}
            <Footer/>
        </div>
    );
}