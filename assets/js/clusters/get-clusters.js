var clustertable = $('#cluster-list').DataTable({
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

function makeConfigBtn(uuid){
    quoted_uuid = "\"" + uuid + "\""
    return '<button\
                title="Get Cluster Config"\
                onclick="location.href=\'/api/clusterconfig?id=' + encodeURIComponent(quoted_uuid) + '\'"\
            >\
                <span\
                    class="glyphicon glyphicon glyphicon-open-file"\
                    style="vertical-align:middle;margin-top:-2px"\
                />\
            </button>'
} 

function makeDownloadConfigBtn(uuid){
    quoted_uuid = "\"" + uuid + "\""
    return '<a\
                title="Download Cluster Config"\
                class="btn"\
                href="/api/clusterconfig?id='+ encodeURIComponent(quoted_uuid) +'"\
                download\
            >\
                <span\
                    class="glyphicon glyphicon glyphicon-open-file"\
                    style="vertical-align:middle"\
                />\
            </a>'
} 

function drawClusterTable() {
    $.ajax({ // Returns a 'deferred' object
        type: "GET",
        url: "/api/cluster"
    }).done(function(cluster_data) {
        clustertable.clear();
        // debugger;
        for (c of cluster_data["cluster_list"]){

            c['delete'] = makeDeleteBtn(c['uuid'], c['name'])
            c['config'] = makeDownloadConfigBtn(c['uuid'])
            clustertable.row.add(c).draw(false);
        }

        $('#loading-clusters').hide();
        // $('#new-cluster-btn').removeAttr('disabled');   // Enable creation once clusters loaded
    });

}

