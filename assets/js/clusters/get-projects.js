function addProjects(){
    $.ajax({
        type: "GET",
        url: "/api/projects"
    }).done(function(json_returned){
        var select = $('#project-select');
        var selectElement = select[0];

        var currentProj = Cookies.get("projectID");
        
        for (p of json_returned["data"]){
            selectElement.add(new Option(p['name'], p['id']))

            //console.log("p[id]: " + p['id'])
            if (p['id'] === currentProj){
                //If no project is selected here, the selection gets set to the first value
                //console.log("select value set to  " + p['name'] + " aka " + currentProj)
                select.val(currentProj) 
            }
        }

        refreshProjectData();
    });
}

function refreshProjectData(){
    abortAjaxGetRequests()
    clusterTable.clear().draw(false);
    $('#cluster-template-select').empty();
    $('#master-flavor-select').empty();
    $('#node-flavor-select').empty();

    $('#loading-clusters').show();
    $('#loading-cluster-templates').show();
    $('#loading-master-flavours').show();
    $('#loading-node-flavours').show();

    // NOTE: This section of code copied from listprojects.js
    var date = new Date();
    date.setTime(date.getTime() + (86400 * 1000));    // Cookie will expire 24 hours after creating
    
    var projectSelection = $('#project-select').val();
    //console.log("projectSelection: " + projectSelection)
    Cookies.set("projectID", projectSelection, {expires : date, path : '/'});
    drawClusterTable();
    addClusterTemplates();
    addFlavors();
}

var ajaxGetRequests = {
    clusters: $.ajax({}),
    clusterTemplates: $.ajax({}),
    flavors: $.ajax({})
}

function abortAjaxGetRequests(){
    for (r in ajaxGetRequests){
        //console.log(r + " abort")
        ajaxGetRequests[r].abort();
    }
}