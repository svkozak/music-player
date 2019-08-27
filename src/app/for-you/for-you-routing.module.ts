import { AuthGuard } from './../auth/auth.guard';
import { ForYouComponent } from './for-you/for-you.component';
import { ForYouRootComponent } from './for-you-root.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const forYouRoutes: Routes = [
    {
      path: 'for-you',
      component: ForYouRootComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        {
          path: '',
          component: ForYouComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(forYouRoutes)],
  exports: [RouterModule]
})
export class ForYouRoutingModule { }
