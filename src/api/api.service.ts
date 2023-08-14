import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private readonly apiService: HttpService) {}

  // Метод для получения данных конкретного аниме по его ID
  async getAnime(id: string): Promise<any> {
    try {
      // Выполняем GET-запрос к внешнему API с использованием HttpService
      let ReqAnime = lastValueFrom(
         this.apiService.get(`https://shikimori.me/api/animes/${id}`),
      );
      // Возвращаем данные аниме из успешного ответа
      return (await ReqAnime).data;
    } catch (error) {
      // Возвращаем сообщение об ошибке, если аниме не найдено
      return 'Анимe не найден';
    }
  }

  // Метод для получения списка аниме с ограничением по количеству
  async getAnimes(limit: string): Promise<any> {
    // Выполняем GET-запрос к внешнему API с использованием HttpService
    let ReqAnime = lastValueFrom(
       this.apiService.get(`https://shikimori.me/api/animes/`, {
        params: {
          limit: limit,
        },
      }),
    );
    // Возвращаем список аниме из успешного ответа
    return (await ReqAnime).data;
  }
}