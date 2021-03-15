import cherrypy
from .getFunctions import getClusterConfig

class ClusterConfig(object):
    exposed = True
    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def GET(self, id=None):
        if id == None:
            raise cherrypy.HTTPError('400 Bad parameters')

        config_yaml = getClusterConfig(id) 

        return config_yaml