import React from 'react'
import { createContext,useState } from 'react';
export const ChatContext = createContext();

const ChatProvider = (props) => {

    const [chatwith,setChatwith] = useState()
  return (
    <ChatContext.Provider value={[chatwith,setChatwith]}>
        {props.children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
