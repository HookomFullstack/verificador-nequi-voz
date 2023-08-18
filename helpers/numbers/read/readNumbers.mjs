import fs from "fs"
import { readLives, readDeads } from "./index.mjs";
import _ from 'lodash';
import 'dotenv/config'

// leer archivo cards/tarjetas.txt
export const readNumbers = async() => await new Promise(async(resolve, reject) => {
    const lives = await readLives
    const deads = await readDeads
    const data = fs.readFileSync('./db/numbers.txt', {encoding: 'utf-8'} )
    if(data == false) {
        const geneNumbers = _.range(process.env.RANGO_DESDE, process.env.RANGO_HASTA).map(e => Number(process.env.LINE_TELEFONIC + e)).filter(e => { 
            if(lives.includes(e) === true) return
            if(deads.includes(e) === true) return
            return e
        })
        fs.writeFile('./db/numbers.txt', `${geneNumbers}`, {encoding: 'utf-8'}, (err) => {
            if(err) reject(err)
            resolve(geneNumbers)
        })
    } 
    const verifyExistPassword = data.split(',').map(e => e.includes('|') ? e.split('|') : e )
    return resolve(verifyExistPassword)
})

readNumbers()