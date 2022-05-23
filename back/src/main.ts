import { PgPromiseConnectionAdapter } from "./infra/database";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { AquariumRepositoryDatabase } from "./infra/repository/database";

const http = new ExpressAdapter();
const connection = new PgPromiseConnectionAdapter()

http.on('get', '/aquariums', async () => {
  const aquariumRepository = new AquariumRepositoryDatabase(connection);
  const output = await aquariumRepository.list();
  return output;
})

http.listen(3000)