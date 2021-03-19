function clusterConfigDialog(uuid, name) {
    var selected_cluster = $('#cluster-to-get-config')
    selected_cluster.html(name)
    selected_cluster.data('uuid', uuid) // Might not be needed

    $('#cluster-config-response').hide()
    //showRetrieving(name);
    createDownload(name, uuid);
    $('#cluster-config-dialog').modal('show');

    //getClusterConfig(uuid)
}

function createDownload(name, uuid){
    var download_link = $('#config-download');
    download_link.attr("href", "/api/clusterconfig?id='"+uuid+"'");
    download_link.html("Download config file for <strong>"+name+"</strong>");
    download_link.attr("onclick", "showRetrieving('"+name+"')");
    
    download_link.show()
}

function showRetrieving(name){
    $('#config-download').hide()

    var responseDiv = $('#cluster-config-response');
    responseDiv.html('The config file for <strong>'+name+'</strong> should appear shortly...')
    responseDiv.show()
    
}