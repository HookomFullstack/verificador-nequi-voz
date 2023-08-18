import fs from 'fs'

export const clearNumbers = (numero) => {

    fs.readFile('./db/numbers.txt', 'utf8', (err, data) => {
        // eliminar la tarjeta
        const numeros = data.split(',')
        // eliminar la tarjeta
        const numerosTotal = numeros.filter(e => e != numero)
        
        // guardar en archivo
        const save = numerosTotal.join(',')
        fs.writeFile('./db/numbers.txt', save, (err) => {
            if (err) throw err;
            return
        })
        return
    })
}