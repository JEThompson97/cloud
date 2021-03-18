function addClusterTemplates(){
    $.ajax({
        type: "GET",
        url: "/api/clustertemplate"
    }).done(function(cluster_template_data) {
        var select = $('#cluster-template-select');
        select.empty();

        var selectElement = select[0];
        
        for (ct of cluster_template_data["cluster_template_list"]){
            selectElement.add(new Option(ct['name'], ct['uuid']))
        }

        $('#loading-cluster-templates').hide();
        $('#create-cluster-btn').prop('disabled', false); 
    });
}