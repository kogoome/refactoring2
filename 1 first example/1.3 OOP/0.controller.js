import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

async function importJson(_JsonFileName) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, `../database/${_JsonFileName}.json`)
  const jsonDB = new Low(new JSONFile(file))
  await jsonDB.read()
  return jsonDB
}

async function getJsonData (jsonFileName) {
  let result = {}
  switch (jsonFileName) {
    case 'invoices':
      result = (await importJson(jsonFileName)).data[0]
      break
    default:
      result = (await importJson(jsonFileName)).data
  }
  return result
}

export const invoice = await getJsonData('invoices')
export const plays = await getJsonData('plays')

