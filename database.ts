import { DB, QueryParameterSet } from "https://deno.land/x/sqlite@v3.8/mod.ts";

const queries = [
    `
        CREATE TABLE IF NOT EXISTS monsters (
            monster_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            alive_time_in_minutes INTEGER NOT NULL,
            stage TEXT NOT NULL
        )
    `,
    `
        CREATE TABLE IF NOT EXISTS user_monsters (
            user_monster_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            monster_id INTEGER,
            nickname TEXT,
            current_commits INTEGER NOT NULL,
            current_pull_requests_opened INTEGER NOT NULL,
            current_opened_issues INTEGER NOT NULL,
            current_pull_requests_reviews INTEGER NOT NULL,
            is_frozen INTEGER NOT NULL,
            monster_age_in_minutes INTEGER NOT NULL,
            FOREIGN KEY(monster_id) REFERENCES monsters(monster_id)
        )
    `,
    `
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            user_monster_id INTEGER,
            FOREIGN KEY (user_monster_id) REFERENCES user_monsters(user_monster_id)
        )
    `,
    `
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
    `
];

const createTables = (db: DB, queries : Array<string>) => {
    queries.forEach((query) => {
        db.query(query);
    });
};

const seedMonsters = (db: DB) => {
    return db.query(`
        INSERT INTO monsters (monster_id, name, alive_time_in_minutes, stage)
        VALUES 
            (NULL, 'Baby Gabo', 3, 1),
            (NULL, 'Gabo', 10, 2),
            (NULL, 'Super Gabo', 25, 3);
    `);
};

const seedUsers = (db: DB) => {
    return db.query(`
        INSERT INTO users (user_id, name, user_monster_id)
        VALUES (NULL, 'E-M-B-E-R', NULL)
    `);
};

const evolutionRequirementsData = [{
    evolution_requirement_id: 1,
    monster_id: 1,
    evolution_id: 2, 
    percent_commits: 0.25,
    percent_pull_requests_opened: 0,
    percent_issues_opened: 0,
    percent_pull_request_reviews: 0,
    total_monster_age_in_minutes: 3
}];

const evolutionRequirementsQueryString = `
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

const insertEvolutionRequirement = (db: DB, data: QueryParameterSet, query: string) => {
    const insertEvolutionRequirementQuery = db.prepareQuery<[], {
        evolution_requirement_id: number;
        monster_id: number;
        evolution_id: number;
        percent_commits: string;
        percent_pull_requests_opened: number; 
        percent_issues_opened: number;
        percent_pull_request_reviews: number; 
        total_monster_age_in_minutes: number;
    }>(query);
    insertEvolutionRequirementQuery.execute(data);
    insertEvolutionRequirementQuery.finalize();
};

const seedEvolutionRequirements = (db: DB, evolutionRequirementList: Array<QueryParameterSet> ) => {
    evolutionRequirementList.forEach((evolutionRequirementData) => {
        insertEvolutionRequirement(db,evolutionRequirementData, evolutionRequirementsQueryString);
    });
};
        )
    `);
};

const seedTables = (db: DB) => {
    seedEvolutionRequirements(db, evolutionRequirementsData);
};

export const initializeDB = async () => {
    const db = await new DB("./database/commited.sqlite");
    createTables(db, queries);
    seedTables(db); 
    return db;
};
