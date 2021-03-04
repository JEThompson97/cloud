var clustertable = $('#cluster-list').DataTable({
    "columns": [
        { data: 'name', title: 'Name'},
        { data: 'status', title: 'Status' },
        { data: 'uuid', title: 'ID' },
        { data: 'health_status', title: 'Health' },
        { data: 'keypair', title: 'Key Pair' },
        { data: 'master_count', title: 'Masters' },
        { data: 'node_count', title: 'Nodes' },
    ],
    "dom": '<"top"f>t<"bottom"lpi><"clear">'    //Puts 'show x entries' dropdown below table
});

function drawClusterTable() {
    $.ajax({ // Returns a 'deferred' object
        type: "GET",
        url: "/api/cluster",
        statusCode: {
            400: function(data) {
                $("#errormessage").html(data.statusText);
                $("#error").show();
            },
            403: function() {
                exceptions("403");
            },
            500: function() {
                exceptions("500", "getting Clusters list.");
            }
        }
    }).done(function(clusters) {
        clustertable.clear()
        debugger;
        for (clusterData of clusters["cluster_list"]){
            // console.log("%s\n%s\n%s\n%s",
            //             clusterData,
            //             clusterData['name'],
            //             clusterData['status'],
            //             clustertable.columns)
            // clustertable.row.add([{
            //     'name': clusterData['name'],
            //     'status': clusterData['status'],
            //     'uuid': clusterData['uuid']
            // }]).draw()
            // NOTE: Adding the whole object- DT only uses the specificed 'data'
            clustertable.row.add(clusterData).draw(false)  
        }
    });

}