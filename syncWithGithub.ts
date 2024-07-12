import { getAllCommitsForUser } from "./getCommits.ts";

 // (contributionsCollection) => totalCommitContributions, totalPullRequestContributions, totalPullRequestReviewContributions

// query ContributionsView($username: String!, $from: DateTime!, $to: DateTime!) {
//     user(login: $username) {
//       contributionsCollection(from: $from, to: $to) {
//         totalCommitContributions
//         totalIssueContributions
//         totalPullRequestContributions
//         totalPullRequestReviewContributions
//       }
//     }
// };

// TODO: Should either merge stats or return stats to be merged elsewhere.
export async function syncContributionsWithGithub(username:string, token:string, from:Date, to:Date) {
    const newContributions = await getAllCommitsForUser(username, token, from, to);
    // db call...
    return newContributions; 
};