// ==============================================================================start
// Declear section

const appContainer = document.querySelector(".app-container");
const page1Button = document.querySelector("#page-1-btn");
const startPage = document.querySelector(".start-container");
const exitButton = document.querySelector("#exit-button");
const continueButton = document.querySelector("#continue-button");
const quizContainer = document.querySelector(".quiz-container");
const nextQuestion = document.querySelector("#next-question");
const optionsAll = document.querySelector(".options");
const remain = document.querySelector(".remain");
const option = optionsAll.querySelectorAll(".option");
const timeCount = document.querySelector(".time-count .seconds");
const timeLine = document.querySelector(".question-heading .time-line");
const resultContainer = document.querySelector(".result-container");
const lastButton = resultContainer.querySelectorAll("button");
const timeUp = document.querySelector(".time-up");

// ==============================================================================end

// ==============================================================================start
// Event add section

page1Button.addEventListener("click",() => {
    startPage.style.display = "block";
})

exitButton.addEventListener("click",() => {
    startPage.style.display = "none";
})

continueButton.addEventListener("click",() => {
    startPage.style.display = "none";
    appContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuesion(0);
    startTimer(14);
    timerLine(0);
})
//=================start
//Initialize data
let queQunt = 0;
let counter;
let counterLine;
let score = 0;
//=================end

nextQuestion.addEventListener("click",() => {
    clearInterval(counter);
    clearInterval(counterLine);
    timeCount.textContent = "15";
    startTimer(14);
    nextQuestion.style.visibility = "hidden";
    if(queQunt == questions.length-2){
        nextQuestion.innerHTML = "Finish";
    }
    if (queQunt < questions.length - 1){
        queQunt++;
        showQuesion(queQunt);
        timerLine(0);
    }else{
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
        resultPage(score);
    }
})

lastButton[0].addEventListener("click",() => {
    score = 0;
    queQunt = 0;
    startPage.style.display = "none";
    appContainer.style.display = "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    nextQuestion.innerHTML = "Next Ques";
    timeCount.textContent = "15";
    showQuesion(0);
    timerLine(0);
})

lastButton[1].addEventListener("click",() => {
    location.reload();
})

// ==============================================================================end


// ==============================================================================start
// showQuesion Function

const showQuesion = (index) => {
    timeUp.innerText = "";
    timeUp.classList.add("none-display")
    const question = document.querySelector(".body .question");
    let innerQuestion = `${questions[index].num}. ${questions[index].question}`
    question.innerHTML = innerQuestion;
    
    option[0].innerHTML = questions[index].options[0];
    option[1].innerHTML = questions[index].options[1];
    option[2].innerHTML = questions[index].options[2];
    option[3].innerHTML = questions[index].options[3];
    remain.innerHTML = `${questions[index].num} of ${questions.length} question`

    for (let i = 0; i< option.length;  i++){
        option[i].setAttribute("onclick", `selectedOption(this,${i})`)
        option[i].classList.remove("wrong");
        option[i].classList.remove("correct")
    }
    for (let i = 0 ; i<optionsAll.children.length ; i++){
        optionsAll.children[i].classList.remove("disable");
    }
}

// ==============================================================================end


// ==============================================================================start
// selectedOption Function

const selectedOption = (answer,i) => {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[queQunt].ans;
    let allOption = optionsAll.children.length;
    if(userAnswer == correctAnswer){
        option[i].classList.add("correct")
        option[i].innerHTML = `<span>${option[i].innerHTML}</span><i class="fa-solid fa-check"></i>`
        score++;
    }else{
        option[i].classList.add("wrong")
        option[i].innerHTML = `<span>${option[i].innerHTML}</span><i class="fa-solid fa-xmark"></i>`
        for (let i = 0 ; i<allOption ; i++){
            if (optionsAll.children[i].textContent == correctAnswer){
                optionsAll.children[i].setAttribute("class", "option correct")
                optionsAll.children[i].innerHTML = `<span>${option[i].innerHTML}</span><i class="fa-solid fa-check"></i>`
            }
        }
    }
    for (let i = 0 ; i<allOption ; i++){
        optionsAll.children[i].classList.add("disable");
    }
    nextQuestion.style.visibility = "visible";
}

// ==============================================================================end


// ==============================================================================start
// startTimer Function

const startTimer = (time) => {
    const timer =() => {
        timeCount.textContent = time;
        time--;
        if(time<9){
            timeCount.textContent = "0" + timeCount.textContent
        }
        if(time<0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeUp.innerHTML = "Time up";
            timeUp.classList.remove("none-display")
            nextQuestion.style.visibility = "visible";
            for (let i = 0 ; i<optionsAll.children.length ; i++){
                if (optionsAll.children[i].textContent == questions[queQunt].ans){
                    optionsAll.children[i].setAttribute("class", "option correct")
                    optionsAll.children[i].innerHTML = `<span>${option[i].innerHTML}</span><i class="fa-solid fa-check"></i>`
                }
                optionsAll.children[i].classList.add("disable");
            }
            
            
        }
    }
    counter = setInterval(timer, 1000)
}

// ==============================================================================end


// ==============================================================================start
// timerLine Function

const timerLine = (time) => {
    function timer(){
        time += 0.33;
        timeLine.style.width = time + "%"
        if(time>=99.9){
            clearInterval(counterLine);
        }
    }
    
    counterLine = setInterval(timer, 50)
}

// ==============================================================================end


// ==============================================================================start
// resultPage Function

const resultPage = (x) => {
    let correctParcentage = ((x/questions.length)*100).toFixed(2);
    let wrongParcentage = (100-correctParcentage).toFixed(2);
    const image = resultContainer.querySelector(".img");
    if (correctParcentage<33){
        resultContainer.querySelector("h3").innerHTML = "Alas! You are Fail."
        image.innerHTML = `<img class="image" src="images/fail.jpg" alt="">`
    }else if (correctParcentage>33 && correctParcentage<80){
        resultContainer.querySelector("h3").innerHTML = "Congrats! You are Pass."
        image.innerHTML = `<img class="image" src="images/pass.jpg" alt="">`
    }else{
        resultContainer.querySelector("h3").innerHTML = "Congratulations! You got A+."
        image.innerHTML = `<img class="image" src="images/sucsess.jpg" alt="">`
    }
    resultContainer.querySelector(".cor-par").innerHTML = `${correctParcentage}% <br>Correct`
    resultContainer.querySelector(".wro-par").innerHTML = `${wrongParcentage}% <br>Wrong`
    resultContainer.querySelector(".total-correct").style.width = `${correctParcentage}%`
    resultContainer.querySelector(".total-wrong").style.width = `${wrongParcentage}%`
    resultContainer.querySelector(".result").innerHTML = `You got ${x} out of ${questions.length}`
}

// ==============================================================================end