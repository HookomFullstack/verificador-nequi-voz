import {remote} from 'webdriverio'
import projectPath from 'path'
import 'dotenv/config'

import { readNumbers } from './helpers/numbers/read/index.mjs';
import { addLive } from './helpers/numbers/add/addLive.mjs';
import { addDead } from './helpers/numbers/add/addDead.mjs';
import { clearNumbers } from './helpers/numbers/delete/clearNumbers.mjs';

const androidAppPath = projectPath.join(
  process.cwd(),
  "app/nequi.apk"
);


const capabilities = {
    "platformName": 'Android',
    "appium:deviceName": process.env.NAME_DEVICE,
    "appium:platformVersion": process.env.VERSION_DEVICE,
    "appium:automationName": "UIAutomator2",
    "appium:app": androidAppPath 
}

const wdOpts = {
  hostname: process.env.HOSTNAME,
  port: Number(process.env.PORT),
  logLevel: 'silent',
  capabilities, 
};

async function runTest(numbersArr) {
    console.log('Por favor conecte un dispositivo...'.blue)
    const driver = await remote(wdOpts)
    console.log('Dispositivo conectado con éxito'.green)
    try {
        const jumpPageSelector = '//*[@text="Salta"]'
        const onSessionSelector = '//*[@text="Entra"]'
        const backSessionSelector = '//*[@text="arrow back outline"]'
        const inputLoginSelector = '//android.widget.EditText'
        const successUserSelector = '//*[@text="Escribe tu clave"]'
        
        await driver.$(jumpPageSelector).waitForExist({ timeout: 10000 })
        await driver.$(jumpPageSelector).click()
        
        await driver.$(onSessionSelector).waitForExist({ timeout: 10000 })
        await driver.$(onSessionSelector).click()

        for (const number of numbersArr) {   
                        
            console.log(`Numero: ${number} procesando`.blue)
            await driver.$(inputLoginSelector).waitForExist({ timeout: 10000 })
            const inputLogin = await driver.$(inputLoginSelector)
            await inputLogin.clearValue()
            await inputLogin.addValue(`${number}`)
            await driver.$(onSessionSelector).waitForExist({ timeout: 10000 })
            await driver.pause(100)
            await driver.$(onSessionSelector).click()
            
            try {
                await driver.$(backSessionSelector).waitForExist({ timeout: 10000 })
                const success = await driver.$(successUserSelector)
                success?.error?.message != 'An element could not be located on the page using the given search parameters.' ? await addLive(Number(number)) : await addDead(number)
                clearNumbers(number)
            } finally {
                await driver.$(backSessionSelector).click()
                await driver.$(inputLoginSelector).waitForExist({ timeout: 10000 })
                await inputLogin.clearValue()
            }
        }
    } finally {
        await driver.deleteSession()
        const numbersArr = await readNumbers()
        return await runTest(numbersArr)
    }
}
const numbersArr = await readNumbers()
runTest(numbersArr).catch(console.error);