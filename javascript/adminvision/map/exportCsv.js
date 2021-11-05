function generate_modal_body(){
    modal = document.getElementById('modal-body');
    modal.innerHTML = "";
    active_layers = []

    for (var i = 0; i < aplats.length; i++){
        layer = aplats[i];
        var layer_visibility = map.getLayoutProperty(layer, 'visibility');
        if (layer_visibility == 'visible') {
            var layer_toDownload = document.createElement('a');
            layer_toDownload.class = "btn btn-download d-inline-flex align-items-center btn-link mt-5";
            layer_toDownload.href = "{{ portrait.fiche.url }}"
            layer_toDownload.innerHTML = layer;
            modal.appendChild(layer_toDownload)
        }
    }
}
