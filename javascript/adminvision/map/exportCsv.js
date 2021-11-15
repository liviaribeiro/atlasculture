import { loadDataVariables } from './context/loadDataVariables.js';
const callModal = () => {
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
    let equipementPkList = []
    let exportEquipements = false
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
            exportEquipements = true
            // Passer une liste dans la methode export_equipements_csv
            equipementPkList.push(equipementTypePk)
        }
    });
    if (exportEquipements) {
        const urlExportEquipementsCsv = document.getElementById('url-export-equipement-csv')
        var layer_element = document.createElement('li');
        layer_element.innerHTML = "Offre et lieux culturels";
        var layer_toDownload = document.createElement('a');
        layer_toDownload.className = "btn btn-export btn-link";
        layer_toDownload.href = `${urlExportEquipementsCsv.dataset.urlExportEquipementsCsv}?pks_list=${equipementPkList}`
        // layer_toDownload.href = "{% url 'export_equipements_csv' equipement_type.pk %}"
        layer_toDownload.innerHTML = 'csv';
        layer_element.appendChild(layer_toDownload);
        layers_list.appendChild(layer_element);
    }

    const dataVariables = loadDataVariables();
    const urlExportVariableCsv = document.getElementById('url-export-variable-csv')

    dataVariables.forEach((dataVariable) => {
        const layer = dataVariable.nom
        var layer_visibility = map.getLayoutProperty(layer, 'visibility');

        if (layer_visibility == 'visible') {
            var layer_element = document.createElement('li');
            layer_element.innerHTML = layer;
            var layer_toDownload = document.createElement('a');
            layer_toDownload.className = "btn btn-export btn-link";
            layer_toDownload.href = dataVariable.file
            layer_toDownload.innerHTML = 'csv';
            layer_element.appendChild(layer_toDownload);
            layers_list.appendChild(layer_element);
    }

    modal.appendChild(layers_list);

  })

}
export { callModal }
