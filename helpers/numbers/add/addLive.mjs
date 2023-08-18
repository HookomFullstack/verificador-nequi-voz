import { readLives } from "../read/index.mjs"
import colors from "colors"
import fs from 'fs'

export const addLive = async(data) => {
    
    // agrega live en lives.txt
    await readLives.then(txtLives => {
        if(txtLives.includes(data)) return console.log(`Número vivo ya existente ${data}`.red)

        fs.appendFile('./db/lives.txt', data+',', {encoding: 'utf-8'}, (err) => {
            if (err) throw err;
            return console.log(`Número encontrado con éxito ${data}`.green);
        })
    })

}

addLive(3012000934)