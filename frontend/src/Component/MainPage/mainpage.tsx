import React from 'react';
import './mainpage.css';
import Navbar from '../Navbar/navbar';
import Subnav from '../Subnav/subnav';

export default function MainPage() {
    return (
        <>
            <div className="main-container">
                <div className="navbar">
                    <Navbar />
                </div>
                <div className="subnav">
                    <Subnav />
                </div>
                <div className="chatroom"></div>
                <div className="chat-info"></div>
            </div>
        </>
    );
}
