export default class ProjectRoutes {
  constructor(router) {
    this.router = router;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/asd', (req, res) => {
      res.send({
        status: 'API Works 2',
        message: 'Welcome to Rest API',
      });
    });
  }
}
