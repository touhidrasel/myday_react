
# factoryworkx pro

With this app, factoryworkx SaaS subscribers can collect directly on the shopfloor quality data using mobile devices. factoryworkx users can keep working time by this app.



## Authors

- [@Touhid](https://git-codecommit.us-east-1.amazonaws.com/v1/repos/factoryworkx_pro)



## User Authentication Concept
[User Authentication] (https://confluence.factoryworkx.com/display/NGA/User+Authentication)

## Documentation

[factoryworkx APIs-DCS_GetJobsByUser_V1]

[API Gateway-https://6s1a38qvo7.execute-api.us-east-1.amazonaws.com/prod/login]

[Cognito- factoryworkx_users] (https://confluence.factoryworkx.com/display/NGA/Cognito+User+Pool)

## How to install and run the project
[Development Environment Setup] (https://confluence.factoryworkx.com/display/NGA/Development+Environment+Setup)


## Include Files

App.js - This is the file for App Component. App Component is the main component in React which acts as a container for all other components.
This is app landing page for factoryworkx pro. Creates app drawer navigation.

app.json - This is a manifest format for the apps. It declares environment variables, add-ons, and other information required to run an app. This document describes the schema in detail.

package.json- The package.json file is the heart of any Node project. It records important metadata about a project which is required before publishing to NPM, 
and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.

package-lock.json- It describes the exact tree that was generated, 
such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

login.js- Renders login input fields and calls APIGatway to authenticate
the user.

joblist.js- Creates job list tiles from a successful API call for timecard creation from manual time and date entry.

joblist_stopwatch.js- Creates job list tiles from a successful API call for timecard creation from stopwatch.

timecard.js- Allows the users to create timecard from a successful API call for manual time and date entry.

timecard_stopwatch.js-  Allows the users to create timecard from a successful API call for manual time and date entry from stopwatch.

user.js- Contains the user information like user name, user id, instance name and error log. Error log is not yet functional.

datacollection.js- This activity will be used for further feature request.

style.js - Contains in app style modules.

babel.config.js - It converts JavaScript code to a different JavaScript code based on how you configure it. 
The most famous use of Babel is converting modern JavaScript es6+ into es5, which is widely supported (even in Internet Explorer).
Below is a Babel transpilation of es6 arrow functions into regular es5.

