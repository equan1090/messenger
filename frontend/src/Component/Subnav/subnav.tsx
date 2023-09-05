import React from 'react';

import Compose from '../../resources/images/compose.svg';
import './subnav.css'; // Import CSS file for custom styling
export default function Subnav() {

    return (
        <>
            <div className="subnav-header">
                <h3>Chats</h3>
                <img src={Compose} alt="" className='compose-icon' />
            </div>
        </>
    );

}
