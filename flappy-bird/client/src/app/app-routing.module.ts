import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, QuizComponent, PathNotFoundComponent, ResultComponent } from './components';

const routes: Routes = [
    {
        path: 'home/:userToken',
        component: HomeComponent
    },
    {
        path: 'quiz',
        component: QuizComponent
    },
    {
        path: 'result',
        component: ResultComponent
    },
    {
        path: '**',
        component: PathNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
