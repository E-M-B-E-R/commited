const createUserMonstersTableQueryString = `
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
`;

const insertUserMonsterQueryString = `
INSERT INTO user_monsters (
    user_monster_id, 
    monster_id, 
    nickname, 
    current_commits, 
    current_pull_requests_opened, 
    current_opened_issues, 
    current_pull_requests_reviews, 
    is_frozen, 
    monster_age_in_minutes 
  ) VALUES (
    :user_monster_id, 
    :monster_id, 
    :nickname, 
    :current_commits, 
    :current_pull_requests_opened, 
    :current_opened_issues, 
    :current_pull_requests_reviews, 
    :is_frozen, 
    :monster_age_in_minutes 
   )
`;

export { createUserMonstersTableQueryString, insertUserMonsterQueryString };