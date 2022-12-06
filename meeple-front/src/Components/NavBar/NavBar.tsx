import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import {myContext} from '../../Context';
import {IUser} from '../../types/maintypes';
import bob from "../../assets/images/bob.jpg"

export default function NavBar() {
    const userObject = useContext(myContext) as IUser;
    const localData = localStorage.getItem('user');
   // const userObject = localData ? JSON.parse(localData) : []

    const url: any = process.env.REACT_APP_API_URL !== undefined ? process.env.REACT_APP_API_URL : '';

    const [posts, setPosts] = useState([{
        id: -1,
        title: '',
        description: '',
        image: '',
        isPublished: '',
        createdAt: ''
    }])
    const [changeLogs, setChangeLogs] = useState([{id: -1, createdAt: '', title: '', description: ''}])

    useEffect(() => {

        axios.get(url + 'blog/published').then(response => {
            if (response.data) {
                setPosts(response.data)
            }
        })

        axios.get(url + 'change-log/published').then(response => {
            if (response.data) {
                setChangeLogs(response.data)
            }
        })

    }, []);

    const logout = () => {
        axios.get(url + "auth/sign-out", {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === "done") {
                sessionStorage.clear();
                setTimeout(() => {
                    window.location.href = "/"
                }, 500)
            }
        })
    }

    return (
        <div className={`header ${userObject ? "transparent loggedin" : ""}`}>
            <div>
                <Link to={`${userObject ? "/home" : "/"}`}>meeplemail</Link>
                <div className="navigation">
                    <ul>
                        {userObject ? (
                            <>
                                <div className="profile-actions">
                                    <span><img
                                        src={userObject.profilePicture ? userObject.profilePicture : bob}/></span>
                                    <ul>
                                        {userObject.isAdmin ? (
                                            <li><Link to="/admin-users"><i className="icon-user"></i> Admin</Link>
                                            </li>) : null}
                                        <li><Link to="/home"><i className="icon-pencil"></i> Newsletter</Link></li>
                                        <li>
                                            {changeLogs.length > 0 &&
                                                <Link to="/changelog"><i
                                                    className="icon-lightbulb"></i> Changelog</Link>
                                            }
                                        </li>
                                        <li>
                                            {posts.length > 0 &&
                                                <Link to="/blog"><i className="icon-doc"></i> Blog</Link>
                                            }
                                        </li>
                                        <li><Link to="/profile"><i className="icon-cog"></i> Settings</Link></li>
                                        <li>
                                            <button onClick={logout}><i className="icon-power"></i> Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <li><Link to="/changelog">Changelog</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
