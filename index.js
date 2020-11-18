var readlineSync = require('readline-sync');
var chalk = require("chalk");
var mongoose = require("mongoose");
const User = require("./user");
mongoose.connect('mongodb+srv://priyam:priyam@cluster0.0hagx.mongodb.net/neog-cli?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true });
const log = console.log;

// Welcome tag !!!
log(chalk.bgYellow(chalk.black('Welcome to your backyard dig and save something !!')));
log(' '); 

var name = readlineSync.question(chalk.redBright.underline("Name of our visitor?"));

check()

async function check() {
var password;
    const already_user = await User.findOne({ username: name });
    
    if (already_user) {
        password =  readlineSync.question(chalk.redBright.underline("Enter your password"),{hideEchoBack:true});
   
        checkpassword(already_user,password)
        
       
      
    } else {
        var email = readlineSync.questionEMail();
        var pass = readlineSync.question(chalk.redBright.underline("Enter a password"), { hideEchoBack: true });
        
        
        log(' ');
        log("Welcome" + ' ' + chalk.greenBright(name))
        log("Your mail id" + ' ' + chalk.greenBright(email))
        log(' ');
       
        log(chalk.bgRedBright(chalk.whiteBright('Enter a secret question so that we can make it more secure')))
        log(chalk.redBright('-------------------------------------------------'))
        saveQuestion(name,pass,email);
    }
}

async function checkpassword(already_user, password) {
    if (already_user.password === password) {
        log(' ');
        log("Welcome back" + ' ' + chalk.greenBright(name))
        log("Your mail id" + ' ' + chalk.greenBright(already_user.emailId))
        askQuestion(already_user);
        log(' ');
    } else {
        log("Wrong password")
        log(' ');
        password =  readlineSync.question(chalk.redBright.underline("Enter your password"),{hideEchoBack:true});
     checkpassword(already_user,password)
    }
}


async function saveQuestion(name,pass,email) {
    log(' ');
    var question = readlineSync.question(chalk.redBright.underline("Enter a secret question :-"));
    log(' ');
    var que_ans = readlineSync.question(chalk.redBright.underline("Answer to the question"), { hideEchoBack: true });
    // user.question = question;
    // user.password = que_ans;
    log(' ');

    var your_secret = readlineSync.question(chalk.redBright.underline("Enter your secret .. "));

    const user = new User({
        username: name,
        emailId: email,
        password: pass,
        question: question,
        answer: que_ans,
        secret:your_secret
    })
    await user.save().then(() => {
       
log(chalk.bgYellow(chalk.black('Secret saved successfully , we are filling up the dig')));
    })

}

async function askQuestion(already_user) {
    log(' ');
    var question_an = readlineSync.question(chalk.redBright.underline(`${already_user.question} ??`));

    if (question_an === already_user.answer) {
        log(' ');
log(chalk.bgYellow(chalk.black(already_user.secret)));
    } else {
        log(' ');
        log(chalk.bgYellow(chalk.black('Opps !! wrong answer , please try again')));
        
    }
    
}