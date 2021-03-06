import config from 'infrastructure/config'

const Register = ({ email, code }) => ({
  Message: {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: `
          <html>
            <body>
              <h1>Hello ${ email }</h1>
              <p style="color:red">
                Thanks for Register
              </p>
              <p>Media Network welcome ! Click the link below to setup password</p>
              <a href="${ config.baseUrl }/reset-password/${ code }">Click here setup new password</a>
            </body>
          </html>
        `
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Register Media Network'
    }
  }
})

export default Register
