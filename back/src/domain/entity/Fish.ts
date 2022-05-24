type Difficulties =
  | 'To newbies'
  | 'Need more careful'
  | 'Only experients aquarists'

export class Fish {
  commonName: string;
  scientificName: string;
  type: string;
  litersRequired: number;
  picture: string;
  description: string;
  reefSafe: boolean;
  fishAvoid: Fish[];
  difficulty: Difficulties;

  constructor (
    commonName: string,
    scientificName: string,
    type: string,
    litersRequired: number,
    picture: string,
    description: string,
    reefSafe: boolean,
    fishAvoid: Fish[],
    difficulty: Difficulties
  ) {
    this.commonName = commonName
    this.scientificName = scientificName
    this.type = type
    this.litersRequired = litersRequired
    this.picture = picture
    this.description = description
    this.reefSafe = reefSafe
    this.fishAvoid = fishAvoid
    this.difficulty = difficulty
  }
}
