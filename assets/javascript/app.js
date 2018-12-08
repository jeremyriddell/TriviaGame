$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
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
      q5: ['Fragments of the True Cross','The Holy Nails','The Ten Commandments','Stones from the Temple of Solomon'],
      q6: ['Grapes','Dates','Hummus','Baba Ghanoush'],
      q7: ['Nepal', 'Iceland', 'Norway','Tibet'],
      q8: ['Giant boulder', 'Pressure plate triggered darts', 'Decapitating blade', 'Bottomless pit'],
      q9: ['The well of the dead', 'The pit of the dead', 'The well of souls' 'The pit of souls']
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
    // trivia methods
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      // show game section
      $('#game').show();
      
      //  empty last results
      $('#results').html('');
      
      // show timer
      $('#timer').text(trivia.timer);
      
      // remove start button
      $('#start').hide();
  
      $('#remaining-time').show();
      
      // ask first question
      trivia.nextQuestion();
      
    },
    // method to loop through and display questions and options 
    nextQuestion : function(){
      
      // set timer to 20 seconds each question
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      // to prevent timer speed up
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      // gets all the questions then indexes the current questions
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      // an array of all the user options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      // creates all the trivia guess options in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    // method to decrement counter and count unanswered if timer runs out
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      // the time has run out and increment unanswered, run result
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      // if all the questions have been shown end the game, show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        // adds results of game (correct, incorrect, unanswered) to the page
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        // hide game sction
        $('#game').hide();
        
        // show start button to begin a new game
        $('#start').show();
      }
      
    },
    // method to evaluate the option clicked
    guessChecker : function() {
      
      // timer ID for gameResult setTimeout
      var resultId;
      
      // the answer to the current question being asked
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      // if the text of the option picked matches the answer of the current question, increment correct
      if($(this).text() === currentAnswer){
        // turn button green for correct
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      // else the user picked the wrong option, increment incorrect
      else{
        // turn button clicked red for incorrect
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    // method to remove previous question results and options
    guessResult : function(){
      
      // increment to next question set
      trivia.currentSet++;
      
      // remove the options and results
      $('.option').remove();
      $('#results h3').remove();
      
      // begin next question
      trivia.nextQuestion();
       
    }
  
  }