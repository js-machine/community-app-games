module.exports = [
    {
        'categoryId': 1,
        'categoryDifficulty': 1,
        'tasks': [
            {
                'taskId': 1,
                'taskQuestion': 'Write the body of the function which takes string and transforms it to uppercase or lowercase depending on the value of second parameter' +
                ' which can be "upper" or "lower" (e.g. "abc", "upper" => "ABC"; "XYZ", "lower" => "xyz"):',
                'taskHeader': 's = function(str, letSize) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 1,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 'abc',
                        'param2': 'upper',
                        'paramResult': 'ABC'
                    },
                    {
                        'testId': 2,
                        'param1': 'XYZ',
                        'param2': 'lower',
                        'paramResult': 'xyz'
                    }
                ]

            },
            {
                'taskId': 2,
                'taskQuestion': 'Write the body of the function which takes string and reverses it (e.g. "abc" => "cba"):',
                'taskHeader': 's = function(str) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskPoints': 0,
                'taskDifficulty': 1,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 'abc',
                        'paramResult': 'cba'
                    },
                    {
                        'testId': 2,
                        'param1': 'xyz',
                        'paramResult': 'zyx'
                    }
                ]
            },
            {
                'taskId': 3,
                'taskQuestion': 'Write the body of the function which takes number and outputs last digit of that number (e.g. 123 => 3):',
                'taskHeader': 's = function(num) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 1,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 123,
                        'paramResult': 3
                    },
                    {
                        'testId': 2,
                        'param1': 1222,
                        'paramResult': 2
                    },
                    {
                        'testId': 3,
                        'param1': 345346,
                        'paramResult': 6
                    }

                ]
            },
            {
                'taskId': 4,
                'taskQuestion': 'Write the body of the function which concatenates two numbers (e.g. 1 + 1 => 11; 12 + 12 => 1212):',
                'taskHeader': 's = function(num1, num2) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 1,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 11
                    },
                    {
                        'testId': 2,
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 22
                    },
                    {
                        'testId': 3,
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 77
                    }
                ]
            },
        ]
    },
    {
        'categoryId': 2,
        'categoryDifficulty': 2,
        'tasks': [
            {
                'taskId': 1,
                'taskQuestion': 'Write the body of the function which takes an array of numbers, multiplies each item by 2 and returns new array (e.g. [1, 2, 3] => [2, 4, 6]):',
                'taskHeader': 's = function(arr) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 2,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': [1, 2, 3],
                        'paramResult': [2, 4, 6]
                    },
                    {
                        'testId': 2,
                        'param1': [2, 2, 2],
                        'paramResult': [4, 4, 4]
                    },
                    {
                        'testId': 3,
                        'param1': [1, 3, 4],
                        'paramResult': [2, 6, 8]
                    }
                ]
            },
            {
                'taskId': 2,
                'taskQuestion': 'Write the body of the function which takes several parameters and outputs last one value (e.g. "abc", "123", "xyz" => "xyz" ):',
                'taskHeader': 's = function() {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskPoints': 0,
                'taskDifficulty': 2,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 1,
                        'param2': 2,
                        'paramResult': 2
                    },
                    {
                        'testId': 2,
                        'param1': 'xyz',
                        'param2': 'abc',
                        'paramResult': 'abc'
                    },
                    {
                        'testId': 3,
                        'param1': 7,
                        'param2': 'xyz',
                        'paramResult': 'xyz'
                    }
                ]
            },
            {
                'taskId': 3,
                'taskQuestion': 'Write the body of the function which takes an array of chars and finds how many times last item occures (e.g. ["a", "b", "a", "c", "a"] => 3):',
                'taskHeader': 's = function(arr) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 2,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': ['a', 'b', 'a', 'c', 'a'],
                        'paramResult': 3
                    },
                    {
                        'testId': 2,
                        'param1': ['a', 'b', 'a', 'c'],
                        'paramResult': 1
                    },
                    {
                        'testId': 3,
                        'param1': ['a', 'b', 'a'],
                        'paramResult': 2
                    }
                ]
            },

        ]
    },
    {
        'categoryId': 3,
        'categoryDifficulty': 3,
        'tasks': [
            {
                'taskId': 1,
                'taskQuestion': 'Write the body of the function which takes an array of numbers and returns sum of all items (e.g [1, 2, 3] => 6):',
                'taskHeader': 's = function(arr) {',
                'taskFooter': '}',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 3,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': [1, 2, 3],
                        'paramResult': 6
                    },
                    {
                        'testId': 2,
                        'param1': [1, 1, 1],
                        'paramResult': 3
                    },
                    {
                        'testId': 3,
                        'param1': [5, 3, 4],
                        'paramResult': 12
                    }
                ]
            },
            {
                'taskId': 2,
                'taskQuestion': 'text of task two category 3',
                'taskHeader': 'header of task two category 3',
                'taskFooter': 'footer of task two category 3',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 3,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'testId': 2,
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'testId': 3,
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 3,
                'taskQuestion': 'text of task three category 3',
                'taskHeader': 'header of task three category 3',
                'taskFooter': 'footer of task three category 3',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskPoints': 0,
                'taskDifficulty': 3,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'testId': 2,
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'testId': 3,
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 4,
                'taskQuestion': 'text of task four category 3',
                'taskHeader': 'header of task four category 3',
                'taskFooter': 'footer of task four category 3',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 3,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'testId': 2,
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'testId': 3,
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 5,
                'taskQuestion': 'text of task five category 3',
                'taskHeader': 'header of task five category 3',
                'taskFooter': 'footer of task five category 3',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 3,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'testId': 1,
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'testId': 2,
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'testId': 3,
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            }
        ]
    },
    {
        'categoryId': 4,
        'categoryDifficulty': 4,
        'tasks': [
            {
                'taskId': 1,
                'taskQuestion': 'text of task one category 4',
                'taskHeader': 'header of task one category 4',
                'taskFooter': 'footer of task one category 4',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 4,
                'taskSpentTime': 0,
                'taskPoints': 0,
                'taskTests': [
                    {
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 2,
                'taskQuestion': 'text of task two category 4',
                'taskHeader': 'header of task two category 4',
                'taskFooter': 'footer of task two category 4',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 4,
                'taskPoints': 0,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 3,
                'taskQuestion': 'text of task three category 4',
                'taskHeader': 'header of task three category 4',
                'taskFooter': 'footer of task three category 4',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 4,
                'taskPoints': 0,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            }
        ]
    },
    {
        'categoryId': 5,
        'categoryDifficulty': 5,
        'tasks': [
            {
                'taskId': 1,
                'taskQuestion': 'text of task one category 5',
                'taskHeader': 'header of task one category 5',
                'taskFooter': 'footer of task one category 5',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 5,
                'taskPoints': 0,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 2,
                'taskQuestion': 'text of task two category 5',
                'taskHeader': 'header of task two category 5',
                'taskFooter': 'footer of task two category 5',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 5,
                'taskPoints': 0,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            },
            {
                'taskId': 3,
                'taskQuestion': 'text of task three category 5',
                'taskHeader': 'header of task three category 5',
                'taskFooter': 'footer of task three category 5',
                'userInput': ' ',
                'isItRight': 0,
                'isItDone': 0,
                'taskDifficulty': 5,
                'taskPoints': 0,
                'taskSpentTime': 0,
                'taskTests': [
                    {
                        'param1': 1,
                        'param2': 1,
                        'paramResult': 2
                    },
                    {
                        'param1': 2,
                        'param2': 2,
                        'paramResult': 4
                    },
                    {
                        'param1': 7,
                        'param2': 7,
                        'paramResult': 14
                    }
                ]
            }
        ]
    }
];
