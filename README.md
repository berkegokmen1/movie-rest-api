# REST API for storing favourite movies

Simple rest api with great features.

## Tech

This project uses a number of open source projects to work properly:

- [Express] - Fast node.js network app framework
- [node.js] - Evented I/O for the backend
- [JWT] - Industry standard RFC 7519 method for representing claims securely between two parties.
- [Sequelize] - Promise-based Node.js ORM for MySQL Server.
- [Axios] - Promise based HTTP client for the browser and node.js.
- [Pino] - Very low overhead Node.js logger.
- [Bcryptjs] - Hashing information securely and rapidly.
- [MySQL2] - Database

And of course this project itself is open source with a [public repository][repo] on GitHub.

### Running server locally

Clone or download the project to your local machine.
Create a dev.env file under `/config` folder.
Copy and paste the following fields. Specify the arguments.

```env
PORT=
DB_NAME=
DB_USERNAME=
DB_PASS=
DB_HOST=
LOG_LEVEL=
JWT_SECRET=
OMDB_API_KEY=
BASE_URL=
```

then run the following commands.

```bash
npm install
npm run dev
```

### Documentation

Full documentation can be found [here][docs].

### License

[MIT](https://choosealicense.com/licenses/mit/)

[docs]: ./DOCUMENTATION.md
[repo]: https://github.com/berkegokmen1/myMovies
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[jwt]: https://jwt.io
[sequelize]: https://sequelize.org
[axios]: https://axios-http.com
[pino]: https://github.com/pinojs/pino
[bcryptjs]: https://www.npmjs.com/package/bcryptjs
[mysql2]: https://www.npmjs.com/package/mysql2
