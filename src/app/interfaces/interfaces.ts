export interface Respuesta {
  response_code: number;
  results: Pregunta[];
}

export interface Pregunta {
  category?: string;
  type?: string;
  difficulty?: string;
  question?: string;
  correct_answer?: string;
  incorrect_answers?: string[];
}

export interface Usuario{
    rating?: number,
    player?: string,
    score?: number
    time?: string
} 

export interface Respuestas{
    ID?: number,
    incorrectA?: string[],
    correctA?: string
}