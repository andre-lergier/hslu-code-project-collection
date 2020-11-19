import ProjectRoutes from './project.js';
import UserRoutes from './user.js';

export default class APIRouter {
  constructor(database) {
    this.projectRoutes = new ProjectRoutes(database);
    this.userRoutes = new UserRoutes(database);
  }
}
