// NOTE: wordSmith functions from lines 4 - 39


// information to reach API
const dataMuseUrl = 'https://api.datamuse.com/words?';
const queryParams1 = 'rel_ant=';
const queryParams2 = 'rel_syn=';
const queryParams3 = 'rel_rhy=';

// selecting page elements
const inputField = document.querySelector('#input');
const submit1 = document.querySelector('#submit1');
// const submit2 = document.querySelector('#submit2');
// const submit3 = document.querySelector('#submit3');
// const responseField1 = document.querySelector('#responseField1');
// const responseField2 = document.querySelector('#responseField2');
// const responseField3 = document.querySelector('#responseField3');

// AJAX function for antonym
const getAntonyms = () => {
  const wordQuery = inputField.value;
  const endPoint = dataMuseUrl + queryParams1 + wordQuery;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse1(xhr.response);
    }
  };
  xhr.open('GET', endPoint);
  xhr.send();
}

// AJAX function for synonym

const getSynonyms = () => {
  const wordQuery = inputField.value;
  const endPoint = dataMuseUrl + queryParams2 + wordQuery;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      renderResponse2(xhr.response);
    }
  };
  xhr.open('GET', endPoint);
  xhr.send();
}


// clear previous results and display results to webpage
const displaySuggestions1 = (event) => {
  event.preventDefault();
  while(responseField1.firstChild){
    responseField1.removeChild(responseField1.firstChild);
  };
 
  getAntonyms();

};
const displaySuggestions2 = (event) => {
  event.preventDefault();
 
   while(responseField2.firstChild){
    responseField2.removeChild(responseField2.firstChild);
  };
  
 
  getSynonyms();
  
};


submit1.addEventListener('click', displaySuggestions1);
submit1.addEventListener('click', displaySuggestions2);






// Formats response to look presentable on webpage

// for antonym
const renderResponse1 = (res) => {
    // Handles if res is falsey
    if(!res){
      console.log(res.status);
    }
    // In case res comes back as a blank array
    if(!res.length){

      responseField1.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><p>Try again!</p><p>There were no suggestions found!</p></div>";
    
      return;
    }
  
    // Creates an empty array to contain the HTML strings
    let wordList1 = [];
    // Loops through the response and caps off at 10
    for(let i = 0; i < Math.min(res.length, 10); i++){
      // creating a list of words
      wordList1.push(`<li>${res[i].word}</li>`);
    }
    // Joins the array of HTML strings into one string
    wordList1 = wordList1.join("");
  
    // Manipulates responseField to render the modified response
    responseField1.innerHTML = `<p>You might be interested in:</p><ol>${wordList1}</ol>`;
    return
  }

  // for synonym
  const renderResponse2 = (res) => {
  
    if(!res){
      console.log(res.status);
    }
  
    if(!res.length){
      responseField2.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><p>Try again!</p><p>There were no suggestions found!</p></div>";
      return;
    }
  
  
    let wordList2 = [];
   
    for(let i = 0; i < Math.min(res.length, 10); i++){
     
      wordList2.push(`<li>${res[i].word}</li>`);
    }
   
    wordList2 = wordList2.join("");
  
   
    responseField2.innerHTML = `<p>You might be interested in:</p><ol>${wordList2}</ol>`;
    return
  }
// for rhyming
  const renderResponse3 = (res) => {
    
    if(!res){
      console.log(res.status);
    }
  
    if(!res.length){
      responseField3.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\"><p>Try again!</p><p>There were no suggestions found!</p></div>";
      return;
    }
  
   
    let wordList3 = [];
   
    for(let i = 0; i < Math.min(res.length, 10); i++){
      // creating a list of words
      wordList3.push(`<li>${res[i].word}</li>`);
    }
    // Joins the array of HTML strings into one string
    wordList3 = wordList3.join("");
  
    // Manipulates responseField to render the modified response
    responseField3.innerHTML = `<p>You might be interested in:</p><li>${wordList3}</li>`;
    return;
  }

/*

  // Renders response before it is modified
const renderRawResponse = (res) => {
    // Takes the first 10 words from res
    let trimmedResponse = res.slice(0, 10);
    // Manipulates responseField to render the unformatted response
    responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
  }

  */





