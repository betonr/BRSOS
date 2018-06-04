/**
 * @api {get} /brsos/api/ocorrencia/:id get by id
 * @apiGroup Ocorrencia
 * 
 * @apiHeader Authentication {String} Authorization Users unique access-key
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiParam {Integer} id Oocorrencia unique ID
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "ocorrencia": {
 *              "geometry": {
 *                  "type": "Point",
 *                  "projection": "EPSG:4326",
 *                  "coordinates": [
 *                      45,76723,
 *                      -23,34522
 *                  ]
 *              },
 *              "_id": "5ad4c34f870e7f3392db5cc5",
 *              "description": "batida entre dois carros amarelos",
 *              "user": 2,
 *              "category": "3",
 *              "victims": 5,
 *              "date": "2018-04-16T03:00:00.000Z",
 *          }
 *      }
 * 
 * @apiErrorExample {json} Occurrence not found
 *    HTTP/1.1 404 Occurrence not found
 *       {
 *           "errors": [
 *               {
 *                   "field": [
 *                       "id"
 *                   ],
 *                   "message": [
 *                       "Occurrence not found"
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
 * @api {get} /brsos/api/ocorrencia/ get all
 * @apiGroup Ocorrencia
 * 
 * @apiHeader Authentication {String} Authorization Users unique access-key
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "ocorrencias": [
 *              {
 *                  "geometry": {
 *                      "type": "Point",
 *                      "projection": "EPSG:4326",
 *                      "coordinates": [
 *                          45,76723,
 *                          -23,34522
 *                      ]
 *                  },
 *                  "_id": "5ad4c34f870e7f3392db5cc5",
 *                  "description": "batida entre dois carros amarelos",
 *                  "user": 2,
 *                  "category": "3",
 *                  "victims": 5,
 *                  "date": "2018-04-16T03:00:00.000Z",
 *              },
 *              { ... }
 *          ]
 *      }
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
 * @api {post} /brsos/api/ocorrencia/register register/add
 * @apiGroup Ocorrencia
 * 
 * @apiHeader Authentication {String} Authorization Users unique access-key
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * 
 * @apiparam {Array} coordinates ocorrencias location [45.3232, -23.2342]
 * @apiparam {String} description ocorrencias description
 * @apiparam {String} user id user
 * @apiparam {Integer} category ocorrencias level (1,2,3)
 * @apiparam {Integer} victims victims of ocorrencias not required
 * 
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "id": 5
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
 *                  "description"
 *              ],
 *              "location": "body",
 *              "messages": [
 *                 "\"description\" is required"
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