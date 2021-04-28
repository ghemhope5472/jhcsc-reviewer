const startButton  = document.getElementById('start-button')
const nextButton  = document.getElementById('next-button')
const saveButton  = document.getElementById('save-button')
const questionContainerElement = document.getElementById('questionsContainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const explanationDiv = document.getElementById('explanationDiv')
const scoreBox = document.getElementById('scoreBox')
const titleId = document.getElementById('titleId').innerHTML;
const resultMsg = document.getElementById('resultMessage')
const scoreDisplay = document.getElementById('scoreDisplay')
const userId = document.getElementById('userId').innerHTML;
const ajaxUrl =  `/${userId}/title/${titleId}`;
const stbs = document.getElementById('stbs')
const question_image = document.getElementById('question_image')

const image_element = document.getElementById('image_element')
const q_img = document.getElementById("qImg")
const a_img = document.getElementById("aImg")


let userScore = 0;
let savedScore = 0;
let shuffledQuestions, currentQuestionIndex;


var correct = document.getElementById("correct"); 

function playCorrect() { 
    correct.play(); 
} 


var wrong = document.getElementById("wrong"); 

function playWrong() { 
    wrong.play(); 
} 







async function getData(titleId){
    const address = '/api/questions/v1/'+titleId;
    const response  = await fetch(address)
    const data  = await response.json()
   
    
   console.log(data)



    const questions = data.questions.map( question =>{
        return{
            
            question: question.question,                       
            explanation: question.explanation,
            question_image: question.question_image,
            answer_image: question.answer_image,
            answers: [
              {
                text: question.answers[0].text,
                correct: question.answers[0].correct
               
              },
              {
                text: question.answers[1].text,
                correct: question.answers[1].correct
                
              },
              {
                text: question.answers[2].text,
                correct: question.answers[2].correct
               
              },
              {
                text: question.answers[3].text,
                correct: question.answers[3].correct
                
              },
            ]
          
            

        }
    })
    





    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort( () => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');

    setNextQuestion()

}



function setNextQuestion(){
    // document.getElementById('resultMessage').classList.add('hide')
        resetImage()
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex]);
       
}


function showQuestion(question){

    
    questionElement.innerText  = question.question

    if( question.question_image === ""){
        q_img.classList.add('hide')
    } else{
        q_img.classList.remove('hide')
        q_img.src = question.question_image
    }
    

    if( question.answer_image === ""){
        a_img.classList.add('hide')
        
    } else{
        a_img.classList.remove('hide')
        a_img.src= question.answer_image
      
        
    }
   
     
    
    question.answers.forEach( answer => {
          

            
            questionElement.innerText  = question.question

               
            
           
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btnq')
            if( answer.correct){
                button.dataset.correct = answer.correct
               
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
            
            
            
    })
    explanationDiv.innerText = question.explanation

}

function resetState(){
    
    // document.getElementById('resultMessage').classList.add('hide')
    answerButtonsElement.classList.remove('disable-click')
    nextButton.classList.add('hide')
    explanationDiv.classList.add('hide')
    resultMsg.classList.add('hide')
    
    while( answerButtonsElement.firstChild){
        answerButtonsElement.removeChild( answerButtonsElement.firstChild)
    }
}

function resetImage(){
  
}



function selectAnswer(e){
    const selectedButton  = e.target;
    const correct = selectedButton.dataset.correct
    
    if(selectedButton.dataset.correct){
        userScore++;
        savedScore++;
        scoreBox.innerText = userScore;
        resultMsg.classList.remove('hide')
        resultMsg.classList.remove('wrongColor');
        resultMsg.classList.add('correctColor');
        resultMsg.innerText = 'Correct!';
        answerButtonsElement.classList.add('disable-click')
        playCorrect();
        document.onkeydown = function (e) {
            return false;
         }
        
        
    }else{
        answerButtonsElement.classList.add('disable-click')
        resultMsg.classList.remove('hide')
        resultMsg.classList.remove('correctColor');
        resultMsg.classList.add('wrongColor');
        resultMsg.innerText = 'Wrong!'
        playWrong();
        document.onkeydown = function (e) {
            return false;
    }
    }
    setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach( button => {
        setStatusClass(button, button.dataset.correct)
        
        showExplanation()
    })
    if(shuffledQuestions.length > currentQuestionIndex  + 1  ){
        nextButton.classList.remove('hide')
    } else {
        
        startButton.classList.add('hide');
        startButton.classList.add('hide')
        // saveButton.classList.remove('hide')
      
        const quizlength = questions.length;
        const number_of_items = document.getElementById('quizlength')
        number_of_items.value = quizlength;
        scoreDisplay.innerText = userScore;
        stbs.value = savedScore;
        $('#exampleModal').modal({backdrop: 'static', keyboard: false});
        $('#exampleModal').modal('show',{backdrop: 'static', keyboard: false});
    }
    
}



function showExplanation(){
    explanationDiv.classList.remove('hide')
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
       
    }else{
        element.classList.add('wrong')
    }
}


function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong')
}


const quizlength = questions.length;
const lengthDisplay = document.getElementById('questionBox')
lengthDisplay.innerHTML = quizlength;

    
}



getData(titleId)






















