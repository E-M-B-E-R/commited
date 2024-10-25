const createMonsterTableQueryString = `
CREATE TABLE IF NOT EXISTS monsters (
    monster_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT NOT NULL,
    alive_time_in_minutes INTEGER NOT NULL,
    stage TEXT NOT NULL
)
`;

const insertMonsterQueryString = `  
INSERT INTO monsters (
    monster_id, 
    name, 
    alive_time_in_minutes, 
    stage
    ) VALUES (
      :monster_id,
      :name,
      :alive_time_in_minutes,
      :stage
    )
`;

export { createMonsterTableQueryString, insertMonsterQueryString };