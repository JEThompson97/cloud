function addClusterTemplates(){
    $.ajax({
        type: "GET",
        url: "/api/clustertemplate"
    }).done(function(cluster_template_data) {
        var selector = $('#cluster-template-select')[0];
        
        for (ct of cluster_template_data["cluster_template_list"]){
            // console.log("%s\n%s\n%s\n%s",
            //             ct,
            //             ct['name'],
            //             ct['uuid']);
            selector.add(new Option(ct['name'], ct['uuid']))
        }

        $('#loading-cluster-templates').hide();
    });
}