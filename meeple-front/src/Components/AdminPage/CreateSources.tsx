import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreateSources() {
    let navigate = useNavigate()

    const url: any = process.env.REACT_APP_API_URL + 'source/' !== undefined ? process.env.REACT_APP_API_URL + 'source/' : '';
    const [enteredName, setEnteredName] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredImage, setEnteredImage] = useState('');
    const [enteredLink, setEnteredLink] = useState('');
    const [enteredProvider, setEnteredProvider] = useState('');

    const nameChangeHandler = (event: any) => {
        setEnteredName(event.target.value)
    }

    const descriptionChangeHandler = (event: any) => {
        setEnteredDescription(event.target.value)
    }

    const imageChangeHandler = (event: any) => {
        setEnteredImage(event.target.value)
    }

    const linkChangeHandler = (event: any) => {
        setEnteredLink(event.target.value)
    }
    const providerChangeHandler = (event: any) => {
        setEnteredProvider(event.target.value)
    }

    const addSourceHandler = (event: any) => {
        event.preventDefault();
        axios.post(url, {
            name: enteredName,
            description: enteredDescription,
            image: enteredImage,
            link: enteredLink,
            provider: enteredProvider
        }).then(response => {
            if (response.status === 200) {
                setEnteredName('')
                setEnteredDescription('')
                setEnteredImage('')
                setEnteredLink('')
                setEnteredProvider('')
                navigate('/admin-sources')
            }
        })
    }

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>New Source</span>
                </div>
                <div className="new-entry">
                    <div className="ne-form">
                        <form onSubmit={addSourceHandler} encType="multipart/form-data">
                            <div>
                                <span>Source name</span>
                                <div className="form-group">
                                    <input id="title" type="text" value={enteredName} onChange={nameChangeHandler}/>
                                </div>
                            </div>
                            <div>
                                <span>Image</span>
                                <div className="form-group">
                                    <div className="fg-file">
                                        <input type="file"/>
                                        <span>Browse image</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span>Content</span>
                                <div className="form-group">
                                    <textarea id="body" value={enteredDescription}
                                              onChange={descriptionChangeHandler}></textarea>
                                </div>
                            </div>
                            <div>
                                <span>Source link</span>
                                <div className="form-group">
                                    <input id="link" type="text" value={enteredLink} onChange={linkChangeHandler}/>
                                </div>
                            </div>
                            <div>
                                <span>Source provider</span>
                                <div className="form-group">
                                    <input id="provider" type="text" value={enteredProvider}
                                           onChange={providerChangeHandler}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn blue" type="submit">Add Source</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}