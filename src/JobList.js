import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./Api"
import UserContext from "./userContext";

import {
    Card, CardText, CardBody,
    CardTitle, Button, Form, FormGroup, Label, Input
} from 'reactstrap';



function JobList() {
    const [Jobs, setJobs] = useState([]);
    const [Toggle, setToggle] = useState([false]);
    const [onChange, setOnChange] = useState({ searchInput: "" });
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState(false);

    // Handle Application
    // useEffect(() => {
    //     setApplied(hasAppliedToJob(Jobs.id))
    // }, [Jobs.id, hasAppliedToJob]);

    /** Apply for a job */
    async function handleApply(evt) {
        if (hasAppliedToJob(evt.target.id)) return;
        applyToJob(evt.target.id);
        setApplied(true);
    }

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
            let searchedJobs = await JoblyApi.findJobs(onChange.searchInput)
            setJobs(searchedJobs)

        } catch (error) {
            console.log("error:", error);
            alert("Sorry no results were found. Please try again")
        }
        setOnChange({ searchInput: "" })
    }


    // Inital API data fetch. Get jobs. Get all jobs
    useEffect(() => {
        async function getData() {
            let jobs = await JoblyApi.getJobs()
            setJobs(jobs)
        };
        getData()
    }, []);

    return (
        <div className="JobList">
            <div className="JobCard-List">
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
                {Jobs.map(j => (
                    <Card className="JobCard-card" key={`${j.id}`}>
                        <CardBody>
                            <CardTitle className="p-5">{`${j.title}`}</CardTitle>
                            <CardText>Salary: {`${j.salary}`}</CardText>
                            <CardText>Title: {`${j.equity}`}</CardText>
                            <Button onClick={handleApply}>{applied ? "Applied": "Apply"}</Button>
                        </CardBody>
                    </Card>

                ))}
            </div>

        </div>
    );
}

export default JobList;
