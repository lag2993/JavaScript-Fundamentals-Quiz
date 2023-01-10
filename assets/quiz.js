var quiz = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["<javascript>","<script>","<js>","<scripting>"],
        answer: "<script>" 
    },
    {
        question: "What isn't a JavaScript Data Type?",
        answers: ["Number","String","Boolean","Class"],
        answer: "Class" 
    },
    {
        question: "What isn't a looping structures in JavaScript?",
        answers: ["For","While","Do-while loops","If"],
        answer: "If" 
    },
    {
        question: "How do you create a new function in JavaScript?",
        answers: ["new.function(){}","function myFunction(){}","function:myFunction(){}","function=myFunction(){}"],
        answer: "function myFunction(){}" 
    },

]

// Variables
// DOM elements
var showScoresBtn = document.getElementById("showScores");
var scoreSheet = document.getElementById("HsL");
var resetBtn = document.getElementById("reset");
var countDownEl = document.getElementById("time");
var promptEl = document.getElementById("prompt")
var startBtn = document.getElementById("start");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question")
var answersEl = document.getElementById("answers");
var timesUpEl = document.getElementById("timesUp");
var finalScoreEl = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var submitBtn = document.getElementById("submit");
var evaluationEl = document.getElementById("eval");

// Track questions, answers and time
var currentQuestion = 0;
var time = quiz.length*20;
var pairedTimer;
var correctResponses = 0;
var breakPoint = (quiz.length) 

// SFX
var sfxRight;
var sfxWrong;

// Function:

// Start Button

function Start(){
    // Hide introduction and show first question. 
    promptEl.setAttribute("class","hidden");
    quizEl.removeAttribute("class");
    evaluationEl.removeAttribute("class");
    pairedTimer = setInterval(countdown,1000);
    pairedTimer.textContent = time ;
    writeQuestion();
            //   element.classList.remove("mystyle");
            // ELement still rendered
            // element.style.visibility = "hidden";
            // element dom is maintained but not rendered to page
            // element.style.display = "none";
            // .style.display=''


}

function countdown(){
    time--;
    countDownEl.textContent = time;
    if(time<=0 || currentQuestion === quiz.length){
        End;
    };
}
// Write questions and answers to website page
function writeQuestion(){
// Write ?
    var questionShown =  quiz[currentQuestion];
    questionEl.textContent = questionShown.question;
// Write Answers 
    answersEl.innerHTML = "";
    for(let i = 0;i< questionShown.answers.length;i++){
        var answerShown = questionShown.answers[i];
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class","answer");
        answerBtn.setAttribute("value", answerShown);
        answerBtn.textContent = answerShown;  
        answersEl.append(answerBtn);
    }
}
// Evaluation 
function Evaluation(event){

    var answerEval = event.target;
    evaluationEl.removeAttribute("class");
    evaluationEl.innerHTML = "";

    if (answerEval.value !== quiz[currentQuestion].answer){
        time = time -15;
        if(time<0){time=0;}
       countDownEl.textContent = time; 
    //    sfxWrong.play();
       evaluationEl.textContent = "Incorrect";
    }
    else {
        // sfxRight.play();
        evaluationEl.textContent = "Correct";
        correctResponses++;
    }

    currentQuestion++;
           // End case for function
           console.log(currentQuestion);
           if(time<=0 || currentQuestion === quiz.length){
            End();
        } else{
            writeQuestion();
   };

}
function End(){
    clearInterval(pairedTimer);
    timesUpEl.removeAttribute("class");
    evaluationEl.setAttribute("class","hidden");
    submitBtn.removeAttribute("class");
    finalScoreEl.textContent = "Your time was " + time + " and success rate was " + (Math.floor((correctResponses/currentQuestion) * 100))+"%.";

    quizEl.setAttribute("class","hidden");

 



}
function submitScore(){
    var name = initialsEl.value.trim();

    if (name !== ""){
        scoreSheet = JSON.parse(window.localStorage.getItem("scoreSheet"))|| [];

        
        var currentScore = {
            score:time,
            successRate: (Math.floor((correctResponses/currentQuestion) * 100))+"%",
            initials:name,
        }
        scoreSheet.push(currentScore);
        window.localStorage.setItem("scoreSheet",JSON.stringify(scoreSheet));
        location.reload();
    }





}

function showScores(){
    showScoresBtn.setAttribute("class","hidden");
    scoreSheet.removeAttribute("class");
    resetBtn.removeAttribute("class");
    resetBtn.setAttribute("class","reset");
    for(let i = 0;i< scoreSheet.length;i++){
        var scoreList = scoreSheet.currentScore[i];
        scoreSheet.textContent = "Name: "+ currentScore.initials+ " Time: "+currentScore.time+" Success Rate: " + currentScore.successRate;   
        answersEl.append(answerBtn);
    }


}
function resetScores(){
    resetBtn.setAttribute("class","hidden");
    showScoresBtn.removeAttribute("class");
    scoreSheet = [];

}
// Tie Buttons to functions

startBtn.onclick = Start;
answersEl.onclick =  Evaluation;  
submitBtn.onclick = submitScore;
showScoresBtn.onclick = showScores;
resetBtn.onclick = resetScores;






