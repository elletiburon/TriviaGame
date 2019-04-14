$(document).ready(function(){

//on click events n stuff are gonna go here
$("#time-remaining").hide();
$("#start").on('click', trivia.startGame);
$(document).on('click' , '.option', trivia.answerCheck);
})
//set ur variables 

var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
        q1: "According to a study done at the University of Leicester, the milk yield of cows increases when they're _______.",
        q2: "When Canada's Northwest territories considered renaming itself in the 1990s, one name that gained a lot of popular support was '____.'",
        q3: "Which one of the following characters is a rabbit?",
        q4: "In what key do most American car-horns honk?",
        q5: "Which WWE megastar played the title character in 90's movie Mr. Nanny?",
        q6: "What did Alfred Nobel develop?",
        q7: "How many spaces are on a standard Monopoly board?"
      },

      choices: {
        q1: ["Mooing", "Listening to relaxing music", "in a warm barn", "absent a history of being tipped over"],
        q2: ["Apres", "Shatner", "Bob", "Tundra"],
        q3: ["Brer Rabbit", "Bugs Bunny", "Easter Bunny", "None, they're all hares"],
        q4: ["F", "G", "E", "C"],
        q5: ["Hulk Hogan", "John Cena", "The Rock", "Andre The Giant"],
        q6: ["Gunpowder", "Dynamite", "Nobelium", "Atomic Bomb"],
        q7: ["60", "40", "80", "20"]
      },

      answers: {
        q1: "Listening to relaxing music",
        q2: "Bob",
        q3: "None, they're all hares",
        q4: "F",
        q5: "Hulk Hogan",
        q6: "Dynamite",
        q7: "40"
      },

      

//functions go here
startGame: function(){
    
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#time-remaining').show();
    $('#gifs').empty()
    
    trivia.nextQuestion();  
  },


  nextQuestion : function(){
    
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    
    var questionchoices = Object.values(trivia.choices)[trivia.currentSet];
    
    
    $.each(questionchoices, function(index, key){
      $('#choices').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  
  timerRunning : function(){
    
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
   
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.resetQuestions, 4000);
      $('#results').html('<h3>Too Slow! The right answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      $("#gifs").html("<img src='https://media.giphy.com/media/3ohuADRdKZgi8Xu7ni/giphy.gif'>")
    }
    
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      
      $('#results')
        .html('<h3>All Done!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'
        );
      
      
      $('#game').hide();
      
      
      $('#start').show();
      $("#gifs").html("<img src='https://media.giphy.com/media/8JW82ndaYfmNoYAekM/giphy.gif'>")
    }
    
  },
  
  answerCheck : function() {
    
    
    var resultId;
    

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    
    if($(this).text() === currentAnswer){
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.resetQuestions, 3000);
      $('#results').html('<h3>GOOD JOB!</h3>');
      $('#gifs').html("<img src='https://media.giphy.com/media/OcZp0maz6ALok/giphy.gif'>")
    }
    
    else{
      
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.resetQuestions, 3000);
      $('#results').html('<h3>WRONG! '+ currentAnswer +'</h3>');
      $("#gifs").html("<img src='https://media.giphy.com/media/l2JhLaxhWba6OivE4/giphy.gif'>")
    }
    
  },
  
  resetQuestions : function(){
    
    
    trivia.currentSet++;
    
    
    $('.option').remove();
    $('#results h3').remove();
    $('#gifs').empty()
    
    
    trivia.nextQuestion();
     
  }

}

