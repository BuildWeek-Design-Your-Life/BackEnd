const request = require('supertest')

const db = require('../database/dbConfig');
const server = require('./server')

describe('server', () => {
    //reset the database before every run
    beforeEach(async () => {
        await db('users').truncate();
    })
    // cross-env DB_ENV=testing
    it('tests are running with DB_ENV set as "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    }) 
    
    describe('POST /register', () => {
        it('should insert one user into the database', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    username: "admin",
                    password: "password"
                })
                .then(res => {
                    // check that the status code is 201
                    expect(res.status).toBe(201);
                })
        })

        it('returns JSON', () => {
            return request(server)
            .post('/api/auth/register')
            .send({
                username: "admin",
                password: "password"
            })
            .then(res => {
                expect(res.type).toMatch(/json/);
            })
        })
    })

    describe('POST /login', () => {
        it('should log user in', () => {
            return request(server)
            .post('/api/auth/login')
            .send({
                username: "admin",
                password: "password"
            })
            .then(res => {
                expect(res.type).toMatch(/json/);
            })
        })
    })

    describe('GET /users', () => {
        it('should get all users from db', () => {
            //insert one
            return request(server)
            .get('/api/users')
            .then(res => {
                //check how many are on the db again
                expect(res.type).toMatch(/json/);
            })
        })        
    })


    describe('PUT request', () => {
        it('should update user activity log', () => {            
            return request(server)
            .put("/api/activity/1")
            .send(
                {
                    "users_act_id": 1,
                    "activity": "coding",
                    "engagement": 7,
                    "energize": 7
                }
            )
            .then(res => {
                expect(res.type).toMatch(/json/);
            })
        })
    })

    describe("DELETE request", () => {
        it("successful delete user activity log", () => {
            return request(server)
            .delete("/api/activity/1")
            .then(res => {
                expect(res.type).toMatch(/json/);
            })
        })
    })

    describe("return 400 for no token", () => {
        //intentional fail
        it("missing token", ()=>{
            return request(server)
            .get("/api/reflect")
            .then(res=>{
                expect(res.status).toBe(400)
            })
        })
    })  
})