import cherrypy
from .getFunctions import getMagnumInstance

class ClusterTemplate(object):
    exposed = True
    @cherrypy.tools.isAuthorised()
    @cherrypy.tools.json_out()
    def GET(self):
        magnumClient = getMagnumInstance()
        username = cherrypy.request.cookie.get('fedid').value

        cluster_templates = magnumClient.cluster_templates.list()
        cluster_template_list = [ct.to_dict() for ct in cluster_templates]
        cherrypy.log(f"Cluster Template dicts: {str(cluster_template_list)}")
        return {'cluster_template_list' : cluster_template_list}