import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DataFormComponent } from './data-form/data-form.component';

const routes: Routes = [
  { path: '', component: DataGridComponent },
  { path: 'edit/:id', component: DataFormComponent },
  { path: 'create', component: DataFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
