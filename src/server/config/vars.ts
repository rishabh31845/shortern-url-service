export const vars = {
  port: process.env.PORT || 3001,
  appVersion: process.env.APP_VERSION || 'v1',
  dbUserName: process.env.DB_USERNAME,
  certKey: process.env.CERT_KEY || '',
  certFile: process.env.CERT_FILE || '',
  baseUrl: process.env.BASE_URL || '',
  logLevel: process.env.LOG_LEVEL || 'info',
  stage: process.env.STAGE || 'dev',
  requestIdHeader: 'x-request-id',
  queryRunnerType: process.env.QUERY_RUNNER_TYPE || 'postgres',
  dbSync: process.env.DB_SYNCHRONIZE === 'true'
};
