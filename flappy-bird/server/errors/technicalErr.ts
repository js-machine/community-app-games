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
        },
        getLastGame: {
            code: technicalErrCodes.gameService.getLastGame.code,
            msg: 'Problem with Game Service [getLastGame]'
        },
        updateGameSession: {
            code: technicalErrCodes.gameService.updateGameSession.code,
            msg: 'Problem with Game Service [updateGameSession]'
        }
    },
    getResultService: {
        getResult: {
            code: technicalErrCodes.getResultService.getResult.code,
            msg: 'Problem with Get Result Service [getResult]'
        },
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
    sendResultService: {
        sendResult: {
            code: technicalErrCodes.sendResultService.sendResult.code,
            msg: 'Problem with Send Result Service [sendResult]'
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
        markCorrectAnswer: {
            code: technicalErrCodes.questionService.markCorrectAnswer.code,
            msg: 'Problem with Question Service [markCorrectAnswer]'
        },
        getUserRightAnswers: {
            code: technicalErrCodes.questionService.getUserRightAnswers.code,
            msg: 'Problem with Question Service [getUserRightAnswers]'
        },
        getQuestionById: {
            code: technicalErrCodes.questionService.getQuestionById.code,
            msg: 'Problem with Question Service [getQuestionById]'
        },
        getSizeOfQuiz: {
            code: technicalErrCodes.questionService.getSizeOfQuiz.code,
            msg: 'Problem with Question Service [getSizeOfQuiz]'
        },
        refreshSession: {
            code: technicalErrCodes.questionService.refreshSession.code,
            msg: 'Problem with Question Service [refreshSession]'
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
        },
        getLastGame: {
            code: technicalErrCodes.gameRepository.getLastGame.code,
            msg: 'Problem with  Game Repository [getLastGame]'
        },
        updateGameSession: {
            code: technicalErrCodes.gameRepository.updateGameSession.code,
            msg: 'Problem with  Game Repository [updateGameSession]'
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
        markCorrectAnswer: {
            code: technicalErrCodes.questionRepository.markCorrectAnswer.code,
            msg: 'Problem with Question Repository [updateQuestionMarkTable]'
        },
        getUserRightAnswers: {
            code: technicalErrCodes.questionRepository.getUserRightAnswers.code,
            msg: 'Problem with Question Repository [getUserRightAnswers]'
        },
        getQuestionById: {
            code: technicalErrCodes.questionRepository.getQuestionById.code,
            msg: 'Problem with Question Repository [getQuestionById]'
        },
        getSizeOfQuiz: {
            code: technicalErrCodes.questionRepository.getSizeOfQuiz.code,
            msg: 'Problem with Question Repository [getSizeOfQuiz]'
        },
        refreshSession: {
            code: technicalErrCodes.questionRepository.refreshSession.code,
            msg: 'Problem with Question Repository [refreshSession]'
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
        },
        getLastGame: {
            code: technicalErrCodes.gameRepository_Implementation.getLastGame.code,
            msg: 'Problem with getting last user session from game table',
        },
        updateGameSession: {
            code: technicalErrCodes.gameRepository_Implementation.updateGameSession.code,
            msg: 'Problem with updating last user session in game table',
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
        },
        getUserRightAnswers: {
            code: technicalErrCodes.questionRepository_Implementation.getUserRightAnswers.code,
            msg: 'Problem with getting my right answers from question_mark table'
        },
        getQuestionById: {
            code: technicalErrCodes.questionRepository_Implementation.getQuestionById.code,
            msg: 'Problem with getting question by id from quiz_questions table'
        },
        getSizeOfQuiz: {
            code: technicalErrCodes.questionRepository_Implementation.getSizeOfQuiz.code,
            msg: 'Problem with getting size of quiz from quiz_questions table'
        },
        refreshSession: {
            code: technicalErrCodes.questionRepository_Implementation.refreshSession.code,
            msg: 'Problem with updating user session in question_mark table'
        },
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
