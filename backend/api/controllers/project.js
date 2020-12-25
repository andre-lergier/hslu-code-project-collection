export default class ProjectControllers {
  constructor(database) {
    this.database = database;
  }

  async get(request, response) {
    try {
      const result = await this.database.getProjects({}, request.isAuth);
      return response.status(200).json({
        success: true,
        message: 'projects',
        projects: result,
      });
    } catch (error) {
      console.log('Error ProjectsControllers get');
      console.error(error);

      return response.status(400).json({
        success: false,
        message: error.toString(),
        error,
      });
    }
  }

  async getSingle(request, response) {
    const query = { 'publicLink.url': `${request.params.url}` };

    try {
      const result = await this.database.getProjects(query, request.isAuth);

      return response.status(200).json({
        success: true,
        message: 'project',
        projects: result[0],
      });
    } catch (error) {
      console.log('Error ProjectsControllers getSingle');
      console.error(error);

      return response.status(400).json({
        success: false,
        message: error.toString(),
        error,
      });
    }
  }

  async create(request, response) {
    /* if (!request.body.title) {
      return response.status(400).json({ success: false, message: 'name is required' });
    } */
    if (!request.isAuth) {
      return response.status(401).json({
        success: false,
        message: 'Not authorized toperform this action',
      });
    }

    const project = request.body;

    try {
      const result = await this.database.insertProject(project);
      return response.status(201).json({
        success: true,
        message: 'project added successfully',
        project,
        projectId: result.insertedId,
      });
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: error.toString(),
      });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!request.isAuth) {
      return response.status(401).json({
        success: false,
        message: 'Not authorized toperform this action',
      });
    }

    const checkProject = await this.database.getProjectById(id);
    if (!checkProject[0]) {
      return response.status(404).json({
        success: false,
        message: 'Project does not exist',
      });
    }

    try {
      const result = await this.database.deleteProject(id);
      return response.status(200).json({
        success: true,
        message: `${result.deletedCount} project successfully deleted`,
      });
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: error.toString(),
      });
    }
  }
}
