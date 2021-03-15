function getClusterConfig(uuid){
    $.ajax({
        type: "GET",
        url: "/api/clusterconfig?id=" + uuid
    }).done(function(json_returned) {
        console.log(json_returned)
    });
}