function deleteCluster(uuid){
    $.ajax({
        type: "DELETE",
        url: "/api/cluster?id=" + uuid
    }).done(function(json_returned) {
        console.log(json_returned)
        drawClusterTable()
    });
}