
var clustertable = $('#cluster-list').DataTable();

function drawClusterTable() {
    //debugger;
    // var clustertable = $('#cluster-list').DataTable( {
    //         "ajax" : "/api/cluster",
    //         "order": [
    //             [4, "desc"]
    //         ]
    //     } )
    // clustertable.draw();
    


    request = $.ajax({ // Returns a 'deferred' object
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
                exceptions("500", "getting VMs list.");
            }
        }
    }).done(function(clusters) {
        clustertable.clear()
        debugger;
        for (clusterData of clusters["cluster_list"]){
            console.log("%s\n%s\n%s\n%s",
                        clusterData,
                        clusterData['name'],
                        clusterData['status'],
                        clusterData['uuid'],)
            // clustertable.row.add([{
            //     'name': clusterData['name'],
            //     'status': clusterData['status'],
            //     'uuid': clusterData['uuid']
            // }]).draw()
            clustertable.row.add([
                clusterData['name'],
                clusterData['status'],
                clusterData['uuid']
            ]).draw()  //TODO:
        }
        // debugger;
        // console.log(data)
        // var clustertable = $('#cluster-list').DataTable( {
        //     "ajax" : data
        // });

    });

}



function getClusters(){

    var req = $.get("/api/cluster");

    req.done(formatClusterList)
};

// function getClusters(){

//     var req = $.get("/api/cluster");

//     req.done(formatClusterList(cluster_list));
// };

function formatClusterList(rawClusterList){
    $('#cluster-list').append(": " + rawClusterList); 

    var tab = $('#cluster-table');

    // tab.DataTable({
    //     "columns": [

    //     ]
    // })

    tab.clear();

    for (cluster of rawClusterList["data"]){
    //     cluster['']
        tab.row.add(cluster)
    }

    tab.draw(false);
};

// $('#cluster-list').get("/api/cluster").done(function)


// function drawClusterTable(){
//     clusters_list = $.ajax({
//         type: "GET",
//         url: "/api/cluster"
//     })
//     return String(typeof clusters_list)
// }