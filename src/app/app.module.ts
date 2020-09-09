import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmailCheckValidators } from './common/email-check.validators';
import { HttpService } from './services/http.service';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component'

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmailCheckValidators,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
