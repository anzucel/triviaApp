import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Usuario } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  sliderOpts ={
     allowSlidePrev: false,
     allowSlideNext: false
  };

  jugadores: Usuario[] = [];

  constructor(public dataLocalService: DataLocalService) {}

  async ngOnInit(){
    this.jugadores = await this.dataLocalService.cargarUsuarios();
  }
}
