import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import "./Sidebar"
import Sidebar from "./Sidebar";
import axios from "axios";
import {Link} from "react-router-dom";
import Navigation from "../Custom/Navigation";

export default function AdminPageSourcePage() {

    const [sources, setSources] = useState([{id: -1, name: '', description: '', image: '', link: '', provider: ''}])
    const url: any = process.env.REACT_APP_API_URL + 'source/' !== undefined ? process.env.REACT_APP_API_URL + 'source/' : '';
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const getSources = () => {
        axios.get(url).then(response => {
            if (response.data) {
                setSources(response.data)
            }
        })
    }
    useEffect(() => {
        getSources()
    }, []);


    const deleteSource = (id: any) => {
        Axios.delete(url + id, {
            withCredentials: true
        }).finally(() => {
            getSources();
        })
    }
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sources.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(sources.length / recordsPerPage)
    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>Sources</span>
                    <Link to="/admin-create-source"><i className="fas fa-plus"></i></Link>
                </div>
                <div className="posts">
                    <div className="cms-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Link</th>
                                <th>Provider</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentRecords.map((source) => (
                                    <tr key={source.id}>
                                        <td>
                                            <span className="cms-table-value">{source.name}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{source.description}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{source.image}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{source.link}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{source.provider}</span>
                                        </td>
                                        <td>
                                            <span><Link to={`/admin-update-source/${source.id}`}><i
                                                className="fas fa-edit blue"></i></Link></span>
                                        </td>
                                        <td>
                                            <span onClick={() => deleteSource(source.id)}><i
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