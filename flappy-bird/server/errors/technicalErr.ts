import { technicalErrCodes } from './errCodes';

export const technicalErr = {
    differentToken: {
        code: technicalErrCodes.differentToken.code,
        msg: 'You don`t have necessary application token!'
    },
    answerService: {
        getAnswers: {
            code: technicalErrCodes.answerService.getAnswers.code,
            msg: 'Problem with Answer Service [getAnswers]'
        },
        getRightAnswers: {
            code: technicalErrCodes.answerService.getRightAnswers.code,
            msg: 'Problem with Answer Service [getRightAnswers]'
        }
    },
    gameService: {
        saveResults: {
            code: technicalErrCodes.gameService.saveResults.code,
            msg: 'Problem with Game Service [saveResults]'
        }
    },
    playerBindService: {
        noRoomToken: {
            code: technicalErrCodes.playerBindService.noRoomToken.code,
            msg: `Request body don't have 'room' property`
        },
        noPlayers: {
            code: technicalErrCodes.playerBindService.noPlayers.code,
            msg: `Request body don't have 'players' property`
        }
    },
    sendAnswerService: {
        sendAnswer: {
            code: technicalErrCodes.sendAnswerService.sendAnswer.code,
            msg: 'Problem with Send Answer Service [sendAnswer]'
        }
    },
    startGameService: {
        startGame: {
            code: technicalErrCodes.startGameService.startGame.code,
            msg: 'Problem with Start Game Service [startGame]',
        }
    },
    questionService: {
        addUserToQuestionMarkTable: {
            code: technicalErrCodes.questionService.addUserToQuestionMarkTable.code,
            msg: 'Problem with Question Service [addUserToQuestionMarkTable]'
        },
        checkQuestionMarkTableForNewUser: {
            code: technicalErrCodes.questionService.checkQuestionMarkTableForNewUser.code,
            msg: 'Problem with Question Service [checkQuestionMarkTableForNewUser]'
        },
        getQuestion: {
            code: technicalErrCodes.questionService.getQuestion.code,
            msg: 'Problem with Question Service [getQuestion]'
        },
        getQuestions: {
            code: technicalErrCodes.questionService.getQuestions.code,
            msg: 'Problem with Question Service [getQuestions]'
        },
        getQuestionId: {
            code: technicalErrCodes.questionService.getQuestionId.code,
            msg: 'Problem with Question Service [getQuestionId]'
        },
        updateQuestionMarkTable: {
            code: technicalErrCodes.questionService.updateQuestionMarkTable.code,
            msg: 'Problem with Question Service [updateQuestionMarkTable]'
        }
    },
    quizService: {
        getQuiz: {
            code: technicalErrCodes.quizService.getQuiz.code,
            msg: 'Problem with Quiz Service [getQuiz]'
        }
    },
    userService: {
        getUser: {
            code: technicalErrCodes.userService.getUser.code,
            msg: 'Problem with User Service [getUser]'
        },
        addUserToUserTable: {
            code: technicalErrCodes.userService.addUserToUserTable.code,
            msg: 'Problem with User Service [addUserToUserTable]'
        }
    },
    answerRepository: {
        getAnswers: {
            code: technicalErrCodes.answerRepository.getAnswers.code,
            msg: 'Problem with Answer Repository [getAnswers]',
        },
        getRightAnswers: {
            code: technicalErrCodes.answerRepository.getRightAnswers.code,
            msg: 'Problem with Answer Repository [getRightAnswers]',
        }
    },
    applicationTokenRepository: {
        getAppToken: {
            code: technicalErrCodes.applicationTokenRepository.getAppToken.code,
            msg: 'Problem with Application Token Repository [getAppToken]'
        }
    },
    gameRepository: {
        saveGameResults: {
            code: technicalErrCodes.gameRepository.saveGameResults.code,
            msg: 'Problem with  Game Repository [saveGameResults]'
        }
    },
    questionRepository: {
        addUserToQuestionMarkTable: {
            code: technicalErrCodes.questionRepository.addUserToQuestionMarkTable.code,
            msg: 'Problem with Question Repository [addUserToQuestionMarkTable]'
        },
        checkQuestionMarkTableForNewUser: {
            code: technicalErrCodes.questionRepository.checkQuestionMarkTableForNewUser.code,
            msg: 'Problem with Question Repository [checkQuestionMarkTableForNewUser]'
        },
        getQuestions: {
            code: technicalErrCodes.questionRepository.getQuestions.code,
            msg: 'Problem with Question Repository [getQuestions]'
        },
        getQuestion: {
            code: technicalErrCodes.questionRepository.getQuestion.code,
            msg: 'Problem with Question Repository [getQuestion]'
        },
        getQuestionId: {
            code: technicalErrCodes.questionRepository.getQuestionId.code,
            msg: 'Problem with Question Repository [getQuestionId]'
        },
        getUnansweredQuestions: {
            code: technicalErrCodes.questionRepository.getUnansweredQuestions.code,
            msg: 'Problem with Question Repository [getUnansweredQuestions]'
        },
        refreshUserAnswersQuestionMarkTable: {
            code: technicalErrCodes.questionRepository.refreshUserAnswersQuestionMarkTable.code,
            msg: 'Problem with Question Repository [refreshUserQuestionMarkTable]'
        },
        updateQuestionMarkTable: {
            code: technicalErrCodes.questionRepository.updateQuestionMarkTable.code,
            msg: 'Problem with Question Repository [updateQuestionMarkTable]'
        }
    },
    userRepository: {
        getUser: {
            code: technicalErrCodes.userRepository.getUser.code,
            msg: 'Problem with User Repository [getUser]',
        },
        addUserToUserTable: {
            code: technicalErrCodes.userRepository.addUserToUserTable.code,
            msg: 'Problem with User Repository [addUserToUserTable]',
        }
    },
    answerRepository_Implementation: {
        getAnswers: {
            code: technicalErrCodes.answerRepository_Implementation.getAnswers.code,
            msg: 'Problem with getting answers from quiz_answer table',
        },
        getRightAnswers: {
            code: technicalErrCodes.answerRepository_Implementation.getRightAnswers.code,
            msg: 'Problem with getting right answers from quiz_answer table',
        }
    },
    gameRepository_Implementation: {
        saveGameResults: {
            code: technicalErrCodes.gameRepository_Implementation.saveGameResults.code,
            msg: 'Problem with adding user session to game table',
        }
    },
    questionRepository_Implementation: {
        addUserToQuestionMarkTable: {
            code: technicalErrCodes.questionRepository_Implementation.addUserToQuestionMarkTable.code,
            msg: 'Problem with adding user to question_mark table'
        },
        checkQuestionMarkTableForNewUser: {
            code: technicalErrCodes.questionRepository_Implementation.checkQuestionMarkTableForNewUser.code,
            msg: 'Problem with checking user in question_mark table'
        },
        getQuestion: {
            code: technicalErrCodes.questionRepository_Implementation.getQuestion.code,
            msg: 'Problem with getting question from quiz_questions table'
        },
        getQuestions: {
            code: technicalErrCodes.questionRepository_Implementation.getQuestions.code,
            msg: 'Problem with getting questions from quiz_questions table'
        },
        getQuestionId: {
            code: technicalErrCodes.questionRepository_Implementation.getQuestionId.code,
            msg: 'Problem with getting questions id from quiz_questions table'
        },
        getUnansweredQuestions: {
            code: technicalErrCodes.questionRepository_Implementation.getUnansweredQuestions.code,
            msg: 'Problem with getting unanswered questions from question_mark table'
        },
        refreshUserAnswersQuestionMarkTable: {
            code: technicalErrCodes.questionRepository_Implementation.refreshUserAnswersQuestionMarkTable.code,
            msg: 'Problem with refresh question_mark table'
        },
        updateQuestionMarkTable: {
            code: technicalErrCodes.questionRepository_Implementation.updateQuestionMarkTable.code,
            msg: 'Problem with update question_mark table'
        }
    },
    userRepository_Implementation: {
        getUser: {
            code: technicalErrCodes.userRepository_Implementation.getUser.code,
            msg: 'Problem with getting user from users table',
        },
        addUserToUserTable: {
            code: technicalErrCodes.userRepository_Implementation.addUserToUserTable.code,
            msg: 'Problem with adding user to users table',
        }
    },

};
