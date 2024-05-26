function getRandomLetter () {
    const isUpper = Math.random() < 0.5
    if (isUpper){
        return String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }else {
        return String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
}

function getRandomChar () {
    const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "=", "?"]
    return symbols[Math.floor(Math.random() * symbols.length)]
}

function getRandomNum () {
    return Math.floor(Math.random() * 10)
}

function getRandomSymbol () {
    return  String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33)
}

export function generatePassword () {
    const types = ["letter", "letter", "letter", "char", "num"]
    const randomSymbolsAmount = Math.floor(Math.random() * (16 - 6 + 1)) + 6
    const aChar = getRandomChar()
    const aLetter = getRandomLetter()
    const aNum = getRandomNum()
    let randomSymbolsArr = []

    for (let i = 0; i < (randomSymbolsAmount - 3); i++){
        const type = types[Math.floor(Math.random() * types.length)]
        if (type==="letter"){
            randomSymbolsArr.push(getRandomLetter())
        }else if (type==="char"){
            randomSymbolsArr.push(getRandomChar())
        }else{
            randomSymbolsArr.push(getRandomNum())
        }
    }

    randomSymbolsArr.splice(Math.floor(Math.random() * randomSymbolsArr.length), 0, aChar)
    randomSymbolsArr.splice(Math.floor(Math.random() * randomSymbolsArr.length), 0, aLetter)
    randomSymbolsArr.splice(Math.floor(Math.random() * randomSymbolsArr.length), 0, aNum)

    return randomSymbolsArr.join("")
}