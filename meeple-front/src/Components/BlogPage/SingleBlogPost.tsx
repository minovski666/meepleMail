import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function SingleBlogPost(props: any) {

    const params = useParams();
    const [post, setPost] = useState([{id: -1, title: '', description: '', image: '', createdAt: ''}])
    const url: any = process.env.REACT_APP_API_URL+'blog/'+params.id !== undefined ? process.env.REACT_APP_API_URL+'blog/'+params.id : '';

    useEffect(() => {
        axios.get(url).then(response => {
            if (response.data){
                setPost([response.data])
            }
        })
    }, []);

    return (
        <div>
            <div className="blog-wrapper">
                <div>
                    {
                        post.map((item) => (
                            <div className="post" key={item.id}>
                                <span>Published on {new Date(item.createdAt).toLocaleString()}</span>
                                <h1>{item.title}</h1>
                                <img src={`http://localhost:4000/uploads/${item.image}`} alt=""/>
                                <div>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
}