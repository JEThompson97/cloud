import cherrypy
from .getFunctions import getClusterConfig
from cherrypy.lib.static import serve_file
from tempfile import TemporaryDirectory

class ClusterConfig(object):
    exposed = True
    @cherrypy.tools.isAuthorised()
    def GET(self, id=None):
        if id == None:
            raise cherrypy.HTTPError('400 Bad parameters')
        
        with TemporaryDirectory(prefix='ClusterConfig') as tmpdir:
            cherrypy.log(f"temp dir: {tmpdir}")
            config_path = getClusterConfig(id, tmpdir)
            cherrypy.log("config_path: " + config_path)
            config_file = serve_file(config_path)

        return config_file