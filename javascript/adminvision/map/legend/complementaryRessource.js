import { loadDataVariablesRich } from '../context/loadDataVariables.js'
const addcomplementaryRessource = (indicator) => {

  dataVariablesRichGlobal.forEach((dataRich) => {
    console.log(dataRich)
    if (dataRich.variable.nom == indicator) {
        dataRich.variable.definition
    }
  })

}

export { addcomplementaryRessource }
