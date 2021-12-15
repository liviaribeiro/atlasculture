const addViewListVariables = (layerName, layerPk) => {
    const layers_list = document.getElementById('div-list');
    var layer_element_li = document.createElement('li');
    var layer_element = document.createElement('div');
    layer_element.className = "div-item-list d-flex justify-content-between"
    layer_element.innerHTML = layerName;
    var layer_toDownload = document.createElement('button');
    layer_toDownload.className = "btn btn-show-list";
    layer_toDownload.onclick = function() {showListVariables(layerPk);}
    layer_toDownload.innerHTML = 'Afficher la liste';
    layer_element.appendChild(layer_toDownload);
    layer_element_li.appendChild(layer_element);
    layers_list.appendChild(layer_element);
}

const addViewListEquipements = (layerName, layerPk) => {
    const layers_list = document.getElementById('div-list');
    var layer_element_li = document.createElement('li');
    var layer_element = document.createElement('div');
    layer_element.className = "div-item-list d-flex justify-content-between"
    layer_element.innerHTML = layerName;
    var layer_toDownload = document.createElement('button');
    layer_toDownload.className = "btn btn-show-list";
    layer_toDownload.onclick = function() {showListEquipements(layerPk);}
    layer_toDownload.innerHTML = 'Afficher la liste';
    layer_element.appendChild(layer_toDownload);
    layer_element_li.appendChild(layer_element);
    layers_list.appendChild(layer_element);
}

const openViewList = () => {
    const map_div = document.getElementById('map');
    map_div.style.display = "none";
    const legend_div = document.getElementById('legend-wrapper');
    legend_div.style.display = "none";
    const list_view = document.getElementById('list-view');
    list_view.style.display = "block";
    const regions_wrapper = document.getElementById('regions-wrapper');
    regions_wrapper.style.display = "none";
}

const showListEquipements = (equipement_id) => {
    const urlListEquipements = document.getElementById('url-list-equipements')
    const equipements_list = `${urlListEquipements.dataset.urlListEquipements}?equipement_id=${equipement_id}`
    const list_div = document.getElementById('list-wrapper');
    list_div.style.display = "flex";
    $.ajax({                       
        url: equipements_list,                    
        success: function (data) {   
          $("#list-wrapper").html(data);  
        }
      });
}

const showListVariables = (variable) => {
    const urlListVariables = document.getElementById('url-list-variables')
    const variables_list = `${urlListVariables.dataset.urlListVariables}?variable_name=${variable}`
    const list_div = document.getElementById('list-wrapper');
    list_div.style.display = "flex";
    $.ajax({                       
        url: variables_list,                    
        success: function (data) {   
          $("#list-wrapper").html(data);  
        }
      });
}

window.openViewList = openViewList
window.addViewListVariables = addViewListVariables
window.addViewListEquipements = addViewListEquipements

export { addViewListVariables, addViewListEquipements, openViewList }