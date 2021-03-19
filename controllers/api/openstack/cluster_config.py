import cherrypy
from .getFunctions import getClusterConfig
from cherrypy.lib.static import serve_file
import os

class ClusterConfig(object):
    exposed = True
    @cherrypy.tools.isAuthorised()
    # @cherrypy.tools.json_out()
    def GET(self, id=None):
        if id == None:
            raise cherrypy.HTTPError('400 Bad parameters')
        
        config_path = getClusterConfig(id)
        cherrypy.log("config_path: " + config_path)
        config_file = serve_file(config_path)

        os.remove(config_path)

        return config_file