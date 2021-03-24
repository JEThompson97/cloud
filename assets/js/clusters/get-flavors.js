function addFlavors(){
    ajaxGetRequests.flavors = $.ajax({
        type: "GET",
        url: "/api/flavors"
    }).done(function(json_returned) {
        var masterSelect = $('#master-flavour-select');
        var nodeSelect = $('#node-flavour-select');

        var masterSelectElement = masterSelect[0];
        var nodeSelectElement = nodeSelect[0];
        
        for (f of json_returned["data"]){
            masterSelectElement.add(new Option(f['name'], f['name']))   // Flavour names act as ids
            nodeSelectElement.add(new Option(f['name'], f['name']))
        }

        $('#loading-master-flavours').hide();
        $('#loading-node-flavours').hide();
    });
}