import React from 'react'

import onlineIcon from '../../icons/onlineIcon.png'
import './TextContainer.css'


const TextContainer = ({users}) => (
    <div className="textContainer">
        <div>
            <h1> chat-app <span role="img" aria-label="emoji">💬</span></h1>
            <h2> created wtih techonologies we  <span role="img" aria-label="emoji">❤️</span></h2>
        </div> 

        {
            users
            ? (
                <div>
                    <h1>Currently Online in chat room : </h1>
                    <div className="activeContainer">
                        <h2>
                            {users.map(({name}) => (
                                <div key={name} className="activeItem">
                                    {name}
                                    <img  alt="online Icon" src={onlineIcon}/>
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            )
            : null
        }
    </div>
);

export default TextContainer;