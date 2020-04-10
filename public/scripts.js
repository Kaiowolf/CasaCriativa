function onOff() {
  document
    .querySelector("#modal")
    .classList
    .toggle("hide")

  document.querySelector("body")
  .classList
  .toggle("hidenScroll")

  document.querySelector('#modal')
  .classList
  .toggle('addScroll')
}

function checkFields(event) {

  const valuesToCheck = [

    "title",
    "category",
    "image",
    "description",
    "link",

  ]

  //trim tira espaços de ums string


  const isEmpty = valuesToCheck.find(function(value) {
    
    const checkIfIsString = typeof event.target[value].value === "string";
    const chekIfIsEmpty = !event.target[value].value.trim();

    if(checkIfIsString && chekIfIsEmpty) {
      return true
    }
  })

  if(isEmpty) {
    event.preventDefault()
    alert('Por favor, preencha todos os campos.')
  }
}

function buttonDelete () {

  document.querySelector("body").classList.toggle("Delete")
}