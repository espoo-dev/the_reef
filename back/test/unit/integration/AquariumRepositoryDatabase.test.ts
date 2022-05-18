import Aquarium from "../../../src/domain/entity/Aquarium";
import AquariumRepository from "../../../src/domain/repository/AquariumRepository";
import Connection from "../../../src/infra/database/Connection";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import AquariumRepositoryDatabase from "../../../src/infra/repository/database/AquariumRepositoryDatabase";

let connection: Connection;
let aquariumRepository: AquariumRepository;

beforeEach(() => {
  connection = new PgPromiseConnectionAdapter();
  aquariumRepository = new AquariumRepositoryDatabase(connection);
})

describe('AquariumRepositoryDatabase', () => {
  it.skip('should add a new aquarium in database', async () => {
    const aquarium = new Aquarium(1, 'Iury Reef');
    aquariumRepository.save(aquarium);
    expect(aquariumRepository.list()).resolves.toHaveLength(1);
  });

  it('should return all aquariums from database', async () => {
    const aquariums = await aquariumRepository.list();
    expect(aquariums).toHaveLength(1);
  });

  it.skip('should remove aquarium by id from database', async () => {
    await aquariumRepository.remove(1);
    expect(await aquariumRepository.list()).toHaveLength(1);
  });

  it('should return a aquarium by index', async () => {
    const aquariumFounded = await aquariumRepository.get(2);
    expect(aquariumFounded.name).toBe('Iury Reef');
  });
});

afterEach(async () => {
  await connection.close();
})
