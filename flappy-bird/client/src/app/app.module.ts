import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TodoEffects, TodosService } from 'store/todo';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { reducers } from '../store/store.config';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([
      TodoEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    TodosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
