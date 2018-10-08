import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { reducers } from 'store/store.config';
import { State } from 'store';
import { Status } from 'models';
import { ActivatedRouteStub } from './activated-route-stub';

import { QuizComponent } from '../components';
import { TimerService } from '../services';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('Quiz Component', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const timerServiceSpy = jasmine.createSpyObj('TimerService', ['start', 'end']);
    let fixture: ComponentFixture<QuizComponent>;
    let router: Router;
    let route: ActivatedRoute;
    let component: QuizComponent;
    let store: Store<State>;

    const activatedRouteStub = new ActivatedRouteStub();
    const userTokenMock = 'f36e8fb2-36ec-42e4-9439-02d685373284';
    let dispatchSpy;
    let userToken: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [QuizComponent],
            providers: [
                FormBuilder,
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: TimerService, useValue: timerServiceSpy }
            ],
            imports: [
                ReactiveFormsModule,
                StoreModule.forRoot(reducers, {
                    initialState: {
                        quiz: {
                            saveGameResultsStatus: Status.Success,
                            startGameStatus: Status.Success,
                            getQuizStatus: Status.Success,
                            saveQuizAnswersStatus: Status.Init,
                            getResultStatus: Status.Init,
                            sendResultBeforeQuizStatus: Status.Init,
                            sendResultAfterQuizStatus: Status.Init,
                            quiz: [
                                { question: '2 + 2', answers: ['1', '2', '3'] }
                            ],
                            lastSessionResults: null
                        }
                    }
                })
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        router = TestBed.get(Router);
        route = TestBed.get(ActivatedRoute);
        store = TestBed.get(Store);

        activatedRouteStub.setParamMap({ userToken: userTokenMock });

        fixture = TestBed.createComponent(QuizComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dispatchSpy = spyOn(store, 'dispatch');

        activatedRouteStub.paramMap.subscribe(params => {
            userToken = params.get('userToken');
        });
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should work Route Subscription', () => {
        expect(userToken).toBe(userTokenMock);
    });

    it('should work select from store', () => {
        store.select('quiz').subscribe((quiz) => {
            console.log(quiz);
        });
    });
});
