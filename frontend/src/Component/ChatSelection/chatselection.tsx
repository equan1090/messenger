import React from 'react';
import Compose from '../../resources/images/compose.svg';
import './chatselection.css';
export default function ChatSelection() {

    return (
        <>
            <div className='chat-header'>
                <h3>Chats</h3>
                <img src={Compose} alt="" id='compose-icon'/>
            </div>
        </>
    )


}
