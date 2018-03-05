let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
   	if(isEmpty(answer.value) || isEmpty(attempt.value)){
		setHiddenFields()
	}
    
    if(!validateInput(input.value)){
    	return false;
    }
    
    attempt.value = attempt.value == '' ? 0 : attempt.value++ + 1;
    
    if(getResults(input)){
    	showAnswer(true);
    	setMessage("You Win! :)");
    	showReplay();
    } else if(attempt.value >= 10){
    	showAnswer(false);
    	showReplay();
    	setMessage("You Lose! :(");
    } else{
    	setMessage("Incorrect, try again.");
    }
}

function showReplay(){
	document.getElementById('replay-div').style.display = 'block';
	document.getElementById('guessing-div').style.display = 'none';
}

function showAnswer(won){ 
	const element = document.getElementById('code');
	element.classList.remove('success');
	element.classList.remove('failure');
	element.innerHTML = answer.value;
	if(won){
		element.classList.add('success');
	}
	else{
		element.classList.add('failure');
	}
}

function getResults(result){
	if(result == null){
		return '';
	}
	var input = result.value;
	
	let correct = 0;
	let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	input.split('').forEach((value, index) => {
		const idx = answer.value.indexOf(value);
		if(idx === -1){ 
			html = html + '<span class="glyphicon glyphicon-remove"></span>'
		}
		else if(idx === index){ 
			html = html + '<span class="glyphicon glyphicon-ok"></span>'; 
			correct = correct+1; 
		}
		else{ 
			html = html + '<span class="glyphicon glyphicon-transfer"></span>' 
		}
	});
	html =  html + '</div></div>';

		
	document.getElementById('results').innerHTML += generateHtml(result.value);
	
	return correct === 4;
}

function generateHtml(result){
	var Guess = '<div class="row"><span class="col-md-6">' + result + '</span><div class="col-md-6">';
	var resultText = generateResults(result);
	var Result =  resultText + '</div>';
	
	return Guess + Result + '</div>';
}

function generateResults(result){
	let html = '';
	
	if(result == null)
		return html;
	
	result.split('').forEach((value, index) => {
		const idx = answer.value.indexOf(value);
		if(idx === -1){ 
			html = html + '<span class="glyphicon glyphicon-remove"></span>'
		}
		else if(idx === index){ 
			html = html + '<span class="glyphicon glyphicon-ok"></span>'; 
			correct = correct+1; 
		}
		else{ 
			html = html + '<span class="glyphicon glyphicon-transfer"></span>' 
		}
	});
	
	return html;
}


function setHiddenFields(){
		const random = Math.floor(Math.random()*10000);
		const randomAsString = '0000'+random.toString();
	
		answer.value = randomAsString.substr(randomAsString.length-4);
		attempt.value = 0;
}

function isEmpty(value){
	return value == null || value === '' || value === 0;
}

function setMessage(message){
	document.getElementById('message').innerHTML = message;
}

function validateInput(value){
	if(value.length === 4){
		return true
	}
	
	setMessage("Guesses must be exactly 4 characters long.");
	return false;
}

//implement new functions here