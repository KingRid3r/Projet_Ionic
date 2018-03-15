import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GaleriesPage } from './galeries';

@NgModule({
  declarations: [
    GaleriesPage,
  ],
  imports: [
    IonicPageModule.forChild(GaleriesPage),
  ],
})
export class GaleriesPageModule {}
