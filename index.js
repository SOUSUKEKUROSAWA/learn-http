// intro async
console.log("1")

setTimeout(() => {
    console.log("2")
}, 1000)

console.log("3")

// promise
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

// await
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
