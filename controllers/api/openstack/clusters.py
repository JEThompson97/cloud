import cherrypy
from helpers.jinja import *

class Clusters(object):
# This is copied from Machines. TODO investigate stripping down

    @cherrypy.expose
    @cherrypy.tools.isAuthorised(redirect=True)
    @cherrypy.tools.jinja(template="clusters/index.html")
    def index(self):
        try:
            username = cherrypy.request.cookie.get('fedid').value
        except AttributeError:
            cherrypy.log('- Could not fetch cookie')
            raise cherrypy.HTTPRedirect('/login')

        WSHOSTNAME = cherrypy.request.config.get("wshostname")
        WSPORT = cherrypy.request.config.get("wsport")
        EMAIL = cherrypy.request.config.get("email")
        CLOUDPLATFORM = cherrypy.request.config.get("cloudPlatform")
        COUNTLIMIT = cherrypy.request.config.get("countLimit")
        return {"wshostname" : WSHOSTNAME, "wsport" : WSPORT, "email" : EMAIL,
                "cloudPlatform" : CLOUDPLATFORM, "countLimit" : COUNTLIMIT}

    
