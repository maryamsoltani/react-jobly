import React, { useState, useEffect } from "react";
import JoblyApi from "./Api"
import { useParams } from 'react-router-dom';

import {
    Card, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';


function CompanyDetail() {
    const [Jobs, setJobs] = useState([]);
    const [Company, setCompany] = useState([]);
    const [Toggle, setToggle] = useState([false]);
    const { handle } = useParams();

    // Inital API data fetch. Get Company. Get all jobs
    useEffect(() => {
        async function getData() {
            let company = await JoblyApi.getCompany(handle)
            setCompany(company)
            setJobs(company.jobs)
        };
        getData()
    }, []);

    // Toggle - 6/6 - Come back and fix for one button not all - TODO
    const toggleButton = (prev) => {
        setToggle(!prev)
    }


    return (
        <div className="CompanyDetail">
            <h4>{`${Company.name}`}</h4>
            <p>{`${Company.description}`}</p>
            <div className="JobCard-List">
                {Jobs.map(j => (
                    <Card className="JobCard-card" key={`${j.id}`}>
                        <CardBody>
                            <CardTitle className="p-5">{`${j.title}`}</CardTitle>
                            <CardText>Salary: {`${j.salary}`}</CardText>
                            <CardText>Title: {`${j.equity}`}</CardText>
                            <Button onClick={toggleButton}>{Toggle ? "Apply" : "Applied"}</Button>
                        </CardBody>
                    </Card>

                ))}
            </div>

        </div>
    );
}

export default CompanyDetail;
