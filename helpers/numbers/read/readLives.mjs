import fs from "fs"

// Leer las lives
export const readLives = new Promise((resolve, reject) => {
    fs.readFile('./db/lives.txt', 'utf8', (err, data) => {
        if (err) reject(err)
        // eliminar lineas vacias
        return resolve(data.split(',').map(line => Number( line.trim() )))
    })
})