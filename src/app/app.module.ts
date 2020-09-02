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
  NbCardModule
} from '@nebular/theme';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent
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
    NbToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
