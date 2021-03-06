describe('Updated test, Dec 2020', () => {
    it('Log in works without touching API using Intercept feature', () => {
      cy.intercept('POST','/api/v1/auth/login/', (req) => {
        req.reply((res) => {
          res.send({ fixture: 'passiv_stub_base.js'})
        })

        

      cy.intercept({
          url:"/api/v1/auth/login",
          method:"POST",
          status: 200,
          response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
      })
  
      cy.intercept({
        url:"/api/v1",
        method:"GET",
        status: 303,
        response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
    });
  
      cy.intercept({
          url:"/api/v1/help/",
          method:"GET",
          status: 303,
          response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });

      })


      cy.visit('localhost:3000/app/login')
      cy.location('pathname').should('equal', '/app/login')
  
      // enter valid username and password
      cy.get('[name=email]').type('Sincere@passiv.com')
      cy.get('[name=password]').type('test12345@')


      cy.contains('button', 'Sign In')
  

      cy.location('pathname').should('equal', '/app/')
      cy.contains('Total Holdings')
      .should('be.visible')

  })       
      
    })
  