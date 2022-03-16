import { Component, OnInit, ViewChild } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { Respuesta, Usuario } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { PreguntasComponent } from '../components/preguntas/preguntas.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  public categorias = ['General Knowledge', 'Books', 'Film', 'Music', 'Television', 'VideoGames', 'Animals', 'Celebrities', 'History']
  public niveles = ['Easy', 'Medium', 'Hard'];
  
  infoUsuario ={
    usuario: '',
    categoria: '',
    nivel: ''
  }

  constructor( private triviaService: TriviaService,
               private modalCtrl: ModalController) {}

  ngOnInit(){ }

  onSelect( categoria: any){
    this.infoUsuario.categoria = categoria;
    //console.log(categoria);
  }

  levelSelect( level: any){
    this.infoUsuario.nivel = level;
    //console.log(level);
  }

  async btnStart(){
    if(this.infoUsuario.categoria === ''){
      this.infoUsuario.categoria = this.categorias[2]; 
    }
    if(this.infoUsuario.nivel === ''){
      this.infoUsuario.nivel = this.niveles[0];
    }
    //let info = {usuario: this.infoUsuario.usuario, categoria: this.infoUsuario.categoria, nivel: this.infoUsuario.nivel};
    
/*  this.triviaService.getResponse(this.infoUsuario.categoria, this.infoUsuario.nivel).
    subscribe((resp: Respuesta) => {
      console.log('preguntas', resp.results);
    });
 */ 
    const modal = await this.modalCtrl.create({
      component: PreguntasComponent, //componente que se va a mostrar
      componentProps:{
        usuario: this.infoUsuario.usuario,
        categoria: this.infoUsuario.categoria,
        nivel: this.infoUsuario.nivel
      }
    });

    await modal.present();
    //console.log(info);
  }

} 
