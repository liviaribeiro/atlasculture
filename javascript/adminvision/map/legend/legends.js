
const openCloseLegend = (itemMenu) => {
    if (document.getElementById(itemMenu).style.width == "30px") {
        document.getElementById(itemMenu).style.width = "257px";
    }
    else{
        document.getElementById(itemMenu).style.width = "30px";
    }
}

const openLegend = (itemMenu) => {
    var width = px*(100/document.documentElement.clientWidth)-63*px;
    console.log(width);
    document.getElementById(itemMenu).style.width = "width";
}


const hideLegend = (equipementID) => {
    var legend = document.getElementById("legend-"+equipementID);
    console.log("legend-"+equipementID);
    legend.style.display = "none";
}

const addLegend = (indicator, layers, colors) => {

    let legendBox = document.getElementById('legend-box');
    var infoButton = document.createElement('button');
    infoButton.className = "infobtn";
    infoButton.onclick = function () {showInfo(indicator)};
    var closeButton = document.createElement('button');
    closeButton.className = "closebtn";
    closeButton.onclick = function () {showLayer(indicator)};
    var legend = document.createElement('div');
    legend.appendChild(closeButton);
    legend.appendChild(infoButton);
    legend.className = "legend shadow-sm p-3 my-2 bg-white";
    legend.setAttribute('id', "legend-"+indicator);
    var title = document.createElement('div');
    title.className = "title-legend mb-3 mt-3";
    title.innerHTML = indicator;
    legend.appendChild(title);



    for (let i = 0;  i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        var value = document.createElement('span');
        value.innerHTML = layer;
        value.className = 'legend-value';
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
        legendBox.appendChild(legend);
    }

    legend.style.display = 'none';
}


const addLegendCircle = (indicator, layers, radius, color) => {
    let legendBox = document.getElementById('legend-box');
    var infoButton = document.createElement('button');
    infoButton.className = "infobtn";
    infoButton.onclick = function () {showInfo(indicator)};
    var closeButton = document.createElement('button');
    closeButton.className = "closebtn";
    closeButton.onclick = function () {showLayer(indicator)};
    var legend = document.createElement('div');
    legend.appendChild(closeButton);
    legend.appendChild(infoButton);
    legend.className = "legend shadow-sm p-3 my-2 bg-white";
    legend.setAttribute('id', "legend-"+indicator);
    var title = document.createElement('div');
    title.className = "title-legend mb-3 mt-3";
    title.innerHTML = indicator;
    legend.appendChild(title)

    for (let i = 0;  i < layers.length; i++) {
        var layer = layers[i];
        var color = color;
        var diam = radius[i]*2;
        var item = document.createElement('div');
        item.className = "row"
        var col1 = document.createElement('div');
        col1.className = "col d-flex justify-content-center"
        var key = document.createElement('div');
        key.className = 'legend-circle';
        key.style.backgroundColor = color;

        key.style.height = diam+"px";
        key.style.width = diam+"px";

        var col2 = document.createElement('div');
        col2.className = "col d-flex align-items-center";
        var value = document.createElement('div');
        value.innerHTML = layer;
        value.className = 'legend-value';
        item.appendChild(col1);
        col1.appendChild(key);
        item.appendChild(col2);
        col2.appendChild(value);
        legend.appendChild(item);
        legendBox.appendChild(legend);
    }
    legend.style.display = 'none';
}

const addLegendEquipement = (indicator, equipementID, color) => {
    let legendBox = document.getElementById('legend-box');
    var infoButton = document.createElement('button');
    infoButton.className = "infobtn";
    infoButton.onclick = function () {showInfo(equipementID)};
    var closeButton = document.createElement('button');
    closeButton.className = "closebtn";
    closeButton.onclick = function () {showLayer(equipementID)};
    var legend = document.createElement('div');
    legend.appendChild(closeButton);
    legend.appendChild(infoButton);
    legend.className = "legend shadow-sm p-3 my-2 bg-white";
    var legendID = "legend-"+equipementID;
    legend.setAttribute('id', legendID);

    var item = document.createElement('div');
    item.className = "row inline mt-2"
    var col1 = document.createElement('div');
    col1.className = "col-2 d-flex align-items-center"
    var key = document.createElement('img');

    key.src = color;
    key.style.height = "10px";

    var col2 = document.createElement('div');
    col2.className = "col-10 d-flex align-items-center";
    var value = document.createElement('div');
    value.innerHTML = indicator;
    value.className = 'title-legend mb-3 mt-3';
    item.appendChild(col1);
    col1.appendChild(key);
    item.appendChild(col2);
    col2.appendChild(value);
    legend.appendChild(item);
    legendBox.appendChild(legend);

    legend.style.display = 'none';
}

const addLegendSymbol = (indicator, marker) => {

    let legendBox = document.getElementById('legend-box');
    var infoButton = document.createElement('button');
    infoButton.className = "infobtn";
    infoButton.onclick = function () {showInfo(indicator)};
    var closeButton = document.createElement('button');
    closeButton.className = "closebtn";
    closeButton.onclick = function () {showLayer(indicator)};
    var legend = document.createElement('div');
    legend.appendChild(closeButton);
    legend.appendChild(infoButton);
    legend.className = "legend shadow-sm p-3 my-2 bg-white";
    legend.setAttribute('id', "legend-"+indicator);

    var color = color;
    var item = document.createElement('div');
    item.className = "row inline mt-2"
    var col1 = document.createElement('div');
    col1.className = "col-2 d-flex justify-content-center align-items-center"
    var key = document.createElement('img');
    item.appendChild(col1);
    col1.appendChild(key);
    key.src = marker;
    key.style.height = "20px";

    var col2 = document.createElement('div');
    col2.className = "col-10 d-flex align-items-center";
    var value = document.createElement('div');
    value.innerHTML = indicator;
    value.className = 'title-legend mb-3 mt-3';

    item.appendChild(col2);
    col2.appendChild(value);
    legend.appendChild(item);
    legendBox.appendChild(legend);

    legend.style.display = 'none';
}
window.addLegend = addLegend
window.hideLegend = hideLegend
window.openCloseLegend = openCloseLegend
window.openLegend = openLegend
window.addLegendCircle = addLegendCircle
window.addLegendEquipement = addLegendEquipement
window.addLegendSymbol = addLegendSymbol

export { addLegend, hideLegend,openCloseLegend, openLegend, addLegendCircle,addLegendEquipement, addLegendSymbol }
