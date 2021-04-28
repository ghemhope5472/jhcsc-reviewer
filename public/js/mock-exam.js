// const quizContainer = document.getElementById('quiz');
// const resultsContainer = document.getElementById('results');
// const submitButton = document.getElementById('submit');
// const outPut = document.getElementById('outPut');
// const saveBtn = document.getElementById('saveBtn');






//   async function getData(){
//     const address = '/api/questions/v1/';
//     const response  = await fetch(address)
//     const data  = await response.json()


//     console.log(data)
 
//     const myQuestions = data.questions.map( question => {

            
             
//         return{
            
//                 question: question.question,
//                 answers: {
//                     a:  question.answers[0].text,
//                     b:  question.answers[1].text,
//                     c:  question.answers[2].text,
//                     d:  question.answers[3].text
//                 },   
//                 correctAnswer: returnCorrectAnswer(question.answers)   
//         }
//     })

//     console.log(myQuestions)

//     function returnCorrectAnswer(array) {
//         for( var counter =0; counter < array.length; counter++){
//             if( array[counter].correct === true ){
//                 return array[counter].text
//             }
//         }
//     }


//     buildQuiz(myQuestions)


//     function buildQuiz(myQuestions) {

//         console.log(myQuestions)
//             // variable to store the HTML output
//             const output = [];
        
//             // for each question...
//             myQuestions.forEach(
//                 (currentQuestion, questionNumber) => {
        
//                     // variable to store the list of possible answers
//                     const answers = [];
        
//                     // and for each available answer...
//                     for (letter in currentQuestion.answers) {
        
//                         // ...add an HTML radio button
//                         answers.push(
//                         `<label>
//                             <input type="radio" name="question${questionNumber}" value="${letter}">
//                                  ${letter} :  ${currentQuestion.answers[letter]}
//                         </label>`
//                         );

//                         // console.log(`question${questionNumber}`)
//                         // console.log(`value ${letter}`)
//                         // console.log(` answer in word ${currentQuestion.answers[letter]}`)
//                     }
        
//                     // add this question and its answers to the output
//                     output.push(
//                         `<div class="question"> ${currentQuestion.question} </div>
        
//                         <div class="answers"> ${answers.join('')} </div> <hr>`
                        
        
//                     );
                   
//                 }
//             );
        
//             // finally combine our output list into one string of HTML and put it on the page
//             quizContainer.innerHTML = output.join('');
//         }
        
        
        
        
//         function showResults() {

           
        
//             // gather answer containers from our quiz
//             const answerContainers = quizContainer.querySelectorAll('.answers');
        
//             // keep track of user's answers
//             let numCorrect = 0;
        
               
//             // for each question...
//             myQuestions.forEach((currentQuestion, questionNumber) => {
        
//                 // find selected answer
//                 const answerContainer = answerContainers[questionNumber];
//                 const selector = `input[name=question${questionNumber}]:checked`;
//                 const userAnswer = (answerContainer.querySelector(selector) || {}).value;

//                 console.log(`input[name=question${questionNumber}]:checked`)
        
//                 // if answer is correct
//                 if (userAnswer === currentQuestion.correctAnswer) {
//                     // add to the number of correct answers
//                     numCorrect++;
        
//                     // color the answers green
//                     answerContainers[questionNumber].style.color = 'lightgreen';
//                 }
//                 // if answer is wrong or blank
//                 else {
//                     // color the answers red
//                     answerContainers[questionNumber].style.color = 'red';
//                 }
//             });
        
//             // show number of correct answers out of total
//             resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
//             $('#myModal').modal('show');
//             saveResult(numCorrect);
//         }
        
//         function saveResult(numCorrect) {
//             submitButton.style.display = "none";
//             saveBtn.style.display = "block";
//             outPut.value = `${numCorrect}`;
//         }
        
    
//         // on submit, show results
//         submitButton.addEventListener('click', showResults);

// }

// getData()



