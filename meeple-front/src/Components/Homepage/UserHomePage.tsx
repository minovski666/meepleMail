import React, {useContext, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Footer from "../Footer/Footer";
import {myContext} from "../../Context";
import AddSourceModal from "./AddSourceModal";
import axios from "axios";
import DeleteSourceModal from "./DeleteSourceModal";
import ReportBugModal from "./ReportBug";

export default function UserHomePage() {
        const userObject = useContext<any>(myContext);


    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [sourceId, setSourceId] = useState('');
    const [isOpenReportBugModal, setIsOpenReportBugModal] = useState(false);
    const [addedSources, setAddedSources] = useState([{
        id: -1,
        name: '',
        description: '',
        image: '',
        link: '',
        provider: '',
        numberOfPosts: 1,
        isActivate: false,
        feeds: []
    }])
    const [showNumberPosts, setShowNumberPosts] = useState(false)
    const [showNumberPostsId, setShowNumberPostsId] = useState(1)
    const [numberPosts, setNumberPosts] = useState(-1)
    const [saveNotification, setSaveNotification] = useState(false)
    const [scheduleNotification, setScheduleNotification] = useState(false)
    const [activateNotification, setActivateNotification] = useState(false)
    const [isActivated, setIsActivated] = useState(true)
    const [showSchedule, setShowSchedule] = useState(false)
    const [frequency, setFrequency] = useState('Daily')
    const [dayOfMonth, setDayOfMonth] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [time, setTime] = useState('12:00')


    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    useEffect(() => {
        getUserNewLetter()
        getUserUpdatedDetails()
    }, [])

    const getUserUpdatedDetails = () => {
        axios.get(url + 'users/current-user', {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    setIsActivated(response.data.isNewsLetterActive)
                    setFrequency(response.data.scheduledOn ? response.data.scheduledOn.frequency : frequency)
                    setDayOfWeek(response.data.scheduledOn ? response.data.scheduledOn.dayOfWeek : dayOfWeek)
                    setDayOfMonth(response.data.scheduledOn ? response.data.scheduledOn.dayOfMonth: dayOfMonth)
                    setTime(response.data.scheduledOn ? response.data.scheduledOn.time: time)
                }
            })
    }

    const getUserNewLetter = () => {
        axios.get(url + "users/news-letter", {withCredentials: true}).then(response => {
            if (response.data) {
                setAddedSources(response.data)
            }
        })
    }

    const transferSourceId = (sourceId: any) => {
        setSourceId(sourceId)
        setIsOpenDeleteModal(true)
    }

    const scheduleNewsletter = () => {
        axios.post(url + "users/news-letter/schedule", {
            scheduledOn: {
                frequency: frequency,
                dayOfMonth: dayOfMonth,
                dayOfWeek: dayOfWeek,
                time: time
            }
        }, {
            withCredentials: true
        }).then(response => {
            if (response.status === 200) {
                setScheduleNotification(true)
                setFrequency(response.data.scheduledOn.frequency)
                setDayOfWeek(response.data.scheduledOn.dayOfWeek)
                setDayOfMonth(response.data.scheduledOn.dayOfMonth)
                setTime(response.data.scheduledOn.time)
                setShowSchedule(!showSchedule)
                setTimeout(() => {
                    setScheduleNotification(false)
                }, 2000)
            }
        })
    }

    const activateNewsletter = () => {
        axios.post(url + 'users/news-letter/activate', {}, {withCredentials: true})
            .then((response) => {
                if (response.status === 200) {
                    setIsActivated(response.data.isNewsLetterActive)
                    setActivateNotification(true)

                    setTimeout(() => {
                        setActivateNotification(false)
                    }, 2000)
                }
            })
    }

    const getSource = (source: any) => {
        if(userObject.subscriptions.length !== 0){
            if (addedSources.length === 1 && addedSources[0].id === -1) {
                addedSources.filter((source) => source.id === -1);
                setAddedSources([source])
            } else {
                const isDuplicate = addedSources.some(function (el) {
                    return el.id === source.id;
                });
                if (!isDuplicate) {
                    setAddedSources(addedSources => [...addedSources, source]);
                }
            }
        }else{
            if (addedSources.length === 0 || addedSources[0].id === -1) {
                addedSources.filter((source) => source.id === -1);
                setAddedSources([source])
            }
        }
    };

    const deleteSource = (sourceId: any) => {
        const newSources = addedSources.filter((source) => source.id !== sourceId);
        setAddedSources(newSources)
        setSourceId('sourceId')
        setIsOpenDeleteModal(false)
    }

    const swap = (input: any, index_A: any, index_B: any) => {
        let temp = input[index_A];
        input[index_A] = input[index_B];
        input[index_B] = temp;
        return input
    }

    const moveDown = (keyOne: any) => {
        if (addedSources.length - 1 > keyOne) {
            const newOrder = swap(addedSources, keyOne, keyOne + 1)
            setAddedSources([])
            setTimeout(() => {
                setAddedSources(newOrder)
            }, 10)
        }
    }

    const moveUp = (keyOne: any) => {
        if (keyOne > 0) {
            const newOrder = swap(addedSources, keyOne, keyOne - 1)
            setAddedSources([])
            setTimeout(() => {
                setAddedSources(newOrder)
            }, 10)
        }
    }

    const handleShowNumberOfPost = (id: any) => {
        setShowNumberPostsId(id)
        setShowNumberPosts(true)
    }

    const getNumberOfPosts = (event: any) => {
        setNumberPosts(event.target.value);
    }

    const handleNumberOfPost = (newSource: any) => {
        addedSources.map(source => {
            if (source.id === newSource.id) {
                source['numberOfPosts'] = numberPosts !== -1 ? numberPosts : source.numberOfPosts
                setShowNumberPostsId(0)
                setShowNumberPosts(false)
                handleSaveBtn()
            }
        })
    }

    const handleSaveBtn = () => {

        const sources: any = []
        addedSources.map((source) => {
            sources.push({sourceId: source.id, numberOfPosts: source.numberOfPosts ? source.numberOfPosts : numberPosts})
        })
        axios.post(url + 'users/news-letter', {
            source: sources,
        }, {withCredentials: true}).then((response) => {
            getUserNewLetter()
            setShowSchedule(false)
            setSaveNotification(true)
            setTimeout(() => {
                setSaveNotification(false)
            }, 2000)
        })
        setNumberPosts(-1)
    }

    const handleActivateBtn = () => {
        activateNewsletter()
    }

    const handleScheduleBtn = () => {
        setShowSchedule(!showSchedule)
    }

    const getDayOfMonth = (event: any) => {
        setDayOfMonth(event.target.value)
    }

    const getDayOfWeek = (event: any) => {
        setDayOfWeek(event.target.value)
    }

    const getFrequency = (event: any) => {
        setFrequency(event.target.value)
    }

    const getTime = (event: any) => {
        setTime(event.target.value)
    }

    const closeAddSourceModal = () => {
        setIsOpen(false)
        handleSaveBtn()
    }

    return (
        <div>
            <div className="create-newsletter-wrapper">
                <div>
                    <h1>{(addedSources.length === 0) ? 'Create' : 'Edit'} your newsletter</h1>
                    <p>Personalize the newsletter by adding your favourite sources.</p>
                    <div className="create-newsletter">
                        {/* Source */}
                        {
                            addedSources.length > 0 && addedSources[0].id !== -1 && addedSources.map((source, key) => (
                                <div className="cn-source" key={source.id}>
                                    {/* source title */}
                                    <div className="cn-src-title">
                                        <div className="cn-src-logo">
                                            <img src={source.image ? source.image : ''} alt="Dice Tower"/>
                                        </div>
                                        <h2>{source.name}</h2>
                                        {showNumberPostsId !== source.id && <div className="actions">
                                            <ul>
                                                <li>
                                                    <a onClick={() => moveUp(key)}><i className="fa-solid fa-angle-up"></i></a>
                                                    <span className="src-actions-tooltip">Move Up</span>
                                                </li>
                                                <li>
                                                    <a onClick={() => moveDown(key)}><i
                                                        className="fa-solid fa-angle-down"></i></a>
                                                    <span className="src-actions-tooltip">Move Down</span>
                                                </li>
                                                <li>
                                                    <a onClick={() => transferSourceId(source.id)}><i
                                                        className="fa-solid fa-xmark"></i></a>
                                                    <span className="src-actions-tooltip">Delete</span>
                                                </li>
                                                <li>
                                                    <a onClick={() => handleShowNumberOfPost(source.id)}><i
                                                        className="fa-solid fa-ellipsis"></i></a>
                                                    <span className="src-actions-tooltip">More Options</span>
                                                </li>
                                            </ul>
                                        </div>
                                        }
                                        {showNumberPosts && showNumberPostsId === source.id &&
                                            <div id="edit-source" className="cn-edit-source">
                                                <div>
                                                    <div className="form-group">
                                                        <span>Number of posts</span>
                                                        <input
                                                            value={numberPosts !== -1 ? numberPosts : source.numberOfPosts}
                                                            onChange={getNumberOfPosts} type="number" min={0} />
                                                        <button type="submit" onClick={() => handleNumberOfPost(source)}><i
                                                            className="fa-solid fa-check"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {/* Souce content */}
                                    <div className="cn-src-content-wrapper">
                                        {/* Source content block
                                        <div>
                                            <div className="cn-src-content-header">
                                                <h3>{source.description}</h3>
                                                <div className="ch-published">
                                                    <span>Published on 14 January 2022</span>
                                                </div>
                                            </div>
                                            <div className="cn-src-content">
                                                <p>{source.description}</p>
                                            </div>
                                        </div>
                                        Source content block */}
                                        {source.feeds && source.feeds.map((feed: any) => (
                                            <a href={feed.link} target="_blank" key={feed.id}>
                                                <div>
                                                    <div className="cn-src-content-header">
                                                        <h3>{feed.title}.</h3>
                                                        <div className="ch-published">
                                                            <span>Published on {new Date(feed.pubDate).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="cn-src-content">
                                                        <p>{feed.contentSnippet}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        {(userObject.subscriptions.length > 0 || (userObject.subscriptions.length === 0 && addedSources.length === 0)) &&
                            <div className="cn-add-source">
                                <a className="cn-addsrc-btn" onClick={() => setIsOpen(true)}>+</a>
                            </div>
                        }
                        {userObject.subscriptions.length === 0 && addedSources.length === 1 &&
                                <Link to={'/profile'} className="cn-addsrc-btn">Subscribe now</Link>
                        }
                    </div>
                </div>

            </div>


            <div className="newsletter-control">
                <div>
                    <ul>
                        <li>
                            {showSchedule &&
                                <div className="schedule-options">
                                    <div>
                                        <span>Schedule</span>
                                        <div>
                                            {/* Frequency selector - Always visible*/}
                                            <div className="selector frequency">
                                                <select defaultValue={frequency ? frequency : ""}
                                                        onChange={getFrequency}>
                                                    <option value="Daily">Daily</option>
                                                    <option value="Weekly">Weekly</option>
                                                    <option value="Monthly">Monthly</option>
                                                </select>
                                            </div>


                                            {/* Day of the Month selector - Available only if monthly is selected */}
                                            {frequency === 'Monthly' &&
                                                <div className="selector day-month">
                                                    <span>on the </span>
                                                    <select defaultValue={dayOfMonth ? dayOfMonth : ""}
                                                            onChange={getDayOfMonth}>
                                                        <option value="1st">1st</option>
                                                        <option value="2nd">2nd</option>
                                                        <option value="3rd">3rd</option>
                                                        <option value="4th">4th</option>
                                                        <option value="5th">5th</option>
                                                        <option value="6th">6th</option>
                                                        <option value="7th">7th</option>
                                                        <option value="8th">8th</option>
                                                        <option value="9th">9th</option>
                                                        <option value="10th">10th</option>
                                                        <option value="11th">11th</option>
                                                        <option value="12th">12th</option>
                                                        <option value="13th">13th</option>
                                                        <option value="14th">14th</option>
                                                        <option value="15th">15th</option>
                                                        <option value="16th">16th</option>
                                                        <option value="17th">17th</option>
                                                        <option value="18th">18th</option>
                                                        <option value="19th">19th</option>
                                                        <option value="20th">20th</option>
                                                        <option value="21st">21st</option>
                                                        <option value="22nd">22nd</option>
                                                        <option value="23rd">23rd</option>
                                                        <option value="24th">24th</option>
                                                        <option value="25th">25th</option>
                                                        <option value="26th">26th</option>
                                                        <option value="27th">27th</option>
                                                        <option value="28th">28th</option>
                                                        <option value="29th">29th</option>
                                                        <option value="30th">30th</option>
                                                        <option value="31st">31st</option>
                                                    </select>
                                                    <span> day</span>
                                                </div>
                                            }

                                            {/* Day of the Week selector - Available only if monthly is selected */}
                                            {frequency === "Weekly" &&
                                                <div className="selector day-week">
                                                    <span className="width">on</span>
                                                    <select defaultValue={dayOfWeek ? dayOfWeek : ""}
                                                            onChange={getDayOfWeek}>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                        <option value="Sunday">Sunday</option>
                                                    </select>
                                                </div>
                                            }

                                            {/* Time Selector - Always visible */}
                                            <div className="selector time" onChange={getTime}>
                                                <span className="width">at</span>
                                                <select defaultValue={time ? time : "00:00"}>
                                                    <option value="00:00">12:00 am</option>
                                                    <option value="12:15">12:15 am</option>
                                                    <option value="12:30">12:30 am</option>
                                                    <option value="12:45">12:45 am</option>
                                                    <option value="1:00">1:00 am</option>
                                                    <option value="1:15">1:15 am</option>
                                                    <option value="1:30">1:30 am</option>
                                                    <option value="1:45">1:45 am</option>
                                                    <option value="2:00">2:00 am</option>
                                                    <option value="2:15">2:15 am</option>
                                                    <option value="2:30">2:30 am</option>
                                                    <option value="2:45">2:45 am</option>
                                                    <option value="3:00">3:00 am</option>
                                                    <option value="3:15">3:15 am</option>
                                                    <option value="3:30">3:30 am</option>
                                                    <option value="3:45">3:45 am</option>
                                                    <option value="4:00">4:00 am</option>
                                                    <option value="4:15">4:15 am</option>
                                                    <option value="4:30">4:30 am</option>
                                                    <option value="4:45">4:45 am</option>
                                                    <option value="5:00">5:00 am</option>
                                                    <option value="5:15">5:15 am</option>
                                                    <option value="5:30">5:30 am</option>
                                                    <option value="5:45">5:45 am</option>
                                                    <option value="6:00">6:00 am</option>
                                                    <option value="6:15">6:15 am</option>
                                                    <option value="6:30">6:30 am</option>
                                                    <option value="6:45">6:45 am</option>
                                                    <option value="7:00">7:00 am</option>
                                                    <option value="7:15">7:15 am</option>
                                                    <option value="7:30">7:30 am</option>
                                                    <option value="7:45">7:45 am</option>
                                                    <option value="8:00">8:00 am</option>
                                                    <option value="8:15">8:15 am</option>
                                                    <option value="8:30">8:30 am</option>
                                                    <option value="8:45">8:45 am</option>
                                                    <option value="9:00">9:00 am</option>
                                                    <option value="9:15">9:15 am</option>
                                                    <option value="9:30">9:30 am</option>
                                                    <option value="9:45">9:45 am</option>
                                                    <option value="10:00">10:00 am</option>
                                                    <option value="10:15">10:15 am</option>
                                                    <option value="10:30">10:30 am</option>
                                                    <option value="10:45">10:45 am</option>
                                                    <option value="11:00">11:00 am</option>
                                                    <option value="11:15">11:15 am</option>
                                                    <option value="11:30">11:30 am</option>
                                                    <option value="11:45">11:45 am</option>
                                                    <option value="12:00">12:00 pm</option>
                                                    <option value="12:15">12:15 pm</option>
                                                    <option value="12:30">12:30 pm</option>
                                                    <option value="12:45">12:45 pm</option>
                                                    <option value="13:00">1:00 pm</option>
                                                    <option value="13:15">1:15 pm</option>
                                                    <option value="13:30">1:30 pm</option>
                                                    <option value="13:45">1:45 pm</option>
                                                    <option value="14:00">2:00 pm</option>
                                                    <option value="14:15">2:15 pm</option>
                                                    <option value="14:30">2:30 pm</option>
                                                    <option value="14:45">2:45 pm</option>
                                                    <option value="15:00">3:00 pm</option>
                                                    <option value="15:15">3:15 pm</option>
                                                    <option value="15:30">3:30 pm</option>
                                                    <option value="15:45">3:45 pm</option>
                                                    <option value="16:00">4:00 pm</option>
                                                    <option value="16:15">4:15 pm</option>
                                                    <option value="16:30">4:30 pm</option>
                                                    <option value="16:45">4:45 pm</option>
                                                    <option value="17:00">5:00 pm</option>
                                                    <option value="17:15">5:15 pm</option>
                                                    <option value="17:30">5:30 pm</option>
                                                    <option value="17:45">5:45 pm</option>
                                                    <option value="18:00">6:00 pm</option>
                                                    <option value="18:15">6:15 pm</option>
                                                    <option value="18:30">6:30 pm</option>
                                                    <option value="18:45">6:45 pm</option>
                                                    <option value="19:00">7:00 pm</option>
                                                    <option value="19:15">7:15 pm</option>
                                                    <option value="19:30">7:30 pm</option>
                                                    <option value="19:45">7:45 pm</option>
                                                    <option value="20:00">8:00 pm</option>
                                                    <option value="20:15">8:15 pm</option>
                                                    <option value="20:30">8:30 pm</option>
                                                    <option value="20:45">8:45 pm</option>
                                                    <option value="21:00">9:00 pm</option>
                                                    <option value="21:15">9:15 pm</option>
                                                    <option value="21:30">9:30 pm</option>
                                                    <option value="21:45">9:45 pm</option>
                                                    <option value="22:00">10:00 pm</option>
                                                    <option value="22:15">10:15 pm</option>
                                                    <option value="22:30">10:30 pm</option>
                                                    <option value="22:45">10:45 pm</option>
                                                    <option value="23:00">11:00 pm</option>
                                                    <option value="23:15">11:15 pm</option>
                                                    <option value="23:30">11:30 pm</option>
                                                    <option value="23:45">11:45 pm</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button className="set-schedule-btn" onClick={scheduleNewsletter}><i
                                            className="fas fa-check"></i></button>
                                    </div>
                                </div>
                            }
                            <button className="schedule" onClick={handleScheduleBtn}><i
                                className="far fa-calendar"></i> Schedule
                            </button>
                        </li>
                        <li>
                            <button className="save" onClick={handleSaveBtn}><i className="far fa-save"></i> Save
                            </button>
                        </li>
                        <li>
                            <button
                                className={'activate'}
                                onClick={handleActivateBtn}>
                                <i className={`${isActivated ? 'far fa-times-circle' : 'fas fa-check'}`}></i>{isActivated ? 'Deactivate' : 'Activate'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="notification-messages">
                {/* Message starts*/}
                {scheduleNotification &&
                    <div>
                        <div className="notification-message scheduled">
                            <span><i className="far fa-calendar"></i></span>
                            <p><span>Scheduled!</span><br/>The newsletter has been scheduled.</p>
                        </div>
                    </div>
                }
                {/* Message ends */}
                {/* Message starts*/}
                {activateNotification &&
                    <div>
                        <div className="notification-message activated">
                            <span><i className="fas fa-check"></i></span>
                            <p><span>{isActivated ? 'Activated!' : 'Deactivated!'}</span><br/>The newsletter has
                                been {isActivated ? 'activated' : 'deactivated'}.</p>
                        </div>
                    </div>
                }
                {/* Message ends */}
                {/* Message starts*/}
                {saveNotification &&
                    <div>
                        <div className="notification-message saved">
                            <span><i className="far fa-save"></i></span>
                            <p><span>Saved!</span><br/>The newsletter has been saved.</p>
                        </div>
                    </div>
                }
                {/* Message ends */}
            </div>


            {isOpen && <AddSourceModal setIsOpen={setIsOpen} close={closeAddSourceModal} getSource={getSource}
                                       addedSources={addedSources}/>}
            {isOpenDeleteModal &&
                <DeleteSourceModal setIsOpenDeleteModal={setIsOpenDeleteModal} close={() => setIsOpenDeleteModal(false)}
                                   confirm={() => deleteSource(sourceId)} sourceId={sourceId}/>}
            <div className="report-bug">
                <a onClick={() => setIsOpenReportBugModal(true)}><i className="fa-solid fa-bug"></i></a>
            </div>
            {isOpenReportBugModal &&  <ReportBugModal setIsOpenReportBugModal={setIsOpenReportBugModal} close={() => setIsOpenReportBugModal(false)}/>}

        </div>
    );
}