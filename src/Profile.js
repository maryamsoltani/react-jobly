import React, { useState, useContext } from "react";
import UserContext from "./userContext";
import JoblyApi from "./Api"

import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function Profile() {
    const { curUser, setCurUser } = useContext(UserContext)
    const initalState = {
        password: "",
        firstName: curUser.firstName,
        lastName: curUser.lastName,
        email: curUser.email
    }
    const [formData, setformData] = useState(initalState);
    const [formErrors, setFormErrors] = useState([]);
    const { username, password, firstName, lastName, email } = formData

    // Update Profile Function:
    // Create one profileObj for updating the DB and on formData for keeping currentUser updated
    const updateProfile = async (formData) => {

        // DB Updated:
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        }

        // CurrentUser Updated
        let username = formData.username
        let updatedUser;

        try {
            let updatedUser = await JoblyApi.patchUser(username, profileData)
        } catch (error) {
            console.log("Error: ", error);
            setFormErrors(error)
            return;
        }
        setCurUser(updatedUser)

    }

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
        updateProfile(formData)
        // Collect updated form data and re-render local form state with it
        setformData(f => ({ ...f, password: "" }))
        setFormErrors([])
    }

    return (
        <Row className="Profile">
            <h1>Update User Information</h1>
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
                    <Button className="btn btn-default btn-md">Save</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default Profile;
