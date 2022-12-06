import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {Link} from "react-router-dom";
import Navigation from "../Custom/Navigation";

export default function AdminPageBlogs() {
    const [posts, setPosts] = useState([{
        id: -1,
        title: '',
        description: '',
        image: '',
        isPublished: '',
        createdAt: '',
    }])
    const url: any = process.env.REACT_APP_API_URL + 'blog/' !== undefined ? process.env.REACT_APP_API_URL + 'blog/' : '';
    const [image, setImage] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const getPosts = () => {
        axios.get(url).then(response => {
            if (response.data) {
                setPosts(response.data)
            }
        })
    }
    useEffect(() => {
        getPosts()
    }, []);


    const deletePost = (id: any) => {
        Axios.delete(url + id, {
            withCredentials: true
        }).finally(() => {
            getPosts();
        })
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = posts.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(posts.length / recordsPerPage)

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>Blog Posts</span>
                    <Link to="/admin-create-blog"><i className="fas fa-plus"></i></Link>
                </div>
                <div className="posts">
                    <div className="cms-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Published</th>
                                <th>Added on</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentRecords.map((post) => (
                                    <tr key={post.id}>
                                        <td>
                                            <span className="cms-table-value">{post.title}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{post.description}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value"><i
                                                className={post.isPublished ? "far fa-check-circle green" : "far fa-check-circle red"}></i></span>
                                        </td>
                                        <td>
                                            <span
                                                className="cms-table-value">{new Date(post.createdAt).toLocaleString()}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value"><img width={50} height={50}
                                                                                   src={`http://localhost:4000/uploads/${post.image}`}
                                                                                   alt={post.image}/></span>
                                        </td>
                                        <td>
                                            <span><Link to={`/admin-update-blog/${post.id}`}><i
                                                className="fas fa-edit blue"></i></Link></span>
                                        </td>
                                        <td>
                                            <span onClick={() => deletePost(post.id)}><i
                                                className="fas fa-delete-left red"></i></span>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <Navigation nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}