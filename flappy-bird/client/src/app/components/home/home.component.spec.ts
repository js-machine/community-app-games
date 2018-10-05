import { onGameEnd, onGetQuiz, onRetry } from 'js/main';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { reducers } from 'store/store.config';
import { State } from 'store';
import { StartGame, SaveGameResults, GetQuiz, SendResultBeforeQuiz } from 'store/quiz/quiz.action';

import { HomeComponent } from './home.component';
import { ActivatedRouteStub } from '../../spec/activated-route-stub';

describe('HomeComponent', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    let fixture: ComponentFixture<HomeComponent>;
    let store: Store<State>;
    let router: Router;
    let route: ActivatedRoute;

    const activatedRouteStub = new ActivatedRouteStub();
    const userTokenMock = 'f36e8fb2-36ec-42e4-9439-02d685373284';

    let component: HomeComponent;
    let dispatchSpy;

    beforeEach((() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ],
            imports: [
                StoreModule.forRoot(reducers)
            ]
        }).compileComponents();

        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
        store = TestBed.get(Store);

        activatedRouteStub.setParamMap({ userToken: userTokenMock });

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dispatchSpy = spyOn(store, 'dispatch');
    }));


    it('Should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should work Route Subscription', () => {
        expect(component.userToken).toBe(userTokenMock);
    });

    it('should dispatch action SaveGameResults in ngOnInit hook', () => {
        component.ngOnInit();

        expect(dispatchSpy).toHaveBeenCalledTimes(1);

        expect(dispatchSpy).toHaveBeenCalledWith(
            new StartGame(userTokenMock)
        );
    });

    it('should dispatch SaveGameResults action after onGameEnd.next()', () => {
        const scoreMock = 10;
        const questionMock = 5;
        const createdAtMock = new Date(2011, 0, 1);

        onGameEnd.next({
            score: scoreMock,
            question: questionMock,
            createdAt: createdAtMock
        });

        expect(dispatchSpy).toHaveBeenCalledWith(
            new SaveGameResults({
                userToken: userTokenMock,
                score: scoreMock,
                question: questionMock,
                createdAt: createdAtMock
            })
        );

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });

    it('should dispatch SendResultBeforeQuiz action after onRetry.next()', () => {
        onRetry.next();

        expect(dispatchSpy).toHaveBeenCalledWith(
            new SendResultBeforeQuiz(userTokenMock)
        );

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });

    it('should dispatch GetQuiz action after onGetQuiz.next()', () => {
        onGetQuiz.next();

        expect(dispatchSpy).toHaveBeenCalledWith(
            new GetQuiz(userTokenMock)
        );

        expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });

    it('should make redirect after onGetQuiz.next()', () => {
        onGetQuiz.next();

        const navArg = routerSpy.navigate.calls.first().args[0];

        expect(navArg[0]).toEqual('./quiz');
        expect(navArg[1]).toEqual(userTokenMock);
    });
});
