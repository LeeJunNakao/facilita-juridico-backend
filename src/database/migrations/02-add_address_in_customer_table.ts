import { IDatabase } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

const migration = (db: IDatabase<{}, IClient>) => ({
  up: async () => {
    await db.none(
      'ALTER TABLE customer ADD COLUMN address INTEGER[2] NOT NULL;',
    );
  },
  down: async () => {
    await db.none('ALTER TABLE customer DROP COLUMN address;');
  },
});

export default migration;
