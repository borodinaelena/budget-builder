import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbThemeModule,
  NbTabsetModule,
  NbLayoutModule,
  NbInputModule,
  NbCheckboxModule,
  NbToggleModule,
  NbButtonModule,
  NbTreeGridModule,
  NbToastrModule,
  NbCardModule, NbSelectModule
} from '@nebular/theme';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableComponent } from './table/table.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbTabsetModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NbToggleModule,
    NbButtonModule,
    NbTreeGridModule,
    NbCardModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    NbToastrModule.forRoot(),
    NbSelectModule,
    ClickOutsideModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
