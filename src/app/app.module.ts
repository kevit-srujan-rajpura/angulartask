import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';

import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserdataComponent } from './userdata/userdata.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { AlluserdataComponent } from './alluserdata/alluserdata.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

    UserdataComponent,
    AlluserdataComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    HttpClientModule,
    PasswordModule,
    TreeSelectModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    RadioButtonModule,
    MultiSelectModule,
    InputTextareaModule,
    ReactiveFormsModule,
    PaginatorModule,
    KeyFilterModule,
    TableModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
