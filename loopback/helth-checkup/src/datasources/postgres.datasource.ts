import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'roams',
  connector: 'postgresql',
  // url: 'No',
  host: '10.77.36.43',
  port: 5432,
  user: 'mayank',
  password: 'mayank@12345',
  database: 'roams'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RoamsDataSource extends juggler.DataSource
  implements LifeCycleObserver {

  // ✅ MUST match injection name
  static dataSourceName = 'roams';

  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.roams', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
