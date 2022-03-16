import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  topUsuarios: Usuario[] = [];

  constructor(private storage: Storage) {
    this.initDB();
    this.cargarUsuarios();
   }

  private _storage: Storage | null = null;

  async initDB(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarResultado(usuario: Usuario){

    this.topUsuarios.push(usuario);
    
    var ordenado = this.topUsuarios.sort(function(a,b){return b.score -a.score})
                                   .sort((a,b)=> a.time < b.time ? -1:1);

    this.storage.set('Usuarios', ordenado);
    console.log(ordenado);
  }

  async cargarUsuarios(){
    const usuarios = await this.storage.get('Usuarios');
    this.topUsuarios = usuarios || [];
    return this.topUsuarios;
  }
}
