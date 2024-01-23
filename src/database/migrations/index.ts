import { program } from 'commander';
import clc from 'cli-color';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { initDb } from '..';
import { IDatabase, ITask } from 'pg-promise';
import { IClient } from 'pg-promise/typescript/pg-subset';

dotenv.config();

program
  .option('-u, --up', 'Run migrations')
  .option('-d, --down', 'Run back migrations')
  .parse(process.argv);

program.parse(process.argv);

const getMigrations = async (db: IDatabase<{}, IClient>) => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS migration (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE
    )`);

  const migrations = await db.any('SELECT name FROM migration;');

  return migrations;
};

const registerMigration = async (db: ITask<{}>, migration: string) => {
  await db.none(`INSERT INTO migration(name) VALUES('${migration}');`);
};

const removeMigration = async (db: ITask<{}>, migration: string) => {
  await db.none(`DELETE FROM migration WHERE name = '${migration}';`);
};

const runMigrations = async (options: { up?: boolean; down?: boolean }) => {
  const db = initDb();
  const migrationFiles = fs.readdirSync(__dirname);
  const sortedMigrationFiles = migrationFiles
    .filter((file) => file !== 'index.ts')
    .sort();

  const migrations = await getMigrations(db);

  if (options.down) {
    sortedMigrationFiles.reverse();
  }

  try {
    await db.tx(async (t) => {
      const promises = sortedMigrationFiles.map(async (file) => {
        const migrationPath = path.join(__dirname, file);
        const migrationModule = require(migrationPath);

        const fileAlreadyMigrated = migrations.find(
          ({ name }) => name === file,
        );

        if (options.up) {
          if (!fileAlreadyMigrated) {
            await migrationModule.default(t).up();
            await registerMigration(t, file);
            console.log(
              clc.greenBright(`MIGRATION: ${file} executed successfully`),
            );
          }
        } else {
          if (fileAlreadyMigrated) {
            await migrationModule.default(t).down();
            removeMigration(t, file);
            console.log(
              clc.redBright(`MIGRATION: ${file} reverted successfully`),
            );
          }
        }
      });

      return t.batch(promises);
    });
  } catch (error) {
    console.error('Error executing migrations:', error);
  } finally {
    db.$pool.end();
  }
};

runMigrations(program.opts());
