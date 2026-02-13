import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, postgresql: {schema: 'public', table: 'users'}}})
export class Users extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    scale: 0,
    generated: false,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'bigint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: false},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 100,
    generated: false,
    postgresql: {columnName: 'name', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO', generated: false},
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 150,
    generated: false,
    index: {unique: true},
    postgresql: {columnName: 'email', dataType: 'character varying', dataLength: 150, dataPrecision: null, dataScale: null, nullable: 'NO', generated: false},
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 255,
    generated: false,
    postgresql: {columnName: 'password', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO', generated: false},
  })
  password: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 50,
    generated: false,
    postgresql: {columnName: 'role', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES', generated: false},
  })
  role?: string;

  @property({
    type: 'boolean',
    jsonSchema: {nullable: true},
    generated: false,
    postgresql: {columnName: 'is_active', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: false},
  })
  is_active?: boolean;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    postgresql: {columnName: 'created_at', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: false},
  })
  created_at?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    postgresql: {columnName: 'updated_at', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: false},
  })
  updated_at?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
