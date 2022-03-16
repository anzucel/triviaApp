import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasComponent } from './preguntas/preguntas.component';

//import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
 
@NgModule({      
  declarations: [PreguntasComponent],
  imports: [
    CommonModule,
    IonicModule
  ], 
  exports:[ 
    PreguntasComponent
  ]
})
export class ComponentsModule { }
