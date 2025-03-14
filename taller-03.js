//Punto 1
function filtrar(item) {
    if (["a", "e", "i", "o", "u"].includes(item)) {
        return true
    }
    return false
}

function desglosarString(palabra, op){
    const lista = palabra.split("")
    if (op === "vocales"){
        return lista.filter(filtrar).length
    }else if (op === "consonantes"){
        return palabra.length - lista.filter(filtrar).length
    }
    return Error
    
}
const palabra = "murcielagos"
console.log(desglosarString(palabra, "vocales"))
console.log(desglosarString(palabra, "consonantes"))

//Punto 2
function twoSum(nums, target){
    return nums
        .map((num, i) => [num, i]) 
        .filter(([num, i], _, arr) => arr.some(([otherNum, j]) => i !== j && num + otherNum === target))
        .map(pair => pair[1]) 
        .slice(0, 2)
}
console.log(twoSum([2, 7, 11, 15], 9))
console.log(twoSum([3, 4, 2], 6))


//Punto 3
const valoresRomanos = {
    'I': 1,
    'V': 5, 
    'X': 10, 
    'L': 50,
    'C': 100, 
    'D': 500, 
    'M': 1000
}

function obtenerListaNumerica(numRomano) {
    return numRomano.split('').map(letra => valoresRomanos[letra])
}

function calcularValor(list) {
    let resultado = 0
    for (let i = 0; i < list.length; i++) {
        let valoract = list[i]
        let valossgt = list[i + 1]

        if (valossgt && valoract < valossgt) {
            resultado -= valoract
        } else {
            resultado += valoract
        }
    }
    return resultado
}


function conversionRomana(numRomano) {
    let listaNumeros = obtenerListaNumerica(numRomano)
    return calcularValor(listaNumeros)
}


console.log(conversionRomana("III"));      
console.log(conversionRomana("XIV"));      
console.log(conversionRomana("MMXXIV"));   
console.log(conversionRomana("MXMVII"));  
