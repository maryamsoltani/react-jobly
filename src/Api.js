import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;
    static userToken;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.userToken ? JoblyApi.userToken : JoblyApi.token}` };
        // if method is get then set params to data else set to empty obj
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    //Get all companies 
    static async getCompanies() {
        let res = await this.request(`companies/`);
        return res.companies;
    }

    //Get all jobs 
    static async getJobs() {
        let res = await this.request(`jobs/`);
        return res.jobs;
    }

    // search for companies:
    static async findCompanies(searchTerm) {
        // client side (React code)
        let res = await this.request(`companies/?name=${searchTerm}`)

        // In express handler:
        // req.query.myparam === "baz"
        // let res = await this.request(`companies/`);
        return res.companies;
    }

    // finds jobs dependant on search term
    static async findJobs(searchTerm) {
        let res = await this.request(`jobs/?title=${searchTerm}`)
        return res.jobs
    }

    // return one user
    static async getOneUser(username) {
        let res = await this.request(`users/${username}`)
        return res.user
    }

    // sign up a user
    static async signUp(data) {
        let res = await this.request(`auth/register`, data, "POST")
        JoblyApi.userToken = res.token
        return res.token
    }

    // checks auth and returns token if user and password correct
    static async login(data) {
        let res = await this.request(`auth/token`, data, "POST")
        JoblyApi.userToken = res.token
        return res.token
    }

    // updates user data
    static async patchUser(username, data) {
        console.log("username, in API", username);
        let res = await this.request(`users/${username}`, data, "PATCH")
        JoblyApi.userToken = res.token
        return res.token
    }

    // Apply to a job 
    static async applyToJob(username, id) {
        await this.request(`users/${username}/jobs/${id}`, {}, "post");
    }

}

// for now, put token ("testuser" / "password" on class)

JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;