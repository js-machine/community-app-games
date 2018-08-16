let quizQuestions = require('./../mock-data/mock-data-questions.json');
let questQuestions = require('./../mock-data/mock-quest-tasks');

exports.getQuiz = function() {
    return quizQuestions;
};

exports.getQuest = function() {
    return questQuestions;
};
