import React, { useState, useEffect } from "react";
import CompanyCard from './CompanyCard';
import JoblyApi from "./Api"


import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function CompaniesList() {
    const [companies, setCompanies] = useState([]);
    const [onChange, setOnChange] = useState({ searchInput: "" });


    // Inital API data fetch:
    useEffect(() => {
        async function getCompanies() {
            let companies = await JoblyApi.getCompanies()
            setCompanies(companies)
        };
        getCompanies()
    }, []);

    // handle change 
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setOnChange(f => ({
            ...f,
            [name]: value
        }))
    }

    // Handle submit:
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            let searchedCompanies = await JoblyApi.findCompanies(onChange.searchInput)
            setCompanies(searchedCompanies)

        } catch (error) {
            console.log("error:", error);
            alert("Sorry no results were found. Please try again")
        }
        setOnChange({ searchInput: "" })
    }

    // 6/6 - Look at search endpoint for companies page only, THEN go onto jobs page

    return (
        <Row className="CompaniesList">         
            <Col md="3"></Col>
            <Col md="6">
                <Form inline onSubmit={handleSubmit}>
                    <FormGroup >
                        <Label htmlFor="searchInput" className="mr-md-2">Search: </Label>
                        <Input
                            onChange={handleChange}
                            className="form-control input-md"
                            type="text"
                            value={onChange.searchInput}
                            name="searchInput"
                            id="searchInput"
                            placeholder="Enter search term..." />
                    </FormGroup>
                    <Button className="btn btn-default btn-md">Submit</Button>
                </Form>
                <div className="CompaniesList-list">
                    {companies.map(company => (
                        <CompanyCard company={company} key={company.handle} />
                    ))}
                </div>
            </Col>
        </Row>
    );
}

export default CompaniesList;
