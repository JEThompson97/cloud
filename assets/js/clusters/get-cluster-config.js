function clusterConfigDialog(uuid, name) {
    $('#cluster-config-response').hide()
    createDownload(name, uuid);
    $('#cluster-config-dialog').modal('show');
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