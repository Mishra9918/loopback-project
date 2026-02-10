import {
  repository,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Todo} from '../models/todo.model';
import {TodoRepository} from '../repositories/todo.repository';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) { }

  @post('/todos')
  @response(200, {
    description: 'Todo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {exclude: ['id']}),
        },
      },
    })
    todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  @get('/todos')
  @response(200, {
    description: 'Array of Todo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todo),
        },
      },
    },
  })
  async find(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  @get('/todos/{id}')
  @response(200, {
    description: 'Todo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async findById(@param.path.number('id') id: number): Promise<Todo> {
    return this.todoRepository.findById(id);
  }

  @patch('/todos/{id}')
  @response(204, {
    description: 'Todo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() todo: Partial<Todo>,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @put('/todos/{id}')
  @response(204, {
    description: 'Todo PUT success',
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() todo: Todo): Promise<void> {
    await this.todoRepository.replaceById(id, todo);
  }

  @del('/todos/{id}')
  @response(204, {
    description: 'Todo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}
