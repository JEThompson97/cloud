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