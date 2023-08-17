import { Controller, Get, Param } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { isNumberObject } from 'util/types';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // Указываем тег 'anime' для группировки этих методов под этим тегом в документации Swagger
  @ApiTags('anime')
  // Описываем параметр 'id', который ожидается в URL, для документации
  @ApiParam({ name: 'id', description: 'ID аниме', required: false })
  @ApiParam({ name: 'name', description: 'Название аниме', required: false })
  // Описываем успешный ответ, который возвращает метод, для документации
  @ApiResponse({ status: 200, description: 'Данные аниме успешно получены' })
  // Описываем ответ в случае ошибки, для документации
  @ApiResponse({ status: 500, description: 'Введите другой ID' })
  // Обработчик GET-запроса на URL '/anime/:id/:name'
  @Get('/anime/:id/:name')
  getAnime(@Param() params: AnimeSearchParameter): Promise<any> {
    // Вызываем метод сервиса для получения данных аниме
    // Если параметр 'id' не был передан, тогда вызываем метод сервиса
    let object = Number(params.id) ? this.apiService.getAnimeId(params.id) : this.apiService.getAnimeSearch(params.name)
    return object;
  }

  // Указываем тег 'anime' для группировки этих методов под этим тегом в документации Swagger
  @ApiTags('anime')
  // Обработчик GET-запроса на URL '/animes/:limit'
  @Get('/animes/:limit')
  // Описываем параметры метода, для документации
  getAnimes(@Param('limit') limit: string): Promise<any> {
    // Вызываем метод сервиса для получения списка аниме с ограничением по количеству
    return this.apiService.getAnimes(limit);
  }
}
