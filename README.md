![Analyse with SonarQube](https://github.com/Health-Education-England/trainee-ui/workflows/Analyse%20with%20SonarQube/badge.svg)  
![Master Branch Status: CI/CD Workflow](https://github.com/Health-Education-England/trainee-ui/workflows/CI/CD%20Workflow/badge.svg?branch=master)  
![Deployment Status: CI/CD Workflow](https://github.com/Health-Education-England/trainee-ui/workflows/CI/CD%20Workflow/badge.svg?branch=master&event=deployment_status)

# trainee-ui

Front-end for Training Pathway app

## Tech Stack and Architecture

Full Tech and Architecture are described elsewhere. The front-end uses REST interaction with the back-end service(s).

We've decided to use [React](https://reactjs.org/) to build the UI with a set of libraries for the aspects given below.

## Core Libraries

We'll start by using:

1. [Reach Router](https://reach.tech/router) for Routing\*
2. [React Redux](https://react-redux.js.org/) for State Management
3. [Axios](https://github.com/axios/axios) for HTTP communication\*
4. [Material](https://material-ui.com/) for UI design
5. [Jest](https://jestjs.io/) for unit and snapshot testing\*
6. [Cypress](https://www.cypress.io/) for E2E testing

\*There was wide support for using these.

## Other decisions/Conversation

- There was a clear choice to use typescript rather than prop-types
- We definitely need to review the libraries as part of making sure the tech stack is right for the app
- There's a good chance we'll need to discuss whether to add:
  1. Middleware from [Redux-Saga](https://redux-saga.js.org) or less-likely [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
  2. [enzyme](https://github.com/airbnb/enzyme) in unit and snapshot testing
- We probably won't end up adopting [prop-types](https://github.com/facebook/prop-types) for the additional validation it provides.
- The thread can be picked up from the Jira ticket [Identify Core React Libraries](https://hee-tis.atlassian.net/browse/TISNEW-3581)

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` (unit tests)

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress` (E2E tests)

This will run the E2E tests in headless mode with Cypress. Alternatively, `npm run cypress:open` will allow you to view the tests in the browser. For more information visit (https://www.cypress.io/)

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
