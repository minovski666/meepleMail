import React, {useEffect, useState, useContext} from 'react'
import Axios, {AxiosResponse} from 'axios'
import {myContext} from '../../Context';
import "./Sidebar"

import {IUser} from "../../types/maintypes";
import Sidebar from "./Sidebar";
import Navigation from "../Custom/Navigation";

export default function AdminPageUsers() {
    const userObject = useContext(myContext) as IUser;

    const url: any = process.env.REACT_APP_API_URL + 'users/get-all-users' !== undefined ? process.env.REACT_APP_API_URL + 'users/get-all-users' : '';

    const [data, setData] = useState<IUser[]>();
    const [selectedUser, setSelectedUser] = useState<string>();

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
    if (!data) {
        return null;
    }


    const deleteUser = () => {
        let userid: string | undefined;
        data.forEach((item: IUser) => {
            if (item.firstName === selectedUser) {
                userid = item.id;
            }
        })

        Axios.post(url + 'users/delete-user', {
            id: userid!
        }, {
            withCredentials: true
        });
    }

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    return (
        <div className='wrapper'>
            <Sidebar/>
            <div className="content-wrapper">

                <div className="header-admin">
                    <span>Users</span>
                    {/*<a href="#"><i className="fas fa-plus"></i></a>*/}
                </div>
                <div className="posts">
                    <div className="cms-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Provider</th>
                                <th>Subscription</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                currentRecords.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <span className="cms-table-value">{user.firstName}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{user.lastName}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{user.email}</span>
                                        </td>
                                        <td>
                                            <span className="cms-table-value">{user.provider}</span>
                                        </td>
                                        <td>
                                            <span
                                                className="cms-table-value">{user.subscriptions.length ? user.subscriptions[0].plan.nickname : 'no plan'}</span>
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