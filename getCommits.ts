// import { request } from "npm:graphql-request@7.0.1";
import { getTotalCommitContributionsForUserQuery } from "./queries.ts";

const serializeResponse = async (response:Response) => {
    return await response.json();
};

const fetchCommits = async (query:string, options:object, token:string) => {
    return await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: options,
        }),
    });
};

export async function getAllCommitsForUser(username:string, token:string, from:Date, to:Date) {
    try {
        const response = await fetchCommits(getTotalCommitContributionsForUserQuery, {username, from, to}, token);

        if(response.status!== 200) {
            throw new Error(`API responded with status code ${response.status}, and message "${response.statusText}"`);
        }

        return await serializeResponse(response).then((data) => {
            return data.data.user.contributionsCollection.totalCommitContributions;
        });

    } catch (error) { throw error; }
};