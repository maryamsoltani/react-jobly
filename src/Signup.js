import React, { useState, useContext } from "react";
import UserContext from "./userContext";
import { useHistory } from "react-router-dom";

import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function Signup() {
    const initalState = { username:"", password:"", firstName:"", lastName:"", email:"" }
    const [formData, setformData] = useState(initalState);
    const { signUpUser } = useContext(UserContext)
    const { username, password, firstName, lastName, email } = formData
    const history = useHistory();

    // handle Change
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
        signUpUser(formData)
        setformData(initalState)
        history.push("/");
    }

    return (
        <Row className="Signup">
            <h1>Sign Up</h1>
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
                    <FormGroup >
                        <Label htmlFor="firstName" className="mr-md-2">FirstName: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="text"
                            value={firstName}
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name" />
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="lastName" className="mr-md-2">LastName: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="text"
                            value={lastName}
                            name="lastName"
                            id="lastName"
                            placeholder="Enter last name" />
                    </FormGroup>
                    <FormGroup >
                        <Label htmlFor="email" className="mr-md-2">Email: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="email"
                            value={email}
                            name="email"
                            id="email"
                            placeholder="Enter email" />
                    </FormGroup>
                    <Button className="btn btn-default btn-md">Submit</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default Signup;
