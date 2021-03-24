var clusterTable = $('#cluster-list').DataTable({
    "columns": [
        { data: 'name', title: 'Name'},
        { data: 'status', title: 'Status' },
        { data: 'uuid', title: 'ID' },
        { data: 'health_status', title: 'Health' },
        { data: 'keypair', title: 'Key Pair' },
        { data: 'master_count', title: 'Masters' },
        { data: 'node_count', title: 'Nodes' },
        { data: 'config' },
        { data: 'delete' },
    ],
    "dom": '<"top"f>t<"bottom"lpi><"clear">'    //Puts 'show x entries' dropdown below table
});

// console.log("init ProjectID from: " + Cookies.get("projectID"))

function makeDeleteBtn(uuid, name){
    return '<button\
                title="Delete Cluster"\
                onclick="deleteClusterDialog(\''+uuid+'\',\''+name+'\')"\
            >\
                <span\
                    class="glyphicon glyphicon-trash"\
                    style="vertical-align:middle;margin-top:-2px"\
                />\
            </button>'
} 

function makeConfigBtn(uuid, name){ 
    return '<button\
                title="Get Cluster Config"\
                onclick="clusterConfigDialog(\''+uuid+'\',\''+name+'\')"\
            >\
                <span\
                    class="glyphicon glyphicon glyphicon-save-file"\
                    style="vertical-align:middle;margin-top:-2px"\
                />\
            </button>'
} 

function drawClusterTable() {
    ajaxGetRequests.clusters = $.ajax({
        type: "GET",
        url: "/api/cluster"
    }).done(function(cluster_data) {
        clusterTable.clear();
        for (c of cluster_data["cluster_list"]){

            c['delete'] = makeDeleteBtn(c['uuid'], c['name'])
            c['config'] = makeConfigBtn(c['uuid'], c['name'])
            clusterTable.row.add(c).draw(false);
        }

        $('#loading-clusters').hide();
    });

}

