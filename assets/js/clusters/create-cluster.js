function createClusterDialog() {
    $('#cluster-create-response').hide()
    $('#create-cluster-dialog').modal('show');
}

function showLoading(){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html('<span id="loading-cluster-templates">Working on it <div class="loader"></div></span>')
    responseDiv.css("color", "black")
    responseDiv.show()
}

function showError(error){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html(error.status + ": " + error.statusText)
    responseDiv.css("color", "red")
    responseDiv.show()
}

function submitClusterForm(){
    showLoading()

    var rawClusterName = $("#cluster-name").val()

    var formData = {
        'cName' : $("#cluster-name").val().trim(),
        'cTempId' : $("#cluster-template-select").val(),
        'cMasters' : $("#master-count").val(),
        'cNodes' : $("#node-count").val(),
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