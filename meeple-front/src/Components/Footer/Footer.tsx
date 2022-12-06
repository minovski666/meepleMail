import React from "react";
import {Link} from 'react-router-dom';

export default function Footer() {

    return (
        <div className="footer">
            <div>
                <ul className="footer-navigation">
                    {/*<li><Link to="/blog">Contact us</Link></li>*/}
                    <li><Link to="/blog">Blog</Link></li>
                    {/*<li><Link to="/blog">Pricing</Link></li>*/}
                    <li><Link to="/privacy">Privacy</Link></li>
                    <li><Link to="/terms">Terms</Link></li>
                    <li><Link to="/cookie">Cookie Policy</Link></li>
                </ul>
            </div>
        </div>
    );

}