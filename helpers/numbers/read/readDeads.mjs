import fs from "fs"

// Leer las deads
export const readDeads = new Promise((resolve, reject) => {
    fs.readFile('./db/deads.txt', 'utf8', (err, data) => {
        if (err) reject(err)
        // eliminar lineas vacias
        return resolve(data.split(',').map(line => Number( line.trim() )))
    })
});