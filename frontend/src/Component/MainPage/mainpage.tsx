import React from 'react';
import './mainpage.css';
import Navbar from '../Navbar/navbar';
import Subnav from '../Subnav/subnav';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export default function MainPage() {

    const user = useSelector((state:RootState) => state.auth.user);
    console.log("user", user)
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
