function createClusterDialog() {
    $('#cluster-create-response').hide()
    $('#create-cluster-btn').prop('disabled', false); 
    $('#create-cluster-dialog').modal('show');

}

function showLoading(){
    $('#create-cluster-btn').prop('disabled', true); 
    var responseDiv = $('#cluster-create-response');
    responseDiv.html('<span>Working on it <div class="loader"></div></span>')
    responseDiv.css("color", "black")
    responseDiv.show()
}

function showError(){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html("The backend didn't like that.. ")
    responseDiv.css("color", "red")
    responseDiv.show()

    $('#create-cluster-btn').prop('disabled', false); 
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
        statusCode: {
            400: function() {
                showError()
            },
            500: function() {
                showError()
            }
        }
    }).done(function(json_returned){
        //responseDiv.html(json_returned)
        console.log(json_returned)
        $('#create-cluster-dialog').modal('hide');
        drawClusterTable()
    })

}