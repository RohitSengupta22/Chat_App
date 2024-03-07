import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChatContext } from '../Context/ChatProvider';
import { ChatIdContext } from '../Context/ChatIdProvider';
import { SocketContext } from '../Context/SocketProvider';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const Homepage = () => {
    
    const authToken = localStorage.getItem('token');
    const [chatID,setChatID] = useContext(ChatIdContext)
    const BASE_URL = 'http://localhost:3002/api';
    const [chatwith, setChatwith] = useContext(ChatContext);
    const [Email, setEmail] = useState({ Email: '' });
    const navigate = useNavigate();
    const [recipients, setRecipients] = useState([]);
    const [user,setUser] = useState()
    



   

 

    function changeHandler(e) {
        setEmail({ ...Email, [e.target.name]: e.target.value });
    }

    async function searchRecipient() {
        const response = await axios.post(`${BASE_URL}/search`, { Email: Email.Email }, {
            headers: {
                'auth-token': authToken
            }
        });

        if(typeof(response.data)!=='object'){
            alert(response.data)
        }else{

            setRecipients([...recipients,response.data.newChat]);
        
            setEmail({ Email: '' });

            console.log(response.data)

        }

       

        // console.log(response.data.newChat)

        
    }

    useEffect(()=>{

        async function fetchUser() {
            const response = await axios.get(`${BASE_URL}/user`,{
                headers: {
                    'auth-token': authToken
                }
            });

            
           setUser(response.data.loggedInUser.Email)
           
        }

        fetchUser();

    },[])

    useEffect(() => {
        async function fetchRecipients() {
            const response = await axios.get(`${BASE_URL}/chats`, {
                headers: {
                    'auth-token': authToken
                }
            });

            setRecipients(response.data.user.ChatRooms);
            console.log(response.data)
        }

        fetchRecipients();
    }, []);

    function OpenChat(Name,id,initiator,reciever) {
        setChatwith(user==initiator ? reciever : initiator);
        setChatID(id)
        navigate(`/Chat/${Name}`);
       
    }

   

    return (
        <>
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '10%', position: 'sticky' }}>
                <InputGroup size="sm" className="mb-3" style={{ width: '50%' }}>
                    <Button variant="info" onClick={searchRecipient}>Search</Button>{' '}
                    <Form.Control
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={changeHandler}
                        name='Email'
                        value={Email.Email}
                    />
                </InputGroup>
            </Container>
            <Container style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {
                    recipients.map((elem, index) => {
                        return (
                            <Card body style={{ width: '50%', cursor: 'pointer' }} onClick={()=>OpenChat(elem.ChatName.Name,elem._id,elem.ChatName.initiator,elem.ChatName.receiver)} key={index}> {elem.ChatName.Name}</Card>
                        );
                    })
                }
            </Container>
        </>
    );
};

export default Homepage;