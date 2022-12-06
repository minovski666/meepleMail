import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function CreateBlogPage() {
    let navigate = useNavigate()

    const url: any = process.env.REACT_APP_API_URL + 'blog/' !== undefined ? process.env.REACT_APP_API_URL + 'blog/' : '';

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredBody, setEnteredBody] = useState('');
    const [enteredPublished, setEnteredPublished] = useState('true');
    const [image, setImage] = useState('');

    const titleChangeHandler = (event: any) => {
        setEnteredTitle(event.target.value)
    }

    const bodyChangeHandler = (event: any) => {
        setEnteredBody(event.target.value)
    }

    const publishedChangeHandler = (event: any) => {
        setEnteredPublished(event.target.value)
    }

    const imageHandler = (event: any) => {
        setImage(event.target.files[0])
    }

    const addPostHandler = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', enteredTitle);
        formData.append('description', enteredBody);
        formData.append('isPublished', enteredPublished);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url, formData, config).then(response => {
            if (response.status === 200) {
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
                    <span>New Blog Post</span>
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
                                        <input type="file" onChange={imageHandler}/>
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
                                    <select className="fg-select" name="published" id="published"
                                            value={enteredPublished} onChange={publishedChangeHandler}>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn blue" type="submit">Add Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}