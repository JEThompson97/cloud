function createClusterDialog() {
    $('#create-cluster-btn').attr('disabled', ''); 
    // $('#create-cluster-btn').attr('onclick', 'fetch_values(selected_template)');

    $('#cluster-name').val('');

    $('#create-cluster-dialog').modal('show');
}