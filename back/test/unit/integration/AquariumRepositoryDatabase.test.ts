import Aquarium from "../../../src/domain/entity/Aquarium";
import AquariumRepository from "../../../src/domain/repository/AquariumRepository";
import Connection from "../../../src/infra/database/Connection";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import AquariumRepositoryDatabase from "../../../src/infra/repository/database/AquariumRepositoryDatabase";

let connection: Connection;
let aquariumRepository: AquariumRepository;

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter();
  aquariumRepository = new AquariumRepositoryDatabase(connection);
  await aquariumRepository.clean();
})

const saveAquarium = async (name: string) => {
  const aquarium = new Aquarium(1, name);
  await aquariumRepository.save(aquarium);
}

describe('AquariumRepositoryDatabase', () => {
  it('should add a new aquarium in database', async () => {
    await saveAquarium('Iury Reef');
    expect(aquariumRepository.list()).resolves.toHaveLength(1);
  });

  it('should return all aquariums from database', async () => {
    await saveAquarium('Iury Reef');
    const aquariums = await aquariumRepository.list();
    expect(aquariums).toHaveLength(1);
  });

  it('should remove aquarium by id from database', async () => {
    await saveAquarium('Iury Reef');
    const aquariums = await aquariumRepository.list();
    aquariumRepository.remove(aquariums[0].id)
    expect(await aquariumRepository.list()).toHaveLength(0);
  });

  it('should return a aquarium by index', async () => {
    await saveAquarium('Iury Reef');
    const aquariums = await aquariumRepository.list();
    const aquariumFounded = await aquariumRepository.get(aquariums[0].id);
    expect(aquariumFounded.name).toBe('Iury Reef');
  });
});

afterEach(async () => {
  await connection.close();
})
