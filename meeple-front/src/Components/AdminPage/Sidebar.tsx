import React, {useContext} from 'react'
import {Link} from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/admin-users"><i className="far fa-compass"></i> Users</Link></li>
                <li><Link to="/admin-blogs"><i className="far fa-file-alt"></i> Blog</Link></li>
                <li><Link to="/admin-change-logs"><i className="far fa-clone"></i> Changelog</Link></li>
                <li><Link to="/admin-sources"><i className="far fa-sourcetree"></i> Sources</Link></li>
                <li><Link to="/admin-connect"><i className="far fa-sourcetree"></i> Connect forms</Link></li>
                <li><Link to="/admin-connect-bug"><i className="far fa-sourcetree"></i> Report a bug</Link></li>
            </ul>
        </div>
    )
}
