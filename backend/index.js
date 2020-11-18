import Database from './src/database.js';

try {
  const database = new Database();
  await database.connectMongoDB();
  await database.dropProjects();
  await database.insertProject({
    title: "test",
    repository: {
      platform: 'test',
      name: 'test',
      url: 'test'
    }
  });

  console.log(await database.getProjects());
} catch(e) {
  console.log('big error')
  console.error(e);
}
