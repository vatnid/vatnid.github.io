var canvas;
var ctx;
var timer1; // timer for refreshing the screen
var timer2; // timer for the interval between which two words fall
var usedwords = []; // the stack of previously used words
var currentword = ["0", "1", "2", "3", "4", "5"]; // the list of words on the screen right now, 1-5 from left to right
var currentwordchinese = ["0", "1", "2", "3", "4", "5"];
var currentscore = [0, 0, 0, 0, 0, 0]; // the score of each word on screen
var checkedword = ""; // user input being checked
var word_y = [0, 0, 0, 0, 0, 0]; // y-coordinate of words on screen
var ispic = [];
var listindex; // index of the english1 etc lists
var selectedword; // for word selection from the english1 etc lists
var selectedwordrandom;
var selectedwordchinese;
var selectedwordscore; // level of the word, hence the score
var level;
var levelpl;
var lifen; // the number of lives
var score;
var lifeyes; // if there is still lives
var levelwordnum = [0, 683, 645, 883, 733];
var levelwordcounter = [0, 0, 0, 0, 0];
var wordcounter;
var randomnum; // for temporary number generation

function initialize() {
    //alert("initialize() start");
    canvas = document.getElementById("gamecanvas");
    ctx = canvas.getContext("2d");
/*
    var canvas = document.getElementById("gamecanvas");
    var ctx = canvas.getContext("2d");
    var timer1; // timer for refreshing the screen
    var timer2; // timer for the interval between which two words fall
    var usedwords = []; // the stack of previously used words
    var currentword = ["0", "1", "2", "3", "4", "5"]; // the list of words on the screen right now, 1-5 from left to right
    var currentscore = [0, 0, 0, 0, 0, 0]; // the score of each word on screen
    var checkedword = ""; // user input being checked
    var word_y = [0, 0, 0, 0, 0, 0]; // y-coordinate of words on screen
    var ispic = [];
    var listindex; // index of the english1 etc lists
    var selectedword; // for word selection from the english1 etc lists
    var selectedwordscore; // level of the word, hence the score
    var level;
    var levelpl;
    var lifen; // the number of lives
    var score;
    var lifeyes; // if there is still lives
    var wordcounter;
    var randomnum; // for temporary number generation
*/
    //ggamemode = "1";
    ggamemode = localStorage.getItem("gamemode");
    document.getElementById("modename").innerHTML = ggamemode; // display game mode
    if (ggamemode == "CHALLENGE MODE") {
		document.getElementById("scoreline").innerHTML = " Level: 1 ";
	}
    level = 1;
    currentword[1] = "";
    currentword[2] = "";
    currentword[3] = "";
    currentword[4] = "";
    currentword[5] = "";
    currentwordchinese[1] = "";
    currentwordchinese[2] = "";
    currentwordchinese[3] = "";
    currentwordchinese[4] = "";
    currentwordchinese[5] = "";
	currentscore[1] = 0;
	currentscore[2] = 0;
	currentscore[3] = 0;
	currentscore[4] = 0;
	currentscore[5] = 0;
    word_y[1] = 0;
    word_y[2] = 0;
    word_y[3] = 0;
    word_y[4] = 0;
    word_y[5] = 0;
	lifen = 3;
	score = 0;
	levelpl = 1;
	wordcounter = 0;
    //alert("everything's fine");
}

function repeat(wordinquestion) { // check if the word is repeated
    for (i = 0; i < usedwords.length; i++) { 
        if (wordinquestion == usedwords[i]) {
            return true;
        } else {
            return false;
        }
    }
}
function isfull() {
    if ((currentword[1] != "") && (currentword[2] != "") && (currentword[3] != "") && (currentword[4] != "") && (currentword[5] != "")) {
       return true;
    } else {
        return false;
    }
}

function selectword() {
    if (ggamemode == "PRACTICE MODE") {
        if ((levelwordcounter[1]+levelwordcounter[2]+levelwordcounter[3]+levelwordcounter[4]) == (683+645+883+733)) {
            alert("Congratulations! You've finished all words!");
            window.location.href = "index.html";
        }
        
        level = Math.floor(Math.random() * 4 + 1);
        // checks if the words in a level has been used up
        while (levelwordcounter[level] == levelwordnum[level]) {
            level = Math.floor(Math.random() * 4 + 1);
        }
    }
    if (!isfull()) { // check if the columns are full
        if (levelpl == 1) {
            selectedwordrandom = Math.floor(Math.random() * english1.length);
            selectedword = english1[selectedwordrandom];
            selectedwordchinese = chinese1[selectedwordrandom];
            while (repeat(selectedword)) { // select again if it duplicated
                selectedwordrandom = Math.floor(Math.random() * english1.length);
                selectedword = english1[selectedwordrandom];
                selectedwordchinese = chinese1[selectedwordrandom];
            }
            selectedwordscore = 1;
        } else if (levelpl == 2) {
            selectedwordrandom = Math.floor(Math.random() * english2.length);
            selectedword = english2[selectedwordrandom];
            selectedwordchinese = chinese2[selectedwordrandom];
            while (repeat(selectedword)) { // select again if it duplicated
                selectedwordrandom = Math.floor(Math.random() * english2.length);
                selectedword = english2[selectedwordrandom];
                selectedwordchinese = chinese2[selectedwordrandom];
            }
            selectedwordscore = 2;
        } else if (levelpl == 3) {
            selectedwordrandom = Math.floor(Math.random() * english3.length);
            selectedword = english3[selectedwordrandom];
            selectedwordchinese = chinese3[selectedwordrandom];
            while (repeat(selectedword)) { // select again if it duplicated
                selectedwordrandom = Math.floor(Math.random() * english3.length);
                selectedword = english3[selectedwordrandom];
                selectedwordchinese = chinese3[selectedwordrandom];
            }
            selectedwordscore = 3;
        } else if (levelpl == 4) {
            selectedwordrandom = Math.floor(Math.random() * english4.length);
            selectedword = english4[selectedwordrandom];
            selectedwordchinese = chinese4[selectedwordrandom];
            while (repeat(selectedword)) { // select again if it duplicated
                selectedwordrandom = Math.floor(Math.random() * english4.length);
                selectedword = english4[selectedwordrandom];
                selectedwordchinese = chinese4[selectedwordrandom];
            }
            selectedwordscore = 4;
        }
        usedwords.push(selectedword); // add word to "used" list
        randomnum = Math.floor((Math.random()*5)+1); // generate random number 1-5
        while (currentword[randomnum] != "") { // generate again if column is occupied
            randomnum = Math.floor((Math.random()*5)+1);
        }
        currentword[randomnum] = selectedword;
		currentscore[randomnum] = selectedwordscore;
        currentwordchinese[randomnum] = selectedwordchinese;
        selectedword = "";
        selectedwordchinese = "";
        randomnum = 0; // reset random number
        selectedwordrandom = 0;
    }
}

