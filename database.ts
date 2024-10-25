import { DB, QueryParameterSet } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { createMonsterTableQueryString, insertMonsterQueryString } from "./database/queries/monsters.ts"
import { createUserMonstersTableQueryString, insertUserMonsterQueryString } from "./database/queries/user_monsters.ts";

const queries = [
    createMonsterTableQueryString,
    createUserMonstersTableQueryString,
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

const monstersData = [
    {
        monster_id: 1,
        name: 'Baby Gabo',
        alive_time_in_minutes: 3,
        stage: 1,
    },
    {
        monster_id: 2,
        name: 'Gabo',
        alive_time_in_minutes: 10,
        stage: 2,    
    },
    {
        monster_id: 3,
        name: 'Super Gabo',
        alive_time_in_minutes: 25,
        stage: 3,
    }
];

const insertMonster = (db: DB, data: QueryParameterSet, query: string) => {
    const insertMonsterQuery = db.prepareQuery<[], {
        monster_id: number;
        name: string;
        alive_time_in_minutes: number;
        stage: number;
    }>(query);
    insertMonsterQuery.execute(data);
    insertMonsterQuery.finalize();
};

const seedMonsters = (db: DB, monsterList: Array<QueryParameterSet> ) => {
    monsterList.forEach((monsterData) => {
        insertMonster(db, monsterData, insertMonsterQueryString);
    });
};

const usersData = [{
    user_id: 1,
    name: "E-M-B-E-R", 
    user_monster_id: 1
}];

const userQueryString = `
  INSERT INTO users (
    user_id, 
    name,  
    user_monster_id
    ) VALUES (
      :user_id,
      :name,
      :user_monster_id
    )
`;

const insertUser = (db: DB, data: QueryParameterSet, query: string) => {
    const insertUserQuery = db.prepareQuery<[], {
        user_id: number;
        name: string;
        user_monster_id: number;
    }>(query);
    insertUserQuery.execute(data);
    insertUserQuery.finalize();
};

const seedUsers = (db: DB, userList: Array<QueryParameterSet> ) => {
    userList.forEach((userData) => {
        insertUser(db, userData, userQueryString);
    });
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

const usersMonstersData = [{
    monster_id: 1,
    nickname: "Hi", 
    current_commits: 0,
    current_pull_requests_opened:0,
    current_opened_issues: 0,
    current_pull_requests_reviews: 0,
    is_frozen: 0,
    monster_age_in_minutes: 1, 
}]

const insertUserMonster = (db: DB, data: QueryParameterSet, query: string) => {
    const insertUserMonsterQuery = db.prepareQuery<[], {
        user_monster_id: number;
        monster_id: number;
        nickname: string;
        current_commits: number;
        current_pull_requests_opened: number; 
        current_opened_issues: number;
        current_pull_requests_reviews: number; 
        is_frozen: number; 
        monster_age_in_minutes: number;
    }>(query);
    insertUserMonsterQuery.execute(data);
    insertUserMonsterQuery.finalize();
};

// These should be in a separate file from the seeding code. The seeding is really just for debugging, but inserting records in general is a feature.

const seedUsersMonsters = (db: DB, userMonsterList: Array<QueryParameterSet> ) => {
    userMonsterList.forEach((userMonsterData) => {
        insertUserMonster(db, userMonsterData, insertUserMonsterQueryString);
    });
};

const seedTables = (db: DB) => {
    seedMonsters(db, monstersData);
    seedUsersMonsters(db, usersMonstersData);
    seedUsers(db, usersData);
    seedEvolutionRequirements(db, evolutionRequirementsData);
};

export const initializeDB = async () => {
    const db = await new DB("./database/commited.sqlite");
    createTables(db, queries);
    seedTables(db); 
    return db;
};
