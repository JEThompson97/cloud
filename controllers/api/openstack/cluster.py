import cherrypy
from .getFunctions import getMagnumInstance

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
        cherrypy.log(f"Cluster dicts: {str(cluster_list)}")
        return {'cluster_list' : cluster_list}