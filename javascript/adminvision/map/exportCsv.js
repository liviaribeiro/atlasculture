function generate_modal_body(){
        modal = document.getElementById('modal-body');
        modal.innerHTML = "";
        active_layers = []
        var layers_list = document.createElement('ul');
        {% for domaine in domaines %}
            {% for equipement_type in domaine.equipementtype_set.all %}
                layer = '{{ equipement_type.pk }}'
                layer_name = '{{ equipement_type.name }}'
                var layer_visibility = map.getLayoutProperty(layer, 'visibility');
                if (layer_visibility == 'visible') {
                    var layer_element = document.createElement('li');
                    layer_element.innerHTML = layer_name;
                    var layer_toDownload = document.createElement('a');
                    layer_toDownload.className = "btn btn-export btn-link";
                    layer_toDownload.href = "{% url 'export_equipements_csv' equipement_type.pk %}"
                    layer_toDownload.innerHTML = 'csv';
                    layer_element.appendChild(layer_toDownload);
                    layers_list.appendChild(layer_element);
                }
            {% endfor %}
        {% endfor %}
        {% for variable in variables %}
            layer = '{{ variable.nom }}'
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
        {% endfor %}
        modal.appendChild(layers_list);
    }
