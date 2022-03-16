import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { Respuesta, Pregunta, Respuestas, Usuario } from '../../interfaces/interfaces';
import { AlertController, ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})

export class PreguntasComponent implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;

  inicioTimer(){
    this.timer = 0;
    setInterval( () =>{
      this.actualizarTimer();
    }, 1000);
  }

  actualizarTimer(){
    let minutos: any = this.timer / 60;
    let segundos: any = this.timer % 60;

    minutos = String('0' + Math.floor(minutos)).slice(-2);
    segundos = String('0' + Math.floor(segundos)).slice(-2);
    
    const texto = minutos + ':' + segundos;
    this.time.next(texto);

    this.timer++;
  }

  stopTimer(){
    this.timer = 0;
    this.time.next('00:00');
  }

  @ViewChild(IonSlides) slides: IonSlides;
  //leer propiedaddes del padre 
  @Input() usuario: string;
  @Input() categoria: string;
  @Input() nivel: string;

  preguntas: Pregunta[] = [];
  punteo: number = 0;
  seleccionado: boolean= true;
  listaUsuarios: Usuario[] =[];
  datoUsuario: Usuario = {};

  constructor( private triviaService: TriviaService,
               private modalCtrl: ModalController,
               private alerta: AlertController,
               private dataLocal: DataLocalService) {}

  ngOnInit() {
    //this.slides.lockSwipeToPrev(false);
    this.inicioTimer();
    this.triviaService.getResponse(this.categoria, this.nivel).
    subscribe( resp => {
      this.preguntas.push(...resp.results) 
      console.log(this.preguntas); //quitar
      
      this.preguntas.forEach(item => {
        var incorrectas = item.incorrect_answers;
        var correcta = item.correct_answer;
        incorrectas.push(correcta);
        incorrectas.sort();
 
      });
    });
  }

  slideChanged(){
    this.slides.lockSwipeToPrev(true);
    let index = this.slides.getActiveIndex();
    this.seleccionado = true;
  };

  regresar(){
    this.modalCtrl.dismiss();
  }

  datosUsuario(){
    this.datoUsuario.rating = 1,
    this.datoUsuario.player = this.usuario,
    this.datoUsuario.score = this.punteo,
    this.datoUsuario.time = this.time.value
  }

  async getOpcion(event, numero){
    this.seleccionado = false;
    var resp = this.preguntas[numero];

    if(numero === 19){
      let tiempo = this.time.value;
      //this.stopTimer();
      this.datosUsuario();
      this.dataLocal.guardarResultado(this.datoUsuario);
      let alertaFin = await this.alerta.create({
        header: 'Fin del juego',
        subHeader: 'Punteo: ' + this.punteo,
        buttons: [{
          text: 'OK',
          handler: () =>{
            this.modalCtrl.dismiss();
            console.log(tiempo);
          }
        }]
      });
      await alertaFin.present();
    } 

    if(event === resp.correct_answer){
      this.punteo++;
    } 
  }
}
