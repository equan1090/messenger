import React, { FormEvent, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './splashpage.css';
import logo from '../../resources/images/logo.png';
import splashimage from '../../resources/images/splashimage.jpg';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLoginMutation } from '../../state/service/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../state/slice/authSlice';

export default function SplashPage(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);
    const [
        loginUser,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            isError: isLoginError,
            error: loginError
        }
        ] = useLoginMutation();



    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        let errors: string[] = []
        event.preventDefault();
        const user = {
            email,
            password
        }


        try {

            const res = await loginUser(user).unwrap();

            dispatch(setCredentials(res));



        } catch (error) {
            errors.push("Invalid email or password")
            setErrors(errors)
        }

    };

    useEffect(() => {
        if(isLoginSuccess){
            
            navigate("/t")
        }
    }, [isLoginSuccess])

    return (
        <div className="splash-wrapper">
            <div className="splash-container">
                <header>
                    <div className="navbar-container">
                        <Navbar className="navbar-content">
                            <Container fluid className="no-padding">
                                <Navbar.Brand href="/">
                                    <img src={logo} alt="" />
                                </Navbar.Brand>
                            </Container>
                            <Container fluid className="d-flex justify-content-end">
                                <Navbar.Brand
                                    href="https://github.com/equan1090"
                                    target="_blank"
                                    className="underline-on-hover navbar-item"
                                >
                                    Github
                                </Navbar.Brand>
                                <Navbar.Brand
                                    href="https://www.linkedin.com/in/eric-quan-821139190/"
                                    target="_blank"
                                    className="underline-on-hover navbar-item"
                                >
                                    LinkedIn
                                </Navbar.Brand>
                                <Navbar.Brand
                                    href="https://ericquan.dev/"
                                    target="_blank"
                                    className="underline-on-hover navbar-item"
                                >
                                    Portfolio
                                </Navbar.Brand>
                            </Container>
                        </Navbar>
                    </div>
                </header>
                <div className="splash-content">
                    <div className="splash-left">
                        <div className="splash-tagline">
                            <h1 className="splash-header">Stay connected anytime, anywhere</h1>
                            <div id="tagline">Airmail makes it easy to stay in touch with your friends and family.</div>
                        </div>
                        <div className="splash-login">
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                    <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange = {e => setPassword(e.target.value)}
                                     />
                                </FloatingLabel>

                                <div>
                                    {errors.length > 0 && (
                                        <div className="error-list">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="splash-btns">
                                    <Button className='login-btn' type="submit">
                                        Login
                                    </Button>
                                    <a href="/signup" className='signup-btn'>No account? Sign up now</a>

                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="splash-right">
                        <div className="splash-image">
                            <img src={splashimage} alt="" />
                        </div>
                    </div>
                </div>
                <footer>
                    <p><strong>Note:</strong> Non-commercial use. This is a clone made solely for personal learning and resume purposes</p>
                </footer>
            </div>
        </div>
    );
}
