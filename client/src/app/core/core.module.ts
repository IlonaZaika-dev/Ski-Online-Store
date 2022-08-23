import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorTestComponent } from './error-test/error-test.component';



@NgModule({
  declarations: [NavBarComponent, ErrorPageComponent, ErrorTestComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
