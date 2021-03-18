import cherrypy
from .getFunctions import getMagnumInstance, getNovaInstance

#NOTE: For now, trying to follow existing naming convention, but later should refactor
class Cluster(object):
    exposed = True  # Required for HTTP interaction
    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def GET(self):
        magnumClient = getMagnumInstance()

        username = cherrypy.request.cookie.get('fedid').value

        clusters = magnumClient.clusters.list()
        cluster_list = [c.to_dict() for c in clusters]
        # cherrypy.log(f"Cluster dicts: {str(cluster_list)}")
        return {'cluster_list' : cluster_list}

    # @cherrypy.tools.json_in()
    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def POST(self, **params):
        username = cherrypy.request.cookie.get('fedid').value

        if "" in params.values():
            raise cherrypy.HTTPError('400 Bad parameters')
                  
        novaClient = getNovaInstance()  # I believe novaClient needed to retrieve a keypair

        try:
            keyname = novaClient.keypairs.list()[0].name
        except IndexError:
            keyname = ""
       
        magnumClient = getMagnumInstance()

        createResponse = magnumClient.clusters.create(
            name = params.get('name'),
            cluster_template_id = params.get('cluster_template_id'),
            master_count = params.get('master_count'),
            node_count = params.get('node_count'),
            master_flavor_id = params.get('master_flavor_id'),
            flavor_id = params.get('flavor_id'),
            keypair = keyname
        )

        responseDict = createResponse.to_dict()
        cherrypy.log("Response: " + str(responseDict))
        return responseDict
    

    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def DELETE(self, id=None):
        if id == None:
            raise cherrypy.HTTPError('400 Bad parameters')

        magnumClient = getMagnumInstance()
    
        deleteResponse = magnumClient.clusters.delete(id)

        if deleteResponse is not None:
            responseDict = deleteResponse.to_dict()
        else:
            responseDict = {'Confirmation': f"Deletion of {id} requested"}
        cherrypy.log("Response: " + str(responseDict))
        return responseDict