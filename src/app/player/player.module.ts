import { PlayerComponent } from './player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetModule } from '../widget/widget.module';



@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    WidgetModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
