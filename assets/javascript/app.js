$(document).ready(function () {

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 10,
    timerOn: false,
    timerId: '',
    
    questions: {
        q1: "In what year do the events of the film take place?-To which god did the staff belong?",
        q2: "What's the name of Jock's pet snake?",
        q3: "A student in Indy's class writes what words on her eyelids?",
        q4: "What word does Indy write on the chalkboard in class?",
        q5: "The Ark was created to house which holy relics?",
        q6: "What food is poisoned by the man with the eyepatch?",
        q7: "Before joining up with Indy, Marion runs her own bar in which country?",
        q8: "Which trap does Indy NOT face in the temple?",
        q9: "Which trap does Indy NOT face in the temple?",
        q10: "Why does the Nazis' Staff of Ra not point them to the right location?"
    },
    options: {
        q1: ['1936', '1940', '1938', '1942'],
        q2: ['Frank', 'Reggie', 'Archie', 'Jerry'],
        q3: ['Call me', 'Very cute', 'So hot', 'Love you'],
        q4: ['Paleolithic', 'Homeopathic', 'Neuropathic', 'Neolithic'],
        q5: ['Fragments of the True Cross', 'The Holy Nails', 'The Ten Commandments', 'Stones from the Temple of Solomon'],
        q6: ['Grapes', 'Dates', 'Hummus', 'Baba Ghanoush'],
        q7: ['Nepal', 'Iceland', 'Norway', 'Tibet'],
        q8: ['Giant boulder', 'Pressure plate triggered darts', 'Decapitating blade', 'Bottomless pit'],
        q9: ['The well of the dead', 'The pit of the dead', 'The well of souls', 'The pit of souls'],
      q10: ['Its too short', 'Its too long', 'The headpiece is too big', 'The headpiece is too small']
    },
    answers: {
        q1: '1936',
        q2: 'Reggie',
        q3: 'Love you',
        q4: 'Neolithic',
        q5: 'The Ten Commandments',
        q6: 'Dates',
        q7: 'Nepal',
        q8: 'Decapitating blade',
        q9: 'The well of souls',
        q10: 'Its too long'
    },

    startGame: function () {

        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);


        $('#game').show();
        $('#results').html('');
        $('#timer').text(trivia.timer);
        $('#start').hide();
        $('#remaining-time').show();

        trivia.nextQuestion();

    },

    nextQuestion: function () {

        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);


        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },
    timerRunning: function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        }

        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }

        else if (trivia.currentSet === Object.keys(trivia.questions).length) {


            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');

            $('#game').hide();

            $('#start').show();
        }

    },

    guessChecker: function () {

        var resultId;
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            // turn button green for correct
            $(this).addClass('btn-success').removeClass('btn-info');
           trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }

        else {

            $(this).addClass('btn-danger').removeClass('btn-info');
           trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function () {
      trivia.currentSet++;
        $('.option').remove();
        $('#results h3').remove();
        trivia.nextQuestion();

    }

}