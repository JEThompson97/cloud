function createClusterDialog() {
    $('#cluster-create-response').hide()
    // var responseDiv = $('#cluster-create-response');
    // //responseDiv.empty()
    
    // responseDiv.hide()
    // var createBtn = $('#create-cluster-btn')
    // createBtn.prop('disabled', false); 
    // $('#create-cluster-btn').attr('onclick', 'fetch_values(selected_template)');

    $('#create-cluster-dialog').modal('show');
}

// function resetResponse(){
//     $('#cluster-create-response').hide()
// }

function showLoading(){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html('<span id="loading-cluster-templates">Working on it <div class="loader"></div></span>')
    responseDiv.css("color", "black")
    responseDiv.show()
}

function showError(message){
    var responseDiv = $('#cluster-create-response');
    responseDiv.html(message)
    responseDiv.css("color", "red")
    responseDiv.show()
}

function submitClusterForm(){
    // var createBtn = $('#create-cluster-btn')
    // createBtn.attr('disabled', ''); 
    showLoading()
    //var responseDiv = $('#cluster-create-response');
    // responseDiv.html("Test change");
    

    //responseDiv.show()
    
    // Need to get clusterParams from Form
    // Could jQuery all the variables.. Maybe there's a better way?

    // var form = $('#create-cluster-form')
    // var formData = form.serializeArray()
    // console.log(formData)
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