import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

const migration = (db: IDatabase<{}, IClient>) => ({
  up: async () => {
    await db.none(`
        CREATE TABLE customer (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          phone VARCHAR(11) NOT NULL
        )
      `);
  },
  down: async () => {
    await db.none('DROP TABLE customer');
  },
});

export default migration;
