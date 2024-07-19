export interface MonsterConfig {
  name: string;
  nickname: string | null;
  level: number;
  nextEvolution: Monster | null; // need to be able to print without instantiating monster class...
  totalEXP: number; // totalContributions 
  currentEXP: number;
  requiredEXPToLevelUp: number; // requiredContributionsForLevelUp
  evolutionRequirement: number | null;
}

export default class Monster {
    name: string;
    nickname: string | null;
    level: number;
    nextEvolution: Monster | null; // need to be able to print without instantiating monster class...
    totalEXP: number; // totalContributions 
    currentEXP: number;
    requiredEXPToLevelUp: number; // requiredContributionsForLevelUp
    evolutionRequirement: number | null;
  
  constructor( config: MonsterConfig ) {
    this.name = config.name;
    this.nickname = config.nickname;
    this.level = config.level;
    this.nextEvolution = config.nextEvolution;
    this.totalEXP = config.totalEXP;
    this.currentEXP = config.currentEXP;
    this.requiredEXPToLevelUp = config.requiredEXPToLevelUp;
    this.evolutionRequirement = config.evolutionRequirement;
  };
  
  sayHello(): string {
    return `Hello, ${this.name}!`;
  };

  getCurrentInfo() {
   return {
    name: this.name,
    nickname: this.nickname,
    level: this.level,
    nextEvolution: this.nextEvolution,
    totalEXP: this.totalEXP,
    currentEXP:this.currentEXP,
    requiredEXPToLevelUp: this.requiredEXPToLevelUp,
    evolutionRequirement: this.evolutionRequirement,
   }
  };

  private checkForLevelUp() {
    if(this.currentEXP >= this.requiredEXPToLevelUp) {
      this.levelUp();
    };
  };

  gainEXP(exp: number) {
    this.totalEXP += exp;
    this.currentEXP += exp;
    this.checkForLevelUp();
  };

  private evolve() {
    if (this.nextEvolution) {
      Object.assign(this, this.nextEvolution);
    };
  };

  private checkForEvolution() {
    if (typeof this.evolutionRequirement === "number" && this.nextEvolution) {
      if(this.level >= this.evolutionRequirement) {
        this.evolve();
      };
    };
  };

  private levelUp() {
    this.level++;
    this.currentEXP = this.currentEXP - this.requiredEXPToLevelUp;
    this.checkForEvolution();
  };
};