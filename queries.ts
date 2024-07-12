
export const getTotalCommitContributionsForUserQuery = `
        query($username: String!, $from:DateTime!, $to:DateTime! ) {
            user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                    totalCommitContributions
                }
            }
        }
`;