import { DB, QueryParameterSet } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { createMonsterTableQueryString, insertMonsterQueryString } from "./database/queries/monsters.ts"
import { createUserMonstersTableQueryString, insertUserMonsterQueryString } from "./database/queries/userMonsters.ts";
import { createUsersTableQueryString, insertUsersQueryString } from "./database/queries/users.ts";
import { createEvolutionRequirementsTableQueryString, insertEvolutionRequirementQuery } from "./database/queries/evolutionRequirements.ts";
import { 
    evolutionRequirementsData,
    monstersData,
    usersData,
    usersMonstersData,
} from "./database/seeders/index.ts";
const queries = [
    createMonsterTableQueryString,
    createUserMonstersTableQueryString,
    createUsersTableQueryString,
    createEvolutionRequirementsTableQueryString,
];

const createTables = (db: DB, queries : Array<string>) => {
    queries.forEach((query) => {
        db.query(query);
    });
};

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
        insertUser(db, userData, insertUsersQueryString);
    });
};

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
        insertEvolutionRequirement(db,evolutionRequirementData, insertEvolutionRequirementQuery);
    });
};

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
