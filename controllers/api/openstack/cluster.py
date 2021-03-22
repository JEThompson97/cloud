import cherrypy
from .getFunctions import getMagnumInstance, getNovaInstance

class Cluster(object):
    exposed = True 
    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def GET(self):
        magnumClient = getMagnumInstance()

        clusters = magnumClient.clusters.list()
        cluster_list = [c.to_dict() for c in clusters]

        return {'cluster_list' : cluster_list}

    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def POST(self, **params):

        if params['flavor_id'] == "":
            params.pop('flavor_id')
        if params['master_flavor_id'] == "":
            params.pop('master_flavor_id')

        if "" in params.values():
            raise cherrypy.HTTPError('400 Bad parameters')
                  
        novaClient = getNovaInstance()
        try:
            keyname = novaClient.keypairs.list()[0].name
        except IndexError:
            keyname = ""

        params['keypair'] = keyname
       
        magnumClient = getMagnumInstance()
        createResponse = magnumClient.clusters.create(**params)

        return createResponse.to_dict()
    

    @cherrypy.tools.isAuthorised()
    def DELETE(self, id=None):
        if id == None:
            raise cherrypy.HTTPError('400 Bad parameters')

        magnumClient = getMagnumInstance()
        magnumClient.clusters.delete(id)

        return id