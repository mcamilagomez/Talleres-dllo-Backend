//Punto 1
function findMax(numeros=[]){
    let n=0
    for(let i=0; i<numeros.length;i++){
        if (n<numeros[i]){
            n=numeros[i]
        }

    }
    return n
}
//const num=[3,17,-1,4,-19]
//console.log(findMax(num))


//Punto 2
function includes(numeros=[], num){
    for(let i=0; i<numeros.length;i++){
        if(num == numeros[i]){
            return true
        }
    }
    return false
}
//const n=[3,17,-1,4,-19]
//console.log(includes(n,-90))

//Punto 3
function sum(numeros=[]){
    let sum=0
    for(let i=0;i<numeros.length;i++){
        sum+=numeros[i]
    }
    return sum
}
//console.log(sum(n))


//Punto 4
function missingNumbers(numeros=[]) {
    if (numeros.length === 0){
        return[]
    }
    
    let min = numeros[0]
    let max = numeros[0]
    for (let num of numeros) {
        if (num < min){
            min = num
        } 
        if (num > max){
            max = num
        } 
    }
    
    let missing = []
    for (let i = min; i <= max; i++) {
        let found = false
        for (let num of numeros) {
            if (num === i) {
                found = true
                break
            }
        }
        if (!found) {
            missing.push(i);
        }
    }
    
    return missing;
}
const n=[7,2,4,6,3,9]
console.log(missingNumbers(n))
