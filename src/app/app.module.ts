// Este archivo queda solo para imports manuales de módulos si los necesitas en el futuro.
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BackupComponent } from './backup/backup.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }
