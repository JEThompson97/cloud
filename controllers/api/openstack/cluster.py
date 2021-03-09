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
            name = params.get('cName'),
            cluster_template_id = params.get('cTempId'),
            master_count = params.get('cMasters'),
            node_count = params.get('cNodes'),
            keypair = keyname
        )

        responseDict = createResponse.to_dict()
        cherrypy.log("Response: " + str(responseDict))
        return responseDict

