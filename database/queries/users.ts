const createUsersTableQueryString = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            user_monster_id INTEGER,
            FOREIGN KEY (user_monster_id) REFERENCES user_monsters(user_monster_id)
    )
`;

const insertUsersQueryString = `
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

export { createUsersTableQueryString, insertUsersQueryString };