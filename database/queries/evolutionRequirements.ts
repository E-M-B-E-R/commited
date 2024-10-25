const createEvolutionRequirementsTableQueryString = `
    CREATE TABLE IF NOT EXISTS evolution_requirements (
        evolution_requirement_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        monster_id INTEGER,
        evolution_id monster_id,
        percent_commits REAL NOT NULL,
        percent_pull_requests_opened REAL NOT NULL,
        percent_issues_opened REAL NOT NULL,
        percent_pull_request_reviews REAL NOT NULL,
        total_monster_age_in_minutes INTEGER,
        FOREIGN KEY (monster_id) REFERENCES monsters(monster_id)
    )
`;

const insertEvolutionRequirementQuery = `
    INSERT INTO  evolution_requirements (
        evolution_requirement_id, 
        monster_id, 
        evolution_id, 
        percent_commits, 
        percent_pull_requests_opened, 
        percent_issues_opened, 
        percent_pull_request_reviews, 
        total_monster_age_in_minutes
    ) VALUES (
        :evolution_requirement_id,
        :monster_id,  
        :evolution_id, 
        :percent_commits,
        :percent_pull_requests_opened,
        :percent_issues_opened,
        :percent_pull_request_reviews,
        :total_monster_age_in_minutes
    )
`;

export { createEvolutionRequirementsTableQueryString, insertEvolutionRequirementQuery };