import { loadDataVariablesRich } from '../context/loadDataVariables.js'
const addcomplementaryRessource = (indicator) => {
  const cleanIndicator = indicator.toLowerCase().replace(/[\t\n\v\f\r \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/g,'-')
  const infoBtnId = document.getElementById(`info-btn-id-${cleanIndicator}`)
  if (infoBtnId) {
    infoBtnId.addEventListener('click', (event) => {
      dataVariablesRichGlobal.forEach((dataRich) => {
      if (dataRich.variable.nom == indicator) {
          const elementLegendeBox = event.currentTarget.parentNode.parentNode
          const infoElement = elementLegendeBox.querySelector(`.info-indicator-${cleanIndicator}`)

          dataRich.complementary_ressource.forEach(cr => {
            infoElement.insertAdjacentHTML("beforeend", `<li>${cr.link}</li>`);
          })

          // infoElement.insertAdjacentHtml('beforeend', '<p>Coco</p>')
          // console.log(dataRich.variable.definition)


          }
        })
      })

  }


}

export { addcomplementaryRessource }
