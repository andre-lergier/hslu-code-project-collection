export default class UserControllers {
  constructor(database) {
    this.database = database;
  }

  async get(request, response) {
    try {
      const result = await this.database.getProjects();
      return response.status(201).send({
        success: 'true',
        message: 'users',
        projects: result,
      });
    } catch (error) {
      console.log('Error UserControllers get');
      console.error(error);

      return response.status(500).send({
        success: 'false',
        error,
      });
    }
  }

  async getSingle(request, response) {
    const query = { 'publicLink.url': `${request.params.url}` };

    try {
      const result = await this.database.getProjects(query);
      return response.status(201).send({
        success: 'true',
        message: 'user',
        projects: result,
      });
    } catch (error) {
      console.log('Error UserControllers getSingle');
      console.error(error);

      return response.status(500).send({
        success: 'false',
        error,
      });
    }
  }

  async create(request, response) {
    if (!request.body.title) {
      return response.status(400).send({ success: 'false', message: 'name is required' });
    }

    const project = request.body; // data.wb

    try {
      const result = await this.database.insertProject(project);
      return response.status(201).send({
        success: 'true',
        message: 'user added successfully',
        project: result.insertedId,
      });
    } catch (error) {
      return response.status(500).send({
        success: 'false',
        error,
      });
    }
  }
}
