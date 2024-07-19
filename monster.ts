export default class Monster {
    name: string;
    nickname: string | null;
    level: number;
    nextEvolution: Monster | null; // need to be able to print without instantiating monster class...
    totalEXP: number; // totalContributions 
    currentEXP: number;
    requiredEXPToLevelUp: number; // requiredContributionsForLevelUp
    evolutionRequirement: number | null;
  
  constructor(
    name: string,
    nickname: string | null,
    level: number,
    nextEvolution: Monster | null,
    totalEXP: number, 
    currentEXP: number,
    requiredEXPToLevelUp: number,
    evolutionRequirement: number | null,
  ) {
    this.name = name;
    this.nickname = nickname;
    this.level = level;
    this.nextEvolution = nextEvolution;
    this.totalEXP = totalEXP;
    this.currentEXP = currentEXP;
    this.requiredEXPToLevelUp = requiredEXPToLevelUp;
    this.evolutionRequirement = evolutionRequirement;
  };
  
  sayHello(): string {
    return `Hello, ${this.name}!`;
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