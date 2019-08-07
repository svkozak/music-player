import { WidgetModule } from './../widget/widget.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRootComponent } from './library-root.component';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryRootComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
