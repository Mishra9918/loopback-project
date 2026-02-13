import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {get} from '@loopback/rest';

export class ReportsController {
  constructor(
    @inject('datasources.roams')
    private dataSource: juggler.DataSource,
  ) { }

  @get('/getFlaggedBvziWagonIdsJson', {
    responses: {
      '200': {
        description: 'Flagged wagon ids list',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {type: 'object'},
            },
          },
        },
      },
    },
  })
  async getFlaggedBvziWagonIdsJson(): Promise<any[]> {
    const sql =
      'select * from lb1adm.get_flagged_bvzi_wagon_ids_json()';

    const result = await this.dataSource.execute(sql);

    return result[0]?.get_flagged_bvzi_wagon_ids_json || [];
  }
}
