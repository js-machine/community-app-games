import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, QuizComponent, PathNotFoundComponent, ResultComponent } from './components';

const routes: Routes = [
    {
        path: 'home/:userToken',
        component: HomeComponent
    },
    {
        path: 'quiz/:userToken',
        component: QuizComponent
    },
    {
        path: 'result/:userToken',
        component: ResultComponent
    },
    {
        path: '**',
        component: PathNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
