import pgPromise from 'pg-promise';

export const initDb = () => {
  const pgp = pgPromise();
  const { DB, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } =
    process.env;
  const dbURI = `${DB}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  const db = pgp(dbURI);

  return db;
};
