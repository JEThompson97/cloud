function addFlavours(){
    $.ajax({
        type: "GET",
        url: "/api/flavors"
    }).done(function(flavors_data) {
        var masterSelect = $('#master-flavour-select');
        var nodeSelect = $('#node-flavour-select');
        
        masterSelect.empty();
        nodeSelect.empty();

        var masterSelectElement = masterSelect[0];
        var nodeSelectElement = nodeSelect[0];
        
        for (f of flavors_data["data"]){
            masterSelectElement.add(new Option(f['name'], f['name']))   // Flavour names act as ids
            nodeSelectElement.add(new Option(f['name'], f['name']))
        }

        $('#loading-master-flavours').hide();
        $('#loading-node-flavours').hide();
    });
}