import Monster, { 
    sayHello, 
    checkForLevelUp,
    gainEXP, 
    levelUp,
    evolve,
    checkForEvolution
} from "../monster.ts";
import { assertEquals } from "$std/assert/mod.ts";

const testEvolution:Monster = { 
    name: "Supergobo", 
    nickname: null, 
    level: 1, 
    totalEXP: 0,
    currentEXP: 0,
    nextEvolution: null, 
    requiredEXPToLevelUp: 125, 
    evolutionRequirement: null 
};

const defaultMonsterProperties:Monster = {
    name:  "Goblin",
    nickname: null,
    level: 1,
    nextEvolution: testEvolution,
    totalEXP: 0,
    currentEXP: 0,
    requiredEXPToLevelUp: 100,
    evolutionRequirement: 5,
}

Deno.test("Monster class - .sayHello returns the correct greeting", () => {
    const monster:Monster = { ...defaultMonsterProperties };
    assertEquals(sayHello(monster), "Hello, Goblin!");
});

function testCheckForLevelUp() {
    Deno.test(".checkForLevelUp - When levelup requirements are met", () =>{
        const monster:Monster = {
            ...defaultMonsterProperties,
            totalEXP: 150,
            currentEXP: 150,
        };
        checkForLevelUp(monster);
        assertEquals(monster, { ...defaultMonsterProperties, level: 2, totalEXP: 150, currentEXP: 50 })
      });
    Deno.test(".checkForLevelUp - When levelup requirements are not met", () => {
        const monster:Monster = {...defaultMonsterProperties };
        checkForLevelUp(monster);
        assertEquals(monster, defaultMonsterProperties);
    });
};

Deno.test("Monster class - .gainEXP", () => {
    const monster:Monster = { ...defaultMonsterProperties };
    gainEXP(monster, 50);
    assertEquals(
        monster, {
        ...defaultMonsterProperties, 
        currentEXP: 50, 
        totalEXP: 50
    });
});

function testEvolve() {
    // TODO: This test should pass once evolve() is implemented.
    Deno.test(".evolve - When evolution requirements are met", () => {
        const monster:Monster = {
            ...defaultMonsterProperties,
            requiredEXPToLevelUp: -145,
            level: 5,
        };
        evolve(monster);
        assertEquals(monster, testEvolution);
    });
    Deno.test(".evolve - When evolution requirements are not met", () => {
        const monster:Monster = {...defaultMonsterProperties };
        evolve(monster);
        assertEquals(monster, defaultMonsterProperties);
    });
};

function testEvolutionCheck() {
    // TODO: This test should pass once evolve() is implemented.
    Deno.test(".evolutionCheck - When evolution requirements are met", () => {
        const monster:Monster = { ...defaultMonsterProperties, level: 5 };
        checkForEvolution(monster);
        assertEquals(monster, testEvolution)

    });

    Deno.test(".evolutionCheck - When evolution requirements are not met", () => {
        const monster:Monster = { ...defaultMonsterProperties };
        checkForEvolution(monster);
        assertEquals(monster, defaultMonsterProperties);
    });
};

Deno.test("Monster class - .levelUp", () => {
    const monster:Monster = { ...defaultMonsterProperties };
    levelUp(monster);
    assertEquals(monster.level, 2);
});

testCheckForLevelUp();
testEvolve();
testEvolutionCheck(); 