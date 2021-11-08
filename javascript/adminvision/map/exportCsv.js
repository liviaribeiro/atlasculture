import { loadDataVariables } from './context/loadDataVariables.js';
const callModel = () => {
  $(document).ready(function(){
    $("#myBtn").click(function(){
        $("#exampleModal").modal("show");
    });
    $('#exampleModal').on('shown.bs.modal', function() {
        generate_modal_body();

    });
  })
}


const generate_modal_body = () => {
  const modal = document.getElementById('modal-body');
  modal.innerHTML = "";
  const active_layers = []
  var layers_list = document.createElement('ul');
  const dataDomainesElements = document.querySelectorAll('.datas-equipements-types')
  dataDomainesElements.forEach((dataDomainesElement) => {
    const equipementType = dataDomainesElement.dataset.equipementType
    const equipementTypePk = dataDomainesElement.dataset.equipementTypePk
    const equipementTypeDefinition = dataDomainesElement.dataset.equipementTypeDefinition
    const equipementTypeSource = dataDomainesElement.dataset.equipementTypeSource
    const equipementTypeYear = dataDomainesElement.dataset.equipementTypeYear
    const equipementTypeName = dataDomainesElement.dataset.equipementTypeName
    const equipementTypePkUrl = dataDomainesElement.dataset.equipementTypePkUrl


    const layer = equipementTypePk
    const layer_name = equipementTypeName
    var layer_visibility = map.getLayoutProperty(layer, 'visibility');

    if (layer_visibility == 'visible') {
        var layer_element = document.createElement('li');
        layer_element.innerHTML = layer_name;
        var layer_toDownload = document.createElement('a');
        layer_toDownload.className = "btn btn-export btn-link";
        // Passer une liste dans la methode export_equipements_csv
        const urlExportEquipementsCsv = document.getElementById('url-export-equipement-csv')
        layer_toDownload.href = urlExportEquipementsCsv.dataset.urlExportEquipementsCsv
        // layer_toDownload.href = "{% url 'export_equipements_csv' equipement_type.pk %}"
        layer_toDownload.innerHTML = 'csv';
        layer_element.appendChild(layer_toDownload);
        layers_list.appendChild(layer_element);
    }

  });
  const dataVariables = loadDataVariables();
  dataVariables.forEach((dataVariable) => {
    const layer = dataVariable.nom
    var layer_visibility = map.getLayoutProperty(layer, 'visibility');
    if (layer_visibility == 'visible') {
        var layer_element = document.createElement('li');
        layer_element.innerHTML = layer;
        var layer_toDownload = document.createElement('a');
        layer_toDownload.className = "btn btn-export btn-link";
        layer_toDownload.href = "#"
        layer_toDownload.innerHTML = 'csv';
        layer_element.appendChild(layer_toDownload);
        layers_list.appendChild(layer_element);
    }
  })

}
export { callModel }
