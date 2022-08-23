import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorTestComponent } from './core/error-test/error-test.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error-test', component: ErrorTestComponent },
  { path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule) },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
