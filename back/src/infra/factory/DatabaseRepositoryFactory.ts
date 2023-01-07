import RepositoryFactory from 'domain/factory/RepositoryFactory'
import { AquariumRepository, IndicatorHistoricRepository, IndicatorRepository } from 'domain/repository'
import { Connection } from '../database'
import { IndicatorHistoricRepositoryDatabase, AquariumRepositoryDatabase } from '../repository/database'
import { IndicatorRepositoryDatabase } from '../repository/database/IndicatorRepositoryDatabase'

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor (readonly connection: Connection) {}
  createAquariumRepository (): AquariumRepository {
    return new AquariumRepositoryDatabase(this.connection)
  }

  createIndicatorRepository (): IndicatorRepository {
    return new IndicatorRepositoryDatabase(this.connection)
  }

  createIndicatorHistoricRepository (): IndicatorHistoricRepository {
    return new IndicatorHistoricRepositoryDatabase(this.connection)
  }
}
