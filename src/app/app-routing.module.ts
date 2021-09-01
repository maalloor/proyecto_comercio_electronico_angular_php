import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './product/add/add.component';
import { EditComponent } from './product/edit/edit.component';
import { IndexComponent } from './product/index/index.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add'},
  { path: 'add', component: AddComponent },
  { path: 'index', component: IndexComponent },
  { path: 'edit/:id', component: EditComponent } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
