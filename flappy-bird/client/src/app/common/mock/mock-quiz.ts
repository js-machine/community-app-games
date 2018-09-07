import { Question } from '../models/model';

export const QUESTIONS: Question[] = [
    {
        'questionId' : 1,
        'questionText' : 'First question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 1-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 1-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 1-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 1-4'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 3,
                'answerText' : 'var 1-3'
            }
        ]
    },
    {
        'questionId' : 2,
        'questionText' : `Наследование это`,
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'Свойство системы, позволяющее получать данные из другого класса	'
            },
            {
                'id' : 2,
                'answerText' : 'Свойство системы, позволяющее вызывать методы одного класса из методов другого класса'
            },
            {
                'id' : 3,
                'answerText' : 'Свойство системы, позволяющее объединить данные и методы, работающие с ними, в классе	'
            },
            {
                'id' : 4,
                // tslint:disable-next-line:max-line-length
                'answerText' : 'Свойство системы, позволяющее описать новый класс на основе уже существующего с частично или полностью заимствующейся функциональностью'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 2-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 2-3'
            }
        ]
    },
    {
        'questionId' : 3,
        'questionText' : 'Third question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 3-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 3-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 3-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 3-4'
            },
            {
                'id' : 5,
                'answerText' : 'var 3-5'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 3-2'
            },
            {
                'id' : 5,
                'answerText' : 'var 3-5'
            }
        ]
    },
    {
        'questionId' : 4,
        'questionText' : 'Fourth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 4-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 4-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 4-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 4-4'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 3,
                'answerText' : 'var 4-3'
            }
        ]
    },
    {
        'questionId' : 5,
        'questionText' : 'Fifth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 5-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 5-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 5-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 5-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 5-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 5-3'
            }
        ]
    },
    {
        'questionId' : 6,
        'questionText' : 'Sixth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 6-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 6-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 6-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 6-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 6-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 6-3'
            }
        ]
    },
    {
        'questionId' : 7,
        'questionText' : 'Seventh question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 7-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 7-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 7-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 7-4'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 3,
                'answerText' : 'var 7-3'
            }
        ]
    },
    {
        'questionId' : 8,
        'questionText' : 'Eighth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 8-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 8-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 8-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 8-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 8-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 8-3'
            }
        ]
    },
    {
        'questionId' : 9,
        'questionText' : 'Ninth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 9-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 9-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 9-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 9-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 9-2'
            },
            {
                'id' : 4,
                'answerText' : 'var 9-4'
            }
        ]
    },
    {
        'questionId' : 10,
        'questionText' : 'Tenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 10-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 10-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 10-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 10-4'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 3,
                'answerText' : 'var 10-3'
            }
        ]
    },
    {
        'questionId' : 11,
        'questionText' : 'Eleventh question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 11-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 11-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 11-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 11-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 11-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 11-3'
            }
        ]
    },
    {
        'questionId' : 12,
        'questionText' : 'Twelfth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 12-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 12-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 12-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 12-4'
            },
            {
                'id' : 5,
                'answerText' : 'var 12-5'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 12-2'
            },
            {
                'id' : 5,
                'answerText' : 'var 12-5'
            }
        ]
    },
    {
        'questionId' : 13,
        'questionText' : 'Thirteenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 13-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 13-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 13-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 13-4'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 3,
                'answerText' : 'var 13-3'
            }
        ]
    },
    {
        'questionId' : 14,
        'questionText' : 'Fourteenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 14-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 14-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 14-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 14-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 14-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 14-3'
            }
        ]
    },
    {
        'questionId' : 15,
        'questionText' : 'Fifteenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 15-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 15-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 15-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 15-4'
            },
            {
                'id' : 5,
                'answerText' : 'var 15-5'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 15-2'
            },
            {
                'id' : 5,
                'answerText' : 'var 15-5'
            }
        ]
    },
    {
        'questionId' : 16,
        'questionText' : 'Sixteenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 16-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 16-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 16-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 16-4'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 3,
                'answerText' : 'var 16-3'
            }
        ]
    },
    {
        'questionId' : 17,
        'questionText' : 'Seventeenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 17-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 17-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 17-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 17-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 17-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 17-3'
            }
        ]
    },
    {
        'questionId' : 18,
        'questionText' : 'Eighteenth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 18-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 18-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 18-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 18-4'
            },
            {
                'id' : 5,
                'answerText' : 'var 18-5'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 18-2'
            },
            {
                'id' : 5,
                'answerText' : 'var 18-5'
            }
        ]
    },
    {
        'questionId' : 19,
        'questionText' : 'First question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 19-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 19-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 19-3'
            }
        ],
        'questionType': 'one',
        'questionValue': 3,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 19-2'
            }
        ]
    },
    {
        'questionId' : 20,
        'questionText' : 'Twentieth question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 20-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 20-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 20-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 20-4'
            }
        ],
        'questionType': 'many',
        'questionValue': 5,
        'rightAnswers' : [
            {
                'id' : 1,
                'answerText' : 'var 20-1'
            },
            {
                'id' : 3,
                'answerText' : 'var 20-3'
            }
        ]
    },
    {
        'questionId' : 21,
        'questionText' : 'Twenty first question',
        'answers' : [
            {
                'id' : 1,
                'answerText' : 'var 21-1'
            },
            {
                'id' : 2,
                'answerText' : 'var 21-2'
            },
            {
                'id' : 3,
                'answerText' : 'var 21-3'
            },
            {
                'id' : 4,
                'answerText' : 'var 21-4'
            },
            {
                'id' : 5,
                'answerText' : 'var 21-5'
            }
        ],
        'questionType': 'many',
        'questionValue': 4,
        'rightAnswers' : [
            {
                'id' : 2,
                'answerText' : 'var 21-2'
            },
            {
                'id' : 5,
                'answerText' : 'var 21-5'
            }
        ]
    }
];
