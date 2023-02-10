import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorTestComponent } from './error-test/error-test.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [NavBarComponent, ErrorPageComponent, ErrorTestComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent
  ]
})
export class CoreModule { }
