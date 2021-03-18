function createClusterDialog() {
    $('#cluster-create-response').hide()
    $('#create-cluster-dialog').modal('show');
}

function showLoading(){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html('<span>Working on it <div class="loader"></div></span>')
    responseDiv.css("color", "black")
    responseDiv.show()
}

function showError(error){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html("The backend didn't like that.. " + error.status + ": " + error.statusText)
    responseDiv.css("color", "red")
    responseDiv.show()
}

function submitClusterForm(){
    showLoading()

    
    var formData = {
        'name' : $("#cluster-name").val().trim(),
        'cluster_template_id' : $("#cluster-template-select").val(),
        'master_count' : $("#master-count").val(),
        'node_count' : $("#node-count").val(),
        'master_flavor_id': $("#master-flavour-select").val(),
        'flavor_id': $("#node-flavour-select").val()
    }

    $.ajax({
        type: "POST",
        url: "/api/cluster",
        data: formData,
        statusCode: {   // TODO: Look into handling these as 1
            400: function(data) {
                showError(data.status + ": " + data.statusText)
            },
            500: function(data) {
                showError(data.status + ": " + data.statusText)
            }
        }
    }).done(function(json_returned){
        //responseDiv.html(json_returned)
        console.log(json_returned)
        $('#create-cluster-dialog').modal('hide');
        drawClusterTable()
    })

}