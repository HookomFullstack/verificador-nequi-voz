import { readDeads } from "../read/index.mjs"
import colors from "colors"
import fs from 'fs'

export const addDead = async(data) => {
    // agrega live en lives.txt
    await readDeads.then(txtLives => {
        if(txtLives.includes(data)) return console.log(`Número muerto ya existente ${data}`.red)

        fs.appendFile('./db/deads.txt', data+',', {encoding: 'utf-8'}, (err) => {
            if (err) throw err;
            return console.log(`No existe ${data}`.red);
        })
    })

}