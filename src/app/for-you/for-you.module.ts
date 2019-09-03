import { BrowseModule } from './../browse/browse.module';
import { WidgetModule } from './../widget/widget.module';
import { ForYouRoutingModule } from './for-you-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForYouComponent } from './for-you/for-you.component';
import { ForYouRootComponent } from './for-you-root.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ForYouComponent,
    ForYouRootComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    BrowseModule,
    // NgbModule,
    ForYouRoutingModule
  ]
})
export class ForYouModule { }
