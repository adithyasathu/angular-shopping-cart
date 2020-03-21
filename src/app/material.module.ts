import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatOptionModule,
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule, MatSortModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class MaterialModule { }
