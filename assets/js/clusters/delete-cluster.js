function deleteClusterDialog(uuid, name) {
    $('#cluster-to-delete').html(name)
    $('#cluster-to-delete').data('uuid', uuid)
    $('#delete-cluster-dialog').modal('show');
}

function deleteCluster(){
    var uuid = $('#cluster-to-delete').data('uuid')

    $.ajax({
        type: "DELETE",
        url: "/api/cluster?id=" + uuid
    }).done(function() {
        $('#delete-cluster-dialog').modal('hide');
        drawClusterTable()
    });
}