/**
 * ブラウザの検証モードで使用
 */

/**
 * intro async
 */
console.log("1")

setTimeout(() => {
    console.log("2")
}, 1000)

console.log("3")

/**
 * promise 
 */
const getRandomBool = () => Math.random() > 0.5

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (getRandomBool()) {
            resolve("success")
        } else {
            reject("fail")
        }   
    }, 1000)
})

promise.then(message => {
    console.log(`resolved: ${message}`)
}).catch(message => {
    console.log(`rejected: ${message}`)
})

/**
 * await
 */
const getRandomBool = () => Math.random() > 0.5

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (getRandomBool()) {
            resolve("success")
        } else {
            reject("fail")
        }   
    }, 1000)
})

const message = await promise
console.log(message)

/**
 * try/catch
 */
// ex.1
const speed = car.speed
// クラッシュする

try {
    const speed = car.speed
} catch (error) {
    console.log(error)
    // 適切にエラーを扱える
}
// ex.2
try {
    printCharacterStats(4)
    printCharacterStats("ten") // ここでエラーが発生
    printCharacterStats(10) // この行は実行されない
} catch (error) {
    console.log(error)
}

function printCharacterStats(level) {
    if (isNaN(level)) {
        throw "Parameter is not a number"
    }
    console.log(`level: ${level}`)
}
