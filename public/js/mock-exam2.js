var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
const titleId = document.getElementById('titleId').innerHTML;
const stbs = document.getElementById('stbs');
const no_of_items = document.getElementById('no_of_items');


function loadQuestionsSpinner(){
	setTimeout( ()=>{
		document.getElementById('qspinnerDiv').classList.add('hide')
		document.getElementById('mainPage').classList.remove('hide')
	}, 2000)
}

loadQuestionsSpinner()




async function getData(titleId){

	const address = '/api/questions/v1/'+titleId;   
    const response  = await fetch(address)
    const data  = await response.json()

    const myQuestions = data.questions.map( question => {

            
             
        return{
            
                question: question.question,
				question_image: question.question_image,
                answers: {
                    A:  question.answers[0].text,
                    B:  question.answers[1].text,
                    C:  question.answers[2].text,
                    D:  question.answers[3].text
                },   
                correctAnswer: returnCorrectAnswer(question.answers),
				answer_image: question.answer_image
        }
    })

    

    function returnCorrectAnswer(array) {
        for( var counter =0; counter < array.length; counter++){
            if( array[counter].correct === true ){
                var correct_answer = array[counter].text
                return correct_answer.charAt(0)
            }
        }
    }

    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);


}

getData(titleId)





function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	// keep track of user's answers
	var userAnswer = '';
	var numCorrect = 0;
	var correctA = []


	for( var i =0; i < questions.length; i++){
		correctA.push( questions[i].correctAnswer)
	}

	

	function showQuestions(questions, quizContainer){
        // code will go here
        // we'll need a place to store the output and the answer choices
	var output = [];
	var answers;

	



	// for each question...
	for(var i=0; i<questions.length; i++){
		
		// first reset the list of answers
        answers = [];
        
        answers.push(
			`
				<p class="correctAnswer" id="correctANswerP"> Correct Answer:  ${questions[i].correctAnswer} </p>
			`
		)
        
       
 

		// for each available answer to this question...
		for(letter in questions[i].answers){


            let n = 2;
			
			
			

		


			// ...add an html radio button
			answers.push(
				'<label>'
					+ '<input class="answerRadio" type="radio" name="question'+i+'" value="'+letter+'">'
					+ letter + ': '
					+ questions[i].answers[letter].substring(n) 
				+ '</label>' 
					
				
				
				+ '<br>' 
			);
			
			
            
		}


		//check if there image in question
		if(questions[i].question_image  == ""){
					// add this question and its answers to the output
					output.push(
						
						'<hr><div class="question">' + [i +1]+". " + " "  + 
						questions[i].question 
						+ '</div>'
						+ '<div class="answers">' + answers.join('') + '</div>'
			);
		}else {
			output.push(
				`	<hr>
					<div class="question">
						${[i+1]} 
						<img src="${questions[i].question_image}" height="70px" width="auto" style="margin:10px 10px";> <br>
						<img src="${questions[i].answer_image}" height="70px" width="auto" style="margin:10px 10px";>
					</div>	
					<div class="answers">
						${answers.join(' ')}
					</div>
					<div>
						
					</div>
				`
			);
		}
		

		
	}

	// finally combine our output list into one string of html and put it on the page
	quizContainer.innerHTML = output.join('');
	}

	function showResults(questions, quizContainer, resultsContainer){
        // code will go here
        // gather answer containers from our quiz
	var answerContainers = quizContainer.querySelectorAll('.answers');
	
	
	
	// for each question...
	for(var i=0; i<questions.length; i++){

		// find selected answer
		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
		
		// if answer is correct
		if(userAnswer===questions[i].correctAnswer){
			// add to the number of correct answers
			numCorrect++;
			
			// color the answers green
			answerContainers[i].style.color = '#008000';
			answerContainers[i].style.fontWeight = 'bold';
		}
		// if answer is wrong or blank
		else{
			// color the answers red
			answerContainers[i].style.color = 'red';
		}
	}

	// show number of correct answers out of total
		
	// resultsContainer.innerHTML = 
	// 	`
	// 	<h4>Greaert Job! You have successfully finished your Mock Exam!</h4>
	// 	<h4> Score: ${numCorrect}  out of  ${questions.length}
	// 	<h5>Scroll down to review your answers. Don't forget to save your score.</h5>
	// 	`
		if(numCorrect >= 75 ){
			resultsContainer.innerHTML = 
		`
		<h4>Great Job! You have successfully finished your Mock Exam!</h4>
		<h4> Score: ${numCorrect}  out of  ${questions.length}
		<h5>Scroll down to review your answers. Don't forget to save your score.</h5>
		`
		}else if( numCorrect <= 74 && numCorrect >= 50 ){
			resultsContainer.innerHTML = 
		`
		<h4>Way to Go! You have successfully finished your Mock Exam!</h4>
		<h4> Score: ${numCorrect}  out of  ${questions.length}
		<h5>Scroll down to review your answers. Don't forget to save your score.</h5>
		`
		}else{
			resultsContainer.innerHTML = 
			`
			<h4>Keep working on it! You have successfully finished your Mock Exam!</h4>
			<h4> Score: ${numCorrect}  out of  ${questions.length}
			<h5>Scroll down to review your answers. Don't forget to save your score.</h5>
			`
		}
		
		document.getElementById('results').classList.add('hide')
		document.getElementById('quiz').classList.add('hide')
		document.getElementById('submit').classList.add('hide')
		document.getElementById('spinnerDiv').classList.remove('hide')
		stbs.value = numCorrect;
		no_of_items.value = questions.length
		showAgain()
		showCorrectAnswer()
		
	}

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
		
	
	}

	function showAgain() {
		setTimeout(function(){
			document.getElementById('results').classList.remove('hide')
			document.getElementById('quiz').classList.remove('hide')
			document.getElementById('saveBtn').classList.remove('hide')
			// document.querySelectorAll('.correctAnswer').style.fontSize = "12px"
			document.getElementById('spinnerDiv').classList.add('hide')
			
		 }, 3000);
	  }


	  function showCorrectAnswer(){
		  setTimeout( () =>{
				for( i =0; i < correctA.length; i++){
					var para = document.querySelectorAll('.correctAnswer')
					para[i].style.fontSize = "12px"
					
				}

		  },3000)
	  }


	
}





