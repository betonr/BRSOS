/**
 * @api {get} /brsos/api/user/:id get json with information from a user
 * @apiGroup User
 *
 * @apiHeader Authentication {String} Authorization Users unique access-key
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiParam {Integer} id Users unique ID
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "user": {
 *              "_id": 3asdsaqqe12edwqds,
 *              "name": "beto",
 *              "thumb": binary-code
 *              "lastname": "noronha",
 *              "email": "beto@gmail.com", 
 *              "password": null,
 *              "level": 2,
 *              "cpf": 000000000-00
 *              "registration": "2017-05-31T03:00:00.000Z",
 *              "lastupdate": "2018-03-07T03:00:00.000Z",
 *              "status": true
 *          }
 *      }
 * 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 User not found
 *       {
 *           "errors": [
 *               {
 *                   "field": [
 *                       "id"
 *                   ],
 *                   "message": [
 *                       "User not found"
 *                   ]
 *               }
 *           ]
 *       }
 * 
 * @apiErrorExample {json} Failed Authentication
 *    HTTP/1.1 401 Unauthorized Failed
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "You do not have access to this resource"
 *        }]
 *    }
 */  

/**
 * @api {get} /brsos/api/user/ get json with users information
 * @apiGroup User
 *
 * @apiHeader Authentication {String} Authorization Users unique access-key
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *    {
 *      "users": [
 *          {
 *              "_id": 3asdsaqqe12edwqds,
 *              "name": "beto",
 *              "thumb": binary-code
 *              "lastname": "noronha",
 *              "password": null,
 *              "email": "beto@gmail.com", 
 *              "level": 2,
 *              "cpf": 000000000-00
 *              "registration": "2017-05-31T03:00:00.000Z",
 *              "lastupdate": "2018-03-07T03:00:00.000Z",
 *              "status": true
 *          },
 *          {
 *              ...
 *          }
 *      ]
 *    }
 * 
 * @apiErrorExample {json} Failed Authentication
 *    HTTP/1.1 401 Unauthorized Failed
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "You do not have access to this resource"
 *        }]
 *    }
 */  

/**
 * @api {post} /brsos/api/user/register register/add user to the database
 * @apiGroup User
 * 
 * @apiparam {String} name user full name
 * @apiparam {String} email user email address
 * @apiparam {String} lastname user last name
 * @apiparam {Integer} level user level (1,2,3)
 * @apiparam {String} password user password (/[a-zA-Z0-9]{8,30}/)
 * @apiparam {Integer} status=true user status (true, false) not required
 * @apiparam {Object} thumb user photo ({ data: Buffer, contentType: String }) not required
 * @apiparam {Integer} cpf user cpf not required
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "id": 16
 *      }   
 * 
 * @apiErrorExample {json} incomplete data  
 *    HTTP/1.1 400 bad request - incomplete
 *    {
 *      "status": 400,
 *      "statusText": "Bad Request",
 *      "errors": [
 *          {
 *              "field": [
 *                  "name"
 *              ],
 *              "location": "body",
 *              "messages": [
 *                 "\"name\" is required"
 *              ],
 *              "types": [
 *                 "any.required"
 *              ]
 *          },
 *          {
 *              ...
 *          }
 *   }
 */

 /**
 * @api {put} /brsos/api/user/update update user to the database
 * @apiGroup User
 *
 * @apiHeader Authentication {String} Authorization Users unique access-key 
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * 
 * @apiparam {Integer} id user id
 * @apiparam {String} name user full name
 * @apiparam {String} email user email address
 * @apiparam {String} lastname user last name
 * @apiparam {Integer} level user level (1,2,3)
 * @apiparam {String} password user password (/[a-zA-Z0-9]{8,30}/)
 * @apiparam {Integer} status=true user status (true, false) not required
 * @apiparam {Object} thumb user photo ({ data: Buffer, contentType: String }) not required
 * @apiparam {Integer} cpf user cpf not required
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK 
 * 
 * @apiErrorExample {json} Failed Authentication
 *    HTTP/1.1 401 Unauthorized Failed
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "You do not have access to this resource"
 *        }] 
 *    }
 * @apiErrorExample {json} Not authorized
 *    HTTP/1.1 403 update only your information
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "You need to be an administrator or You can not change information from other users"
 *        }] 
 *   }
 * @apiErrorExample {json} incomplete data  
 *    HTTP/1.1 400 bad request - incomplete
 *    {
 *      "status": 400,
 *      "statusText": "Bad Request",
 *      "errors": [
 *          {
 *              "field": [
 *                  "name"
 *              ],
 *              "location": "body",
 *              "messages": [
 *                 "\"name\" is required"
 *              ],
 *              "types": [
 *                 "any.required"
 *              ]
 *          },
 *          {
 *              ...
 *          }
 *   }
 */

/**
 * @api {delete} /brsos/api/user/delete/:id delete user to the database
 * @apiGroup User
 *
 * @apiHeader Authentication {String} Authorization Users unique access-key
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiParam {Integer} id Users unique ID
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "success": true
 *      }
 * 
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 User not found
 *       {
 *           "errors": [
 *               {
 *                   "field": [
 *                       "id"
 *                   ],
 *                   "message": [
 *                       "User not found"
 *                   ]
 *               }
 *           ]
 *       }
 * 
 * @apiErrorExample {json} Failed Authentication
 *    HTTP/1.1 401 Unauthorized Failed
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "You do not have access to this resource"
 *        }]
 *    }
 * @apiErrorExample {json} Not authorized
 *    HTTP/1.1 403 update only your information
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "You need to be an administrator or You can not change information from other users"
 *        }] 
 *   }
 */