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