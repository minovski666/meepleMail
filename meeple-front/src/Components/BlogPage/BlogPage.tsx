import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import blogImage from '../../assets/images/blog-image.png';
import {Link} from "react-router-dom";
import axios from "axios";
import Navigation from "../Custom/Navigation";

export default function BlogPage() {

    const [posts, setPosts] = useState([{id: -1, title: '', description: '', image: '', isPublished: '', createdAt: ''}])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    useEffect(() => {
        const url: any = process.env.REACT_APP_API_URL+'blog/published' !== undefined ? process.env.REACT_APP_API_URL+'blog/published' : '';

        axios.get(url).then(response => {
            if (response.data){
                setPosts(response.data)
            }
        })

    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(posts.length / recordsPerPage)

    return (
        <div>
            <div className="blog-wrapper">
                <div>
                    <h1>Blog</h1>
                    <p>Check out the most recent blog posts</p>
                    <div className="blog-posts">
                        <div>
                            {
                                currentRecords.map((post) => (
                                    <div className="blog-post" key={post.id}>
                                        <img src={`http://localhost:4000/uploads/${post.image}`} alt=""/>
                                        <h2>{post.title}</h2>
                                        <span>Published {new Date(post.createdAt).toLocaleString()}</span>
                                        <p>{post.description}</p>
                                        <Link to={`/post/${post.id}`}>Read the Article</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Navigation nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <Footer/>
        </div>
    );
}