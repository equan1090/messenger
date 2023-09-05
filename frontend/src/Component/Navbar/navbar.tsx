import React from 'react';
import { Nav } from 'react-bootstrap';
import { ReactComponent as ChatIcon } from '../../resources/images/chat-icon.svg';
import PeopleIcon from '../../resources/images/people.svg';
import { ReactComponent as RequestsIcon } from '../../resources/images/request.svg';

import './navbar.css'; // Import CSS file for custom styling

export default function Navbar() {
    return (
        <Nav className="flex-column vertical-navbar">
            <Nav.Item>
                <a href="/t" className="nav-link-custom">
                    <div className="vnav-icon">
                        <ChatIcon className="navbar-icon" />
                        <Nav.Link href="/t" className="nav-link-custom">Chats</Nav.Link>
                    </div>
                </a>
            </Nav.Item>
            <Nav.Item>
                <a href="/active" className="nav-link-custom">
                    <div className="vnav-icon">
                        <img src={PeopleIcon} alt="" className='navbar-icon' />
                        <Nav.Link href="/active" className="nav-link-custom">People</Nav.Link>
                    </div>
                </a>
            </Nav.Item>
            <Nav.Item>
                <a href="/requests" className="nav-link-custom">
                    <div className="vnav-icon">
                        <RequestsIcon className="navbar-icon" />
                        <Nav.Link href="/requests" className="nav-link-custom">Requests</Nav.Link>
                    </div>
                </a>
            </Nav.Item>
        </Nav>
    );
}
