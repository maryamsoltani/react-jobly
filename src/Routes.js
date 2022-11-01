import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import CompaniesList from './CompaniesList';
import CompanyDetail from './CompanyDetail';
import Job from './Job';
import JobList from './JobList';
import PrivateRoute from './PrivateRoute';


// This grabs all the companies and jobs to pass to the approprate routes when called
// Otherwise the invidiual components pass it along
function Routes() {
    // const [company, setCompany] = useState([]);
    // const [jobs, setJobs] = useState([]);
    

    // // Inital API data fetch ONE COMPANY & THOSE JOBS:
    // useEffect(() => {
    //     async function getData() {
    //         let companies = await JoblyApi.getCompany()
    //         let jobs = await JoblyApi.getJobs()
    //         setJobs(jobs)
    //         setCompanies(companies)
    //     };
    //     getData()
    // }, []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <PrivateRoute exact path="/companies">
                    <CompaniesList />
                </PrivateRoute>  
                <PrivateRoute path="/companies/:handle">
                    <CompanyDetail />
                </PrivateRoute>
                <PrivateRoute exact path="/jobs">
                    <JobList />
                </PrivateRoute>
                <PrivateRoute path="/jobs/:id">
                    <Job />
                </PrivateRoute>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <PrivateRoute exact path="/profile">
                    <Profile />
                </PrivateRoute>
                <Route>
                    <p>Hmmm. I can't seem to find what you want.</p>
                </Route>
            </Switch>
        </main>
    );
}


export default Routes;