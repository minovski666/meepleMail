import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function UpdateBlog() {
    let navigate = useNavigate()

    const params = useParams();

    const url: any = process.env.REACT_APP_API_URL + 'blog/'+params.id !== undefined ? process.env.REACT_APP_API_URL + 'blog/'+params.id : '';

    const [enteredTitle, setEnteredTitle] = useState('');

    const [enteredBody, setEnteredBody] = useState('');

    const [enteredPublished, setEnteredPublished] = useState('true');

    useEffect(() => {
        axios.get(url).then(response => {
            if (response.data){
                setEnteredTitle(response.data.title)
                setEnteredBody(response.data.description)
                setEnteredPublished(response.data.isPublished)
            }
        })
    }, []);

    const titleChangeHandler = (event: any) => {
        setEnteredTitle(event.target.value)
    }

    const bodyChangeHandler = (event: any) => {
        setEnteredBody(event.target.value)
    }

    const publishedChangeHandler = (event: any) => {
        setEnteredPublished(event.target.value)
    }

    const addPostHandler = (event: any) => {
        event.preventDefault();
        axios.put(url, {
            title: enteredTitle,
            description: enteredBody,
            isPublished: enteredPublished
        }).then(response => {
            if (response.status === 200){
                setEnteredTitle('')
                setEnteredBody('')
                setEnteredPublished('true')
                navigate('/admin-blogs')
            }
        })
    }

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>Edit Blog Post</span>
                </div>
                <div className="new-entry">
                    <div className="ne-form">
                        <form onSubmit={addPostHandler} encType="multipart/form-data">
                            <div>
                                <span>Post Title</span>
                                <div className="form-group">
                                    <input id="title" type="text" value={enteredTitle} onChange={titleChangeHandler}/>
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
                                <button className="btn blue" type="submit">Edit Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}