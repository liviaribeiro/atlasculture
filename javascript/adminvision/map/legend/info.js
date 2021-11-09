import { addcomplementaryRessource } from './complementaryRessource.js'

const addInfo = (indicator, equipementID, definition, source, year) => {
    let legendBox = document.getElementById('legend-box');
    let closeButton = document.createElement('button');
    closeButton.className = "closebtn";
    closeButton.onclick = function () {showInfo(hideInfo(equipementID))};
    const info = document.createElement('div');
    const cleanIndicator = indicator.toLowerCase().replace(/[\t\n\v\f\r \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/g,'-')

    info.className = `legend shadow-sm p-3 mb-1 bg-white info-indicator-${cleanIndicator}`;
    info.setAttribute('id', "info-"+equipementID);

    info.appendChild(closeButton);
    var title = document.createElement('div');
    title.className = "title-legend mb-3 mt-3";
    title.innerHTML = indicator;
    info.appendChild(title);
    info.style.display = 'none';
    legendBox.appendChild(info);
    var definitionTitle = document.createElement('p');
    definitionTitle.className = "subtitle3";
    definitionTitle.innerHTML = "Définition";
    info.appendChild(definitionTitle);
    var definitionContent = document.createElement('p');
    definitionContent.innerHTML = definition;
    info.appendChild(definitionContent);
    var sourceTitle = document.createElement('p');
    sourceTitle.innerHTML = "Source";
    sourceTitle.className = "subtitle3";
    var sourceContent = document.createElement('p');
    sourceContent.innerHTML = source + ', ' + year;
    info.appendChild(sourceTitle);
    info.appendChild(sourceContent);

    addcomplementaryRessource(indicator);
}
const showInfo = (equipementID) => {
    console.log("info-"+equipementID);
    const info = document.getElementById("info-"+equipementID);
    info.style.display = "block";
    var legend = document.getElementById("legend-"+equipementID);
    console.log("legend-"+equipementID);
    legend.style.display = "none";
}

const hideInfo = (equipementID) => {
    console.log("info-"+equipementID);
    const info = document.getElementById("info-"+equipementID);
    info.style.display = "none";
    var legend = document.getElementById("legend-"+equipementID);

    console.log("legend-"+equipementID);
    legend.style.display = "block";
}


window.showInfo = showInfo
window.hideInfo = hideInfo
window.addInfo = addInfo

export { showInfo, hideInfo, addInfo }
