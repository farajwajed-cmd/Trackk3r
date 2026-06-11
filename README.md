# Trackk3r
a simple server capture visits for localhost/xss folder to find blind xss and else ... built with NodeJS runtime 
# Dependencies
be sure to install NodeJs and npm first and run these commands in  :
`$npm install express`
`$npm install cors`
# Take care of
1-writing your password in `environmentVariables.env` and run the server with 
`$./node.exe --env-file=environmentVariables.env`

2 -Admin roots are :
  - localhost/getAllLogs/YOUR_PASSWORD
  - localhost/deleteAllLogs/YOUR_PASSWORD