function updatescreen() {
    //alert("updatescreen() is working");
    //alert(word_y[1] + " " + word_y[2] + " " + word_y[3] + " " + word_y[4] + " " + word_y[5]);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear previous graphics
    for (i = 1; i <= 5; i++) { // update word coordiantes
        if (currentword[i] != "") {
            word_y[i] += 2;
        }
    }
    //alert("updatescreen() is working");
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    for (i = 1; i <= 5; i++) {
		// draw word
        ctx.fillText(currentwordchinese[i], 200*i-150, word_y[i]);
        //ctx.fillText(currentword[i], 200*i-150, word_y[i]+30); 
    }
	lifedrop(); // check if a word hits bottom
	// update score/level
	if (ggamemode == "CHALLENGE MODE") {
		document.getElementById("scoreline").innerHTML = " Level: " + levelpl;
	} else if (ggamemode == "PRACTICE MODE") {
		document.getElementById("scoreline").innerHTML = " Score: " + score;
	}
    
}

function lifedrop() { //the reduction of lives
	for (i = 1; i <= 5; i++) {
		if ((currentword[i] != "") && (word_y[i] >= canvas.height)) { // if an unempty word hits bottom
            currentword[i] = "";
            currentwordchinese[i] = "";
            word_y[i] = 0;
            lifen--;
            if (lifen == 2) {
				document.getElementById("life3").src = "deadheart.png";
            } else if (lifen == 1) {
				document.getElementById("life2").src = "deadheart.png";
            } else if (lifen <= 0) {
                // all lives gone, game over
				//clear the screen
                document.getElementById("life1").src = "deadheart.png";
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//write an alert game over and level/score
				if (ggamemode == "CHALLENGE MODE") {
					window.alert("Game over! Your level is " + levelpl + ".");
				} 
				else if (ggamemode == "PRACTICE MODE") {
					window.alert("Game over! Your score is " + score + ".");
				}
				//redirect to homepage
				window.location.href = "index.html";
            }
        }
    }
}	
    /*
function clearword(wordbeingcleared) {
    alert("clearword() being run");
	for (i = 1; i <= 5; i++) {
		if (wordbeingcleared == currentword[i]) {
            currentword[i] = "";
            word_y[i] = 0;
        }
    }
}
*/
function scorecheck() {
	for (i = 1; i <= 5; i++) {
		if (checkedword == currentword[i]) {
            // refresh score
            score += currentscore[i];
            //delete word
            //clearword(checkedword);
            document.getElementById("input").value = "";
            currentword[i] = "";
            levelwordcounter[level]++;
            word_y[i] = 0;
        }
    }		
}

function levelcheck() { 
    for (i = 1; i <=5 ; i++) {
        if (checkedword == currentword[i]) {
            wordcounter++;
            //clearword(checkedword);
            document.getElementById("input").value = "";
            currentword[i] = "";
            levelwordcounter[level]++;
            word_y[i] = 0;
        }
    }
    if (wordcounter == 10) {
        if (levelpl < 4) {
            levelpl++;
            wordcounter = 0;
        } else {
            // finish the game
            //clear the screen
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            window.alert("Congratulations, you've reached the highest level! You're a pro!");
            // redirect to homepage
            window.location.href = "index.html";
        }
    }
}

function checkword() {
    var correctans = false;
    checkedword = document.getElementById("input").value; // extracting user input
    for (i = 1; i <= 5; i++) {
		if (checkedword == currentword[i]) {
            correctans = true;
            if (ggamemode == "CHALLENGE MODE") {
                levelcheck();
            } else if (ggamemode == "PRACTICE MODE") {
                scorecheck();
            }
        }
    }
    if (!correctans) {
        document.getElementById("input").value = "";
    }
}
function sandbox() {
    for (i = 1; i <= 5; i++) {
		// draw word
        ctx.fillText(currentword[i], 200*i-250, 300); 
    }
}
function play() {
    initialize();
    timer2 = setInterval("selectword()", 3000); // select word
    timer1 = setInterval("updatescreen()", 100); // drop word
}