import { Coral } from '../../src/domain/entity/Coral'

describe('Coral',() => {
  const coral: Coral = new Coral('Discosoma', ['low', 'medium'], ['weak', 'medium'], ['medium', 'deep'], 'To newbies')
  
  it('should create an coral', () => {
    expect(coral.name).toBe('Discosoma')
  })

  it('should be light weak and moderate', () => {
    expect(coral.light).toStrictEqual(['low', 'medium'])
  })
  
  it('should be flow strong', () => {
    expect(coral.flow).toStrictEqual(['weak', 'medium'])
  })
  
  it ('should be depth middle', () => {
    expect(coral.depth).toStrictEqual(['medium', 'deep'])
  })
  
  it ('should have a difficulty to newbies', () => {
    expect(coral.difficulty).toBe('To newbies')
  })
})