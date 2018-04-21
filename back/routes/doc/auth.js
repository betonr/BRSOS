/**
 * @api {post} /brsos/api/auth/login log in to the system
 * @apiGroup Authentication
 * 
 * @apiParam {String} email Email
 * @apiParam {String} password Password - '[a-zA-Z0-9]{8,30}'
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *    "me": {
 *         "_id": 3asdsaqqe12edwqds,
 *         "name": "beto",
 *         "thumb": binary-code
 *         "lastname": "noronha",
 *         "email": "beto@gmail.com", 
 *         "level": 2,
 *         "cpf": 000000000-00
 *         "registration": "2017-05-31T03:00:00.000Z",
 *         "lastupdate": "2018-03-07T03:00:00.000Z",
 *         "status": true
 *     },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5...",
 *     "messsage": "Authorization success"
 * 
 * @apiErrorExample {json} Failed
 *    HTTP/1.1 401 Unauthorized Failed
 *    "errors": [{
 *            "field": [
 *                  "password"
 *            ],
 *            "messages": [
 *                  "wrong password!"
 *            ]
 *    }]
 * 
 *  @apiErrorExample {json} Failed
 *    HTTP/1.1 401 Unauthorized Failed
 *    "errors": [{
 *            "field": [
 *                  'email','status'
 *            ],
 *            "messages": [
 *                  "User not found or inactive!"
 *            ]
 *    }]
 */