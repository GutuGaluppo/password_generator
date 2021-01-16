const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
	const length = +lengthEl.value // the plus singn infront of the lenghtEl parses it into a number
	const hasLower = lowercaseEl.checked
	const hasUpper = uppercaseEl.checked
	const hasNumbers = numbersEl.checked
	const hasSymbols = symbolsEl.checked

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length)
})

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = ''
	const typesCount = lower + upper + number + symbol
	const typesArr = [{ lower }, { upper }, { number }, { symbol }]
		.filter(item => Object.values(item)[0])

	if (typesCount === 0) {
		return ''
	}
	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0]
			generatedPassword += randomFunc[funcName]()
		})
	}

	const finalPassword = generatedPassword.slice(0, length)
	return finalPassword

}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
	// check the char code here: https://www.w3schools.com/html/html_charset.asp
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol() {
	// return String.fromCharCode(Math.floor(Math.random() * 14) + 33) OR
	const symbols = "!@#$%^&*()+,-./{}[]=<>'"
	return symbols[Math.floor(Math.random() * symbols.length)]
}