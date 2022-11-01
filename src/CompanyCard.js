import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
    return (
        <div className="CompanyCard">
       
            <Link to={`/companies/${company.handle}`}>
                <Card className="CompanyCard-Card">
                    {company.logoUrl ? <CardImg top width="100%" src={`${company.logoUrl}`} alt="Card image cap" />: null}
                    <CardBody>
                        <CardTitle className="p-5">{`${company.name}`}</CardTitle>
                        <CardText>{`${company.description}`}</CardText>
                    </CardBody>
                </Card>
            </Link>

        </div>
    );
};

export default CompanyCard;
