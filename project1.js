var chalk=require('chalk');
var score = 0;

var readlineSync = require('readline-sync');

var set_q=[{
  question:"Who won IPL 2020?",
  answer:"Mumbai Indians"
},{
  question:"Which CSK player unfortunately came back from dubia before the start of IPL?",
  answer:"Suresh Raina"
},{
  question:"Who won bihar elections? (Main)",
  answer:"BJP"
},{
  question:"What did indian army in return of URI attack ?",
  answer:"Surgical Strike"
}];
console.log(chalk.bgYellow(chalk.black('Welcome to quiz game')))
console.log(' ');
const name = readlineSync.question(chalk.red('What is your name?'));
console.log(' ');
console.log('Welcome'+' '+chalk.green(name))


function check_answer(question, answer,index) {
  var userAnswer = readlineSync.question(question);

  if (userAnswer.toUpperCase() === answer.toUpperCase()) { 
    console.log(chalk.green("right!"));
    score = score + 1;
    
  } else {
    console.log(chalk.red("wrong!"));
   
  }

  console.log("current score: ", score);
  console.log("-------------")
  if(index == set_q.length-1){
    console.log(' ');
    console.log(chalk.green(name.toUpperCase())+' '+ 'your final score is'+ ' '+chalk.red(score) );
  }
}


for (var i=0; i<set_q.length; i++) {
  var currentQuestion = set_q[i];
  check_answer(currentQuestion.question, currentQuestion.answer,i)
}
