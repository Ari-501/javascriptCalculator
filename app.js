const topDisplay = document.querySelector('[data-top-display]')
const bottomDisplay = document.querySelector('[data-bottom-display]')
const numbers = document.querySelectorAll('[data-number]')
const equals = document.querySelector('[data-equals]')
const clear = document.querySelector('[data-clear]')
const operation = document.querySelectorAll('[data-operator]')
const undo = document.querySelector('[data-delete]')

let number = ''
let previousNumber = ''
let currentNumber = ''
let mathOperation = ''
bottomDisplay.innerHTML = 0

numbers.forEach(numbers => numbers.addEventListener('click', (e) => {
    if(e.target.innerHTML === '.' && number.includes('.')) return
    if(e.target.innerHTML === '0' && number.length < 1) return
    if(number.length > 14) {
        bottomDisplay.innerHTML = 'DIGIT LIMIT MET'
        return
    }
    number = number + e.target.innerHTML
    bottomDisplay.innerHTML = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}))

operation.forEach(operation => operation.addEventListener('click', function(e) {
    if(previousNumber != '' && number != '') {
        compute()
        mathOperation = e.target.innerHTML
        bottomDisplay.innerHTML = mathOperation
        topDisplay.innerHTML = previousNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + mathOperation  
    } else if (previousNumber != '' && number == '') {
        if(e.target.innerHTML == '-') {
            mathOperation = mathOperation + e.target.innerHTML
            bottomDisplay.innerHTML = mathOperation
            topDisplay.innerHTML = previousNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + mathOperation
        } else {
        mathOperation = e.target.innerHTML
        bottomDisplay.innerHTML = mathOperation
        topDisplay.innerHTML = previousNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + mathOperation
        }
    } else if(previousNumber == '' && number == '') {
        number = 0
        previousNumber = 0
        mathOperation = e.target.innerHTML
        previousNumber = number.toString()
        bottomDisplay.innerHTML = mathOperation
        topDisplay.innerHTML = previousNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + mathOperation
        number = ''
    } else {
        mathOperation = e.target.innerHTML
        previousNumber = number.toString()
        bottomDisplay.innerHTML = mathOperation
        topDisplay.innerHTML = previousNumber.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + mathOperation
        number = ''
    }
}))

equals.addEventListener('click', compute)

function compute() {
    currentNumber = number.toString()
    let equation
    const prev = parseFloat(previousNumber)
    const current = parseFloat(currentNumber)
    if (isNaN(prev) || isNaN(current)) return
    switch (mathOperation) {
        case '+':
            equation = prev + current
            break
        case '-':
            equation = prev - current
            break
        case 'x':
            equation = prev * current
            break
        case '÷':
            equation = prev / current
            break
        case 'x-':
            equation = prev * current * -1
            break
        case '+-':
            equation = prev - current
            break
        case '÷-':
            equation = prev / current * -1
    }
    bottomDisplay.innerHTML = equation.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    topDisplay.innerHTML = ''
    number = ''
    previousNumber = equation
}

clear.addEventListener('click', function() {
    number = ''
    previousNumber = ''
    currentNumber = ''
    mathOperation = ''
    bottomDisplay.innerHTML = 0
    topDisplay.innerHTML = ''
})

undo.addEventListener('click', function() {
    number = number.slice(0, -1)
    bottomDisplay.innerHTML = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
})

