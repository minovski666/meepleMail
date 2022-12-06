import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreateChangeLogPage() {
    let navigate = useNavigate()

    const url: any = process.env.REACT_APP_API_URL + 'change-log/' !== undefined ? process.env.REACT_APP_API_URL + 'change-log/' : '';

    const [enteredTitle, setEnteredTitle] = useState('');

    const [enteredBody, setEnteredBody] = useState('');

    const [enteredPublished, setEnteredPublished] = useState('true');

    const titleChangeHandler = (event: any) => {
        setEnteredTitle(event.target.value)
    }

    const bodyChangeHandler = (event: any) => {
        setEnteredBody(event.target.value)
    }

    const publishedChangeHandler = (event: any) => {
        setEnteredPublished(event.target.value)
    }

    const addChangeLogHandler = (event: any) => {
        event.preventDefault();
        axios.post(url, {
            title: enteredTitle,
            description: enteredBody,
            isPublished: enteredPublished
        }).then(response => {
            if (response.status === 200){
                setEnteredTitle('')
                setEnteredBody('')
                setEnteredPublished('true')
                navigate('/admin-change-logs')
            }
        })
    }

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">
                <div className="header-admin">
                    <span>New Change Log</span>
                </div>
                <div className="new-entry">
                    <div className="ne-form">
                        <form onSubmit={addChangeLogHandler}>
                            <div>
                                <span>New Log Title</span>
                                <div className="form-group">
                                    <input id="title" type="text" value={enteredTitle} onChange={titleChangeHandler}/>
                                </div>
                            </div>
                            <div>
                                <span>Content</span>
                                <div className="form-group">
                                    <textarea id="body" value={enteredBody} onChange={bodyChangeHandler}></textarea>
                                </div>
                            </div>
                            <div>
                                <span>Published</span>
                                <div className="form-group">
                                    <select className="fg-select" name="published" id="published" value={enteredPublished} onChange={publishedChangeHandler}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn blue" type="submit">Add Change Log</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}