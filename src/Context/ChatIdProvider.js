import React from 'react'
import { createContext,useState } from 'react';
export const ChatIdContext = createContext();

const ChatIdProvier = (props) => {

    const [chatID,setChatID] = useState()
  return (
    <ChatIdContext.Provider value={[chatID,setChatID]}>
        {props.children}
    </ChatIdContext.Provider>
  )
}

export default ChatIdProvier
