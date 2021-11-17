import { loadDataVariablesRich } from '../context/loadDataVariables.js'
import { loadDataEquipementType } from '../context/loadDataEquipementType.js'
const addcomplementaryRessource = (indicator) => {
  const cleanIndicator = indicator.toLowerCase().replace(/[\t\n\v\f\r \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/g,'-')
  const infoBtnId = document.getElementById(`info-btn-id-${cleanIndicator}`)


  if (infoBtnId) {


    infoBtnId.addEventListener('click', (event) => {

      insertVariableCR(indicator,cleanIndicator);
      insertEquipementTypeCR(indicator,cleanIndicator);
    })

  }


}

const insertEquipementTypeCR = (indicator,cleanIndicator) => {

}
const insertVariableCR = (indicator,cleanIndicator) => {
        dataVariablesRichGlobal.forEach((dataRich) => {

        if (dataRich.variable.nom == indicator) {
          if (document.getElementById(`info-indicator-${cleanIndicator}-active`) == null) {
            const elementLegendeBox = event.currentTarget.parentNode.parentNode
            const infoElement = elementLegendeBox.querySelector(`.info-indicator-${cleanIndicator}`)
            let i = 0
            infoElement.insertAdjacentHTML("beforeend", `
              <div style='background-color: #FFE2DE; padding:8px;' id='info-indicator-${cleanIndicator}-active'>
                <p class='subtitle3'>
                  Pour aller plus loin
                </p>
              </div>`);
            dataRich.complementary_ressource.forEach(cr => {
              if (cr.link != '') {
                const htmlCR = `
                <div class="cr-content">
                  <p>
                    <a href="${cr.link}" target='_blank'>
                      ${cr.name}
                    </a>
                  </p>
                </div>
                `
                const insertContentInfoCR = document.getElementById(`info-indicator-${cleanIndicator}-active`)
                insertContentInfoCR.insertAdjacentHTML("beforeend", `${htmlCR}`);
                i = i + 1
              }
            })

          }

        }
      })
}

export { addcomplementaryRessource }
