import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {Link} from "react-router-dom";
import Navigation from "../Custom/Navigation";

export default function AdminPageChangeLogs() {

    const [changeLogs, setChangeLogs] = useState([{id: -1, createdAt: '', title: '', description: '', isPublished: ''}])
    const url: any = process.env.REACT_APP_API_URL + 'change-log/' !== undefined ? process.env.REACT_APP_API_URL + 'change-log/' : '';

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const getChangeLogs = () => {
        axios.get(url).then(response => {
            if (response.data) {
                setChangeLogs(response.data)
            }
        })
    }
    useEffect(() => {
        getChangeLogs()
    }, []);


    const deleteChangeLog = (id: any) => {
        Axios.delete(url + id, {
            withCredentials: true
        }).finally(() => {
            getChangeLogs();
        })
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = changeLogs.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(changeLogs.length / recordsPerPage)

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>Changelog</span>
                    <Link to="/admin-create-change-log"><i className="fas fa-plus"></i></Link>
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
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentRecords.map((changeLog) => (
                                    <tr key={changeLog.id}>
                                        <td>
                                            <span className="cms-table-value">{changeLog.title}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{changeLog.description}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value"><i
                                                className={changeLog.isPublished ? "far fa-check-circle green" : "far fa-check-circle red"}></i></span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{new Date(changeLog.createdAt).toLocaleString()}</span>
                                        </td>
                                        <td>
                                            <span><Link to={`/admin-update-change-log/${changeLog.id}`}><i
                                                className="fas fa-edit blue"></i></Link></span>
                                        </td>
                                        <td>
                                            <span onClick={() => deleteChangeLog(changeLog.id)}><i
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