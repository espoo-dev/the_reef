import { Fish } from '@/domain/entity'

export const mockNemo: Fish = {
  commonName: 'Clownfish',
  scientificName: 'Amphiprioninae',
  type: 'Clown',
  litersRequired: 25,
  picture: 'clown_fish.jpg',
  description:
    'Depending on species, anemonefish are overall yellow, orange, or a reddish or blackish color, and many show white bars or patches.',
  reefSafe: true,
  fishAvoid: [],
  difficulty: 'To newbies'
}
