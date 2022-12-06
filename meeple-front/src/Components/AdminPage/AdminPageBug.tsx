import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {myContext} from '../../Context';
import "./Sidebar"

import {IUser} from "../../types/maintypes";
import Sidebar from "./Sidebar";
import Navigation from "../Custom/Navigation";

export default function AdminPageBug() {
    const userObject = useContext(myContext) as IUser;

    const url: any = process.env.REACT_APP_API_URL + 'contacts/bugs' !== undefined ? process.env.REACT_APP_API_URL + 'contacts/bugs' : '';

    const [data, setData] = useState([{id: -1, name: 'test', email: 'test@mail.com', comment: 'test comment ova ona'}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    useEffect(() => {

        Axios.get(url, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res) {
                setData(res.data)
            }
        })
    }, [userObject]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>Report a Bug</span>
                    {/*<a href="#"><i className="fas fa-plus"></i></a>*/}
                </div>
                <div className="posts">
                    <div className="cms-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentRecords.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>
                                            <span className="cms-table-value">{contact.name}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{contact.email}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{contact.comment}</span>
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