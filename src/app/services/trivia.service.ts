import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pregunta, Respuesta } from '../interfaces/interfaces';

const apiUrl = environment.url;

@Injectable({
  providedIn: 'root'
})

export class TriviaService {

  constructor( private http: HttpClient ) { }

  /* getRespuesta() {
    return this.http.get(`https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple`);
  https://opentdb.com/api.php?amount=20&type=multiple&category=10&difficulty=easy
  }; */

  private ejecutarQuery<T>( query: string){
    query = apiUrl + '?amount=20&type=multiple&' + query;
    console.log(query);
    return this.http.get<Respuesta>(query);
  }

  getResponse(categoria: string, nivel: string){
    categoria = this.IDCategoria(categoria);

    return this.ejecutarQuery<Respuesta>(`category=${categoria}&difficulty=${nivel.toLowerCase()}`)
  }
  
  private IDCategoria( categoria: string ){
    switch(categoria){
      case "General Knowledge":
        return '9'
      case "Books":
        return '10'
      case "Film":
        return '11'
      case "Music":
        return '12'
      case "Television":
        return '14'
      case "VideoGames":
        return '15'
      case "Animals":
        return '27'
      case "Celebrities":
        return '26'
      case "History":
        return '23'
    }
  };
}
