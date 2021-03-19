function clusterConfigDialog(uuid, name) {
    $('#cluster-to-get-config').html(name)
    $('#cluster-to-get-config').data('uuid', uuid)
    $('#cluster-config-dialog').modal('show');

    $('#config-download').hide()
}

function getClusterConfig(uuid){
    $.ajax({
        type: "GET",
        url: "/api/clusterconfig?id=" + uuid
    }).done(function(json_returned) {
        console.log(json_returned)
        // Add href
    });
}