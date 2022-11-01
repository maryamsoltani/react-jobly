import React, {useContext} from 'react';
import UserContext from "./userContext";


function Home() {
    const { curUser } = useContext(UserContext)

    return (
        <>
            <h1>Jobly</h1>
            <h4>All the jobs in one, convenient place.</h4>
            <h3>{curUser ? `Welcome back ${curUser.firstName}`: null}</h3>
        </>
    )
}

export default Home;