import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const state = process.env.NODE_ENV?.trim();
  return createConnection(
    Object.assign(defaultOptions, {
      database: state === 'test'
        ? './src/database/database.test.sqlite'
        : defaultOptions.database,
    }),
  );
};
