import Monster, { MonsterConfig } from "../monster.ts";
import { assertEquals } from "$std/assert/mod.ts";

const testEvolution:MonsterConfig = { 
    name: "Supergobo", 
    nickname: null, 
    level: 1, 
    totalEXP: 0,
    currentEXP: 0,
    nextEvolution: null, 
    requiredEXPToLevelUp: 125, 
    evolutionRequirement: null 
};

const defaultMonsterProperties:MonsterConfig = {
    name:  "Goblin",
    nickname: null,
    level: 1,
    nextEvolution: new Monster(testEvolution),
    totalEXP: 0,
    currentEXP: 0,
    requiredEXPToLevelUp: 100,
    evolutionRequirement: 5,
}

Deno.test("Monster class - .sayHello returns the correct greeting", () => {
    const monster = new Monster({ ...defaultMonsterProperties });
    assertEquals(monster.sayHello(), "Hello, Goblin!");
});

Deno.test("Monster class - .gainEXP", () => {
    const monster = new Monster({ ...defaultMonsterProperties });
    const expectedMonsterConfig:MonsterConfig = {
        ...defaultMonsterProperties,
        currentEXP: 50,
        totalEXP: 50,
    }
    monster.gainEXP(50);
    assertEquals(monster.getCurrentInfo(), expectedMonsterConfig);
});
