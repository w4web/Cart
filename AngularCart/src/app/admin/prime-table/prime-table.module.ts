import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeTableComponent } from './prime-table.component';

const routes: Routes = [
  { path: '', component: PrimeTableComponent }
];

@NgModule({
  declarations: [
    PrimeTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})

export class PrimeTableModule { }
