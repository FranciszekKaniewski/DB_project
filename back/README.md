<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Made in <a href="https://nestjs.com" target="_blank">NestJs</a></p>
    <p align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF5733?style=for-the-badge&logo=typeorm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 🌐 API Endpoints

Here are some example API endpoints:

- **GET /task**
    - Retrieve all tasks.
    - **Request**: `GET http://localhost:3000/task`
    - **Request**: `GET http://localhost:3000/task/month/:year/:month`
    - **Request**: `GET http://localhost:3000/task/week/:year/:month/:day`
    - **Request**: `GET http://localhost:3000/task/day/:year/:month/:day`
    - **Request**: `GET http://localhost:3000/task/reminder`
    - **Response**:
      ```json
      [
        {
          "id": "119f8790-152e-4f99-9245-4ca361572012",
          "title": "Task 1",
          "startDate": "2024-05-01T12:00:00.000Z",
          "endDate": "2024-05-01T14:00:00.000Z",
          "type": "hard",
          "reminder": true,
          "done": true
        },
        {
          "id": "1694eec8-1c3d-4f6a-861a-3d66d38837aa",
          "title": "Task 2",
          "startDate": "2024-05-03T12:00:00.000Z",
          "endDate": "2024-05-03T20:00:00.000Z",
          "type": "soft",
          "reminder": false,
          "done": false
        }
      ]
      ```

- **GET /task/:id**
    - Retrieve a task by ID.
    - **Request**: `GET http://localhost:3000/tasks/119f8790-152e-4f99-9245-4ca361572012`
    - **Response**:
      ```json
      {
          "id": "119f8790-152e-4f99-9245-4ca361572012",
          "title": "Task 1",
          "startDate": "2024-05-01T12:00:00.000Z",
          "endDate": "2024-05-01T14:00:00.000Z",
          "type": "hard",
          "reminder": true,
          "done": true
      }
      ```

- **POST /task**
    - Create a new task.
    - **Request**: `POST http://localhost:3000/tasks`
    - **Body**:
      ```json
      {
          "id" : "119f8790-152e-4f99-9245-4ca361572012",  //requred
          "title": "Task 1", //requred
          "startDate": "2024-05-01T12:00:00.000Z", // default CURRENT_TIMESTAMP
          "endDate": "2024-05-01T14:00:00.000Z", // default CURRENT_TIMESTAMP
          "type": "hard", //requred 'soft'|'hard'
          "reminder": true, // default false
          "done": true // default false
      }
      ```
    - **Response**:
      ```json
      {
          "isSuccess": true,
          "NewTask": {
              "id": "119f8790-152e-4f99-9245-4ca361572012",
              "title": "Task 1",
              "type": "hard",
              "endDate": "2024-05-01T14:00:00.000Z",
              "startDate": "2024-05-01T12:00:00.000Z",
              "reminder": true,
              "done": true
          }   
      }
      ```

- **Patch /tasks/:id**
    - Update an existing task.
    - **Request**: `PUT http://localhost:3000/tasks/1`
    - **Body**:
      ```json
      {
          "title": "Task 2",
          "startDate": "2024-05-02T12:00:00.000Z",
          "endDate": "2024-05-02T14:00:00.000Z",
          "type": "soft",
          "reminder": false,
          "done": false
      }
      ```
    - **Response**:
      ```json
      {
          "isSuccess": true,
          "NewTask": {
              "id": "119f8790-152e-4f99-9245-4ca361572012",
              "title": "Task 2",
              "type": "soft",
              "endDate": "2024-05-02T14:00:00.000Z",
              "startDate": "2024-05-02T12:00:00.000Z",
              "reminder": false,
              "done": false
          }   
      }
      ```

- **DELETE /tasks/:id**
    - Delete a task by ID.
    - **Request**: `DELETE http://localhost:3000/tasks/1`
    - **Response**:
      ```json
      {
        "isSuccess" : true,
        "message": "Task :id removed!"
      }
      ```


## NestJs

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
