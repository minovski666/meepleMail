import React, {useEffect, useState} from 'react'
import Footer from "../Footer/Footer";
import axios from "axios";
import Navigation from "../Custom/Navigation";

export default function ChangeLogPage() {

    const [changeLogs, setChangeLogs] = useState([{id: -1, createdAt: '', title: '', description: ''}])

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    useEffect(() => {
        const url: any = process.env.REACT_APP_API_URL+'change-log/published' !== undefined ? process.env.REACT_APP_API_URL+'change-log/published' : '';
        axios.get(url).then(response => {
            if (response.data){
                setChangeLogs(response.data)
            }
        })
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = changeLogs.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(changeLogs.length / recordsPerPage)

    return (
        <div>
            <div className="changelog-wrapper">
                <div>
                    <h1>Changelog</h1>
                    <p>Check out the most recent updates and improvements</p>
                    <div className="changelog-posts">
                        <div>
                            {currentRecords.map((changeLog) => (
                                <div className="changelog-post" key={changeLog.id}>
                                    <span>{new Date(changeLog.createdAt).toLocaleString()}</span>
                                    <h2>{changeLog.title}</h2>
                                    <div>
                                        <p>{changeLog.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Navigation nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                </div>
            </div>
            <Footer/>
        </div>
    );
}
