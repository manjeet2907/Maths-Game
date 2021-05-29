//press the start button
    //if game is already under playing condition
        // then the start button should reload the page
    
    // if game is not under playing stage
    // start the timer
        // count down to 0
        // check if the count is less that 0 
            // if less than 1 than decrement the counter to zero and stop the game
            // show game over and score
            // if not 
                // brings up a question
    
    // brigs up the question
    // brings up the 4 answers
    // change the start button to reset button

// declare variables
// const gameOver = document.querySelector('.over')
// const answeris = document.querySelector('.status')
// const scoreis = document.querySelector('#score')
// const question = document.querySelector('.ques')
// const timesection =document.querySelector('.timesection')

let isPlaying = false;
let score;
let timeremaining;
let correctAnswer;
let counter;

// const timesection = document.querySelector('.timesection')

//if we click on the button
document.getElementById("btn").onclick = function(){
    
    //if we are already playing
    
    if(isPlaying == true){
        
        location.reload(); //reload the page or reset the game
        
    }else{
        //if we are not playing
        
        isPlaying = true;
        
        //1. set score to 0
        
        score = 0;
        document.getElementById("score").innerHTML = score;
     
        //show the countdown box 
        
        show('timesection');
        timeremaining = 60;
        document.getElementById("remaining").innerHTML = timeremaining;
        
        //hide game over box
        
        hide('over');
        
        //change button text to reset
        document.getElementById('btn').innerText = 'Reset Game';
                
        startCounting();
        
        //generate a new set of  Q&A
        generateQA();
    }
    
}

//Clicking on an cox conatining a number

for(i=1; i<5; i++){
    document.getElementById("num"+i).onclick = function(){
    //check if we are playing     
    if(isPlaying == true){//yes
        if(this.innerHTML == correctAnswer){
        //correct answer
            
            //increase score by 1
            score++;
            document.getElementById("score").innerHTML = score;

            //hide wrong box and show correct box
            hide("wrong");
            show('right');
            // automatically hide the correct after 1 sec
            setTimeout( () => hide('right') , 1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
        //show wrong answer
            hide('right');
            show("wrong");
            setTimeout( () => hide("wrong"), 1000);
        }
    }
}   
}
//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec


//functions

//start counter

function startCounting(){
    counter = setInterval( () => {
        timeremaining--;
        document.getElementById("remaining").innerHTML = timeremaining;
        if(timeremaining == 0){         // game over
            stopCountdown();
            show("over");
         document.getElementById("scoreis").innerHTML = score;   
            hide("timesection");
            hide("right");
            hide("wrong");
            isPlaying = false;
            document.getElementById("btn").innerHTML = "Start Game";
        }
    }, 1000);    
}

//stop counter

function stopCountdown(){
    clearInterval(counter);   
}

//hide an element

function hide(Id){
    document.getElementById(Id).style.display = "none";   
}

//show an element

function show(Id){
    document.getElementById(Id).style.display = "block";   
}

//generate question and multiple answers

function generateQA(){
    let x = 1+ Math.round(100*Math.random());
    let y = 1+ Math.round(100*Math.random());
    correctAnswer = x*y;
    document.querySelector(".ques").innerHTML = x + "x" + y;
    let correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("num"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(100*Math.random()))*(1+ Math.round(100*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("num"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}