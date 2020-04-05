console.log('Client side javascript file loaded')


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ""
messageTwo.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
    
    fetch('/weather?address='+location).then((response) => {
        response.json().then((body) => {
            if(body.error) {
                messageOne.textContent = body.error
                messageTwo.textContent = ""
            } else {
                messageOne.textContent = body.location
                messageTwo.textContent = body.forecast
            }
        })
    })
})