
export default interface Monster {
    name: string;
    nickname: string|null;
    level: number;
    nextEvolution: Monster|null; // need to be able to print without instantiating monster class...
    totalEXP: number; // totalContributions 
    requiredEXPToLevelUp: number; // requiredContributionsForLevelUp
    evolutionRequirement: number|null;
  };
  
  export function sayHello(m: Monster): string {
    return `Hello, ${m.name}!`;
  };

  export function resetRequiredEXPToLevelUp(m: Monster) {
    m.requiredEXPToLevelUp = 0;
  };

  export function checkForLevelUp(m: Monster) {
    if(m.requiredEXPToLevelUp <= 0) {
      levelUp(m);
    }
  };

  export function gainEXP(m: Monster, exp: number) {
    m.totalEXP += exp;
    m.requiredEXPToLevelUp += exp;
    checkForLevelUp(m);
  };

  export function evolve(m:Monster) {
    console.log("Placeholder function. Next evolution: ", m.nextEvolution);
  };

  export function checkForEvolution(m: Monster) {
    if (typeof m.evolutionRequirement === "number") {
      if(m.level >= m.evolutionRequirement) {
        evolve(m);
      }
    };
  };

  export function levelUp(m: Monster) {
    m.level++;
    resetRequiredEXPToLevelUp(m);
    checkForEvolution(m);
  };