// // function buildQuiz() {
// //     // variable to store the HTML output
// //     const output = [];

// //     // for each question...
// //     myQuestions.forEach(
// //         (currentQuestion, questionNumber) => {

// //             // variable to store the list of possible answers
// //             const answers = [];

// //             // and for each available answer...
// //             for (letter in currentQuestion.answers) {

// //                 // ...add an HTML radio button
// //                 answers.push(
// //                     `<label>
// //     <input type="radio" name="question${questionNumber}" value="${letter}">
// //     ${letter} :
// //     ${currentQuestion.answers[letter]}
// //   </label>`
// //                 );
// //             }

// //             // add this question and its answers to the output
// //             output.push(
// //                 `<div class="question"> ${currentQuestion.question} </div>

// //                 <div class="answers"> ${answers.join('')} </div> <hr>`

// //             );
// //         }
// //     );

// //     // finally combine our output list into one string of HTML and put it on the page
// //     quizContainer.innerHTML = output.join('');
// // }




// // function showResults() {

// //     // gather answer containers from our quiz
// //     const answerContainers = quizContainer.querySelectorAll('.answers');

// //     // keep track of user's answers
// //     let numCorrect = 0;

// //     // for each question...
// //     myQuestions.forEach((currentQuestion, questionNumber) => {

// //         // find selected answer
// //         const answerContainer = answerContainers[questionNumber];
// //         const selector = `input[name=question${questionNumber}]:checked`;
// //         const userAnswer = (answerContainer.querySelector(selector) || {}).value;

// //         // if answer is correct
// //         if (userAnswer === currentQuestion.correctAnswer) {
// //             // add to the number of correct answers
// //             numCorrect++;

// //             // color the answers green
// //             answerContainers[questionNumber].style.color = 'lightgreen';
// //         }
// //         // if answer is wrong or blank
// //         else {
// //             // color the answers red
// //             answerContainers[questionNumber].style.color = 'red';
// //         }
// //     });

// //     // show number of correct answers out of total
// //     resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
// //     $('#myModal').modal('show');
// //     saveResult(numCorrect);
// // }

// // function saveResult(numCorrect) {
// //     submitButton.style.display = "none";
// //     saveBtn.style.display = "block";
// //     outPut.value = `${numCorrect}`;
// // }


// // // display quiz right away
// // buildQuiz();

// // // on submit, show results
// // submitButton.addEventListener('click', showResults);




const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const outPut = document.getElementById('outPut');
const saveBtn = document.getElementById('saveBtn');





async function getData(){
        const address = '/api/questions/v1/';
        const response  = await fetch(address)
        const data  = await response.json()

     
        const myQuestions = data.questions.map( question => {
    
                
                 
            return{
                
                    question: question.question,
                    answers: {
                        a:  question.answers[0].text,
                        b:  question.answers[1].text,
                        c:  question.answers[2].text,
                        d:  question.answers[3].text
                    },   
                    correctAnswer: returnCorrectAnswer(question.answers)   
            }
        })
    
        
    
        function returnCorrectAnswer(array) {
            for( var counter =0; counter < array.length; counter++){
                if( array[counter].correct === true ){
                    return array[counter].text
                }
            }
        }

        buildQuiz(myQuestions)


 }

 getData()




function buildQuiz(myQuestions) {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            // variable to store the list of possible answers
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {

                // ...add an HTML radio button
                answers.push(
                    `<label>
    <input type="radio" name="question${questionNumber}" value="${letter}">
    ${letter} :
    ${currentQuestion.answers[letter]}
  </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>

<div class="answers"> ${answers.join('')} </div> <hr>`

            );
        }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults() {

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;

            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else {
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    $('#myModal').modal('show');
    saveResult(numCorrect);
}

function saveResult(numCorrect) {
    submitButton.style.display = "none";
    saveBtn.style.display = "block";
    outPut.value = `${numCorrect}`;
}




// on submit, show results
submitButton.addEventListener('click', showResults);

