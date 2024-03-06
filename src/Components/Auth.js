import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Auth.css'
import Box from '@mui/material/Box';



import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Auth = () => {

    const BASE_URL = 'http://localhost:3002/api'
    const navigate = useNavigate();
    const [account, setAccount] = useState(true);
    const [toaststate, setToastState] = useState(false)
    const [logincred, setLogincred] = useState({
        Email: '',
        Password: ''
    })
    const [signupcred, setSignupcred] = useState({
        Email: '',
        Name: '',
      
        Password: ''
    });
    const [authToken, setAuthToken] = useState('')
    const [loader, setLoader] = useState(false)

    function signupHandler() {
        setAccount(false);
    }

    function loginHandler() {
        setAccount(true);
    }

    function signupcredHandler(e) {
        const { name, value } = e.target;
        setSignupcred({ ...signupcred, [name]: value });
    }

    function logincredHandler(e) {
        const { name, value } = e.target;
        setLogincred({ ...logincred, [name]: value });
    }

    function openLoader(){
        setLoader(true)
    }

    function closeLoader(){
        setLoader(false)
    }


    async function signUp() {

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(signupcred.Email==='' || signupcred.FirstName==='' || signupcred.LastName==='' || signupcred.DOB==='' || signupcred.Password===''){
            alert('Enter all required fields')
        }else if(!emailRegex.test(signupcred.Email)){
            alert("enter a valid email")
        }else{

            try {
                openLoader()
                const response = await fetch(`${BASE_URL}/signup`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupcred),
                });
    
                
    
                if (response.ok) {
                    const res = await response.json();
    
                    setAuthToken(res.token);
    
                    localStorage.setItem('token', res.token);
                    navigate('/home')
                } else {
    
                    alert("Email Already Exists!")
                }
            } catch (error) {
                console.log(error);
            } finally {
                closeLoader()
            }

        }
       
    }



    async function login() {

        openLoader()
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logincred),
            });

            console.log(response.status)

            if (response.ok) {
                const res = await response.json();

                setAuthToken(res.token);

                localStorage.setItem('token', res.token);
                navigate('/home')
            } else {
                alert("invalid credentials")
            }
        } catch (error) {
            console.log(error);
        } finally {
            closeLoader()
        }
    }

    function navigateToReset(){
        navigate('/Reset-Password')
    }







    return (

        <div>

            {
                loader && <div>
                   
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openLoader}
                        onClick={closeLoader}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            }



            {account ? <Container className='authcontainer'>

            

                <Row>

                
                    
                    <Col lg={12} md={12} sm={12} xs={12}>

                        
                       
                        <div style={{ width: '500px', height: '400px', backgroundColor: 'white', boxShadow: '3px 3px rgba(0, 0, 0, 0.43)', borderRadius: '10px',position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} className='Credbox'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    defaultValue="johndoe@example.com"
                                    style={{ width: '90%', margin: '10px' }}
                                    name='Email'
                                    onChange={logincredHandler}
                                    value={logincred.Email}
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    style={{ width: '90%', margin: '10px' }}
                                    name='Password'
                                    onChange={logincredHandler}
                                    value={logincred.Password}
                                />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: 'black' }} onClick={login}>Login</Button>
                                <hr style={{ width: '100%', borderTop: '2px solid black', margin: '20px 0' }} />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: '#6E4D57', color: 'white', fontWeight: 'bold' }} onClick={signupHandler}>Create a New Account </Button>
                                <h6 style={{textAlign: 'center',color: 'blue',marginTop: '20px',cursor: 'pointer'}} onClick={navigateToReset}>Forgot Password?</h6>
                                
                            </Box>






                        </div>

                        
                    </Col>
                    
                </Row>
            </Container> : <Container className='authcontainer'>

                <Row>
                   
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <div style={{ width: '500px', height: '400px', backgroundColor: 'white', boxShadow: '3px 3px rgba(0, 0, 0, 0.43)', borderRadius: '10px',position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'  }} className='Credbox'>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    name='Email'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Email}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Name"
                                    name='Name'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Name}
                                />
                               
                            
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    name='Password'
                                    style={{ width: '90%', margin: '10px' }}
                                    onChange={signupcredHandler}
                                    value={signupcred.Password}
                                />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: 'black' }} onClick={signUp}>Sign Up</Button>
                                <hr style={{ width: '100%', borderTop: '2px solid black', margin: '20px 0' }} />
                                <Button variant="contained" style={{ width: '90%', marginTop: '20px', backgroundColor: '#6E4D57', color: 'white', fontWeight: 'bold' }} onClick={loginHandler}>Already Have An Account? </Button>

                            </Box>




                        </div>
                    </Col>
                </Row>



            </Container>
            }

        </div>




    )
}

export default Auth;