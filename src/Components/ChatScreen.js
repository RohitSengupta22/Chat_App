import React, { useState, useEffect, useContext } from 'react';
import '../CSS/ChatScreen.css'
import { ChatContext } from '../Context/ChatProvider';
import { ChatIdContext } from '../Context/ChatIdProvider';
import { SocketContext } from '../Context/SocketProvider';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const ChatScreen = () => {
    const BASE_URL = 'http://localhost:3002/api';
    const [chatID, setChatID] = useContext(ChatIdContext)
    const authToken = localStorage.getItem('token');
    const [chatwith, setChatwith] = useContext(ChatContext);
    const [socketId, setSocketId] = useState();
    const [message, setMessage] = useState('');
    const [messageArr, setMessageArr] = useState([])
    const socket = useContext(SocketContext); // Use the socket from SocketProvider
    const [recipientID, setRecipientID] = useState(null);
    const [user, setUser] = useState()

    async function sendMessage() {
        const response = await axios.post(`${BASE_URL}/send/${chatwith}`, { message }, {
            headers: {
                'auth-token': authToken
            }
        });

        console.log(response.data.chat.Messages)
        setMessageArr(response.data.chat.Messages)
        setMessage('')



        // console.log(response.data.newChat)


    }

    useEffect(() => {

        async function fetchChats() {
            const response = await axios.get(`${BASE_URL}/messages/${chatID && chatID}`);


            // console.log(response.data)
            setMessageArr(response.data.chat.Messages)
        }

        fetchChats();

    }, [])

    useEffect(() => {

        async function fetchUser() {
            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    'auth-token': authToken
                }
            });


            setUser(response.data.loggedInUser._id)

        }

        fetchUser();

    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>



            <Container style={{ flexGrow: 1, overflowY: 'auto' }}>
                {
                    messageArr.map((message) => {
                        return (
                            <>
                                <div style={{ position: 'relative', top: '10px', left: '8px', marginLeft: user == message.Sender.toString() ? '80%' : '0',marginBottom: '6px' }}>
                                    <span style={{ fontSize: '10px', color: 'grey', fontWeight: 'bold' }}>{message.DateTime}</span>
                                </div>
                                <Card style={{ width: 'fit-content', marginTop: '2px', marginLeft: user == message.Sender.toString() ? '80%' : '0', backgroundColor: user == message.Sender.toString() && '#b7f595' }}>
                                    <Card.Body>
                                        {message.Content}



                                    </Card.Body>
                                </Card>
                            </>
                        )
                    })
                }
            </Container>
            <Container style={{ position: 'sticky', bottom: 0, zIndex: 10 }} >
                <InputGroup className="mb-3">
                    <Button variant="success" onClick={sendMessage}>Send</Button>{' '}
                    <Form.Control
                        placeholder="Type your message here..."
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                </InputGroup>
            </Container>
        </div>
    );
};

export default ChatScreen;