import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './signup.css';
import {useDispatch} from "react-redux";
import { useSignupMutation } from '../../state/service/user';
import { useNavigate } from 'react-router-dom';



export default function SignupPage() {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const [signup, {isError, error}] = useSignupMutation();

    let navigate = useNavigate();




    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
     
        event.preventDefault();

        let errors: string[] = []
        if (password !== confirmPassword) errors.push("Passwords do not match")
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            errors.push("Please fill out all fields");
        }
        if (errors.length) {
            setErrors(errors);
            return null;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password
        }

        try {
            await signup(newUser).unwrap();

            navigate('/')
            setErrors([])
        } catch (error) {
            const message = (error as any).data.message;
            errors.push(message)
            setErrors(errors)
        }

    }


    return (
        <div className="signup-wrapper">
            <h1 id='signup-title'>Airmail</h1>
            <Container className="signup-container">
                <Row>
                    <Col>
                        <div className='signup-header'>
                            <h2>Create a new account</h2>
                            <p id="signup-text">It's quick and easy.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="Name" className="mb-3">
                                        <Form.Control type="text"
                                                      placeholder="First Name"
                                                      value={firstName}
                                                      onChange={e => setFirstName(e.target.value)}

                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="LastName" className="mb-3">
                                        <Form.Control type="text"
                                                      placeholder="Last Name"
                                                      value={lastName}
                                                      onChange={e => setLastName(e.target.value)}
                                                      required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="Email" className="mb-3">
                                <Form.Control type="email"
                                              placeholder="Email"
                                              value={email}
                                              onChange={e => setEmail(e.target.value)}
                                              required
                                />
                            </Form.Group>
                            <Form.Group controlId="Password" className="mb-3">
                                <Form.Control type="password"
                                              placeholder="Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                              required

                                />
                            </Form.Group>
                            <Form.Group controlId="ConfirmPassword" className="mb-3">
                                <Form.Control type="password"
                                              placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                              required

                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    {errors.length > 0 && (
                                        <div className="error-list">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </div>

                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Button variant="primary" type="submit" className="signup-button no-hover">
                                        Sign Up
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p id='signup-disclaimer'>People who use this application do not have to use their real information. This is just a simple application used to display my abilities as a full stack developer.</p>
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <p id='signup-login'>Already have an account? <a href="/">Login</a></p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
