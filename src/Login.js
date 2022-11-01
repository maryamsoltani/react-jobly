import React, { useState, useContext } from "react";
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";

import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function Login() {
    const initalState = { username:"", password:"" }
    const [formData, setformData] = useState(initalState);
    const { loginUser} = useContext(UserContext)
    const { username, password } = formData
    const history = useHistory();

    // handle change 
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setformData(f => ({
            ...f,
            [name]: value
        }))
    }

    // Handle submit:
    const handleSubmit = (evt) => {
        evt.preventDefault()
        loginUser(formData)
        setformData(initalState)
        history.push("/");
    }

    // 6/6 - Look at search endpoint for companies page only, THEN go onto jobs page

    return (
        <Row className="Login">
            <h1>Login</h1>
            <Col md="3"></Col>
            <Col md="6">
                <Form onSubmit={handleSubmit}>
                    <FormGroup >
                        <Label htmlFor="username" className="mr-md-2">Username: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="text"
                            value={username}
                            name="username"
                            id="username"
                            placeholder="Enter username" />
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="password" className="mr-md-2">Password: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="password"
                            value={password}
                            name="password"
                            id="password"
                            placeholder="Enter password" />
                    </FormGroup>                   
                    <Button className="btn btn-default btn-md">Submit</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;
