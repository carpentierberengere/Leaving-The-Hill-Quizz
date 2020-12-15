const section = document.querySelector('.quizz')

const shuffle = (array) => {
  let j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  answers = array
}

let i = 0

fetch('https://opentdb.com/api.php?amount=20&category=11&difficulty=medium&type=multiple')
  .then(response => response.json())
  .then((quizzApi) => {
    console.log(quizzApi)

    for (let element of quizzApi.results) {
      let answers = []
      let correctAnswer = element.correct_answer
      const question = document.createElement('div')
      question.className = 'question'
      question.innerHTML = element.question
      const possibility = document.createElement('div')
      possibility.className = 'possibility'
      answers.push(element.correct_answer)
      for (let elem of element.incorrect_answers) {
        answers.push(elem)
      }

      shuffle(answers);  
      

      let name = element.question 
      for (let el of answers) {
        const bigDiv = document.createElement('div')
        bigDiv.className = 'bigDiv'

        const checkboxAnswers = document.createElement('input') 
        checkboxAnswers.setAttribute('type', 'radio')
        checkboxAnswers.setAttribute('name', name)

        const checkboxAnswersLabel = document.createElement('label')
        checkboxAnswersLabel.innerHTML = el

        bigDiv.appendChild(checkboxAnswers)
        bigDiv.appendChild(checkboxAnswersLabel)
        possibility.appendChild(bigDiv)
        possibility.appendChild(checkboxAnswers)
        possibility.appendChild(checkboxAnswersLabel)

        let point = true  

        checkboxAnswers.addEventListener('click', function () {
          let labels = document.querySelectorAll('label')
          for (let e of labels) {
            e.classList.remove('blue')
            e.classList.remove('red')
          }
          if (checkboxAnswersLabel.innerHTML == correctAnswer) { 
            checkboxAnswersLabel.classList.add('blue')
            const score = document.querySelector('.score')
            if (point == true){
              i += 1
              point = false
              score.innerHTML = 'CURRENT SCORE <i class="fas fa-arrow-right fa-lg"></i> ' + i
            }
          } else {
            checkboxAnswersLabel.classList.add('red')
          }
        })
      }
      section.appendChild(question)
      section.appendChild(possibility)

    }

  })
  .catch(error => {
    console.log('ERROR', error)
  })

