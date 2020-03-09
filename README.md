This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-requisites
    Application requires L=latest version of nodeJS and NPM. This application was built on a machine using nodeJS v12.13.1 and NPM v6.12.1

## To Run Locally
    1. cd into the root directory
    2. Run `npm install`
    3. Run `npm start`

## Development approach

    ### Overview

    This is a ReactJS based UI application.React makes it very east to break our UI into smaller,reusable pieces. This application is broken into following such components for modularity and reusability.

        1. Table component
        2. pagination control component
        3. Film Detail component

    We have also created a utility library that exports sort and debounce function to use inside various componenets.

    ### State management

    State management is handled via local state of each main parent components. Since there is no interaction and need for data exchange between sibling components, I felt it would be an overkill to use centralized state management libraries like Redux or Reflux. 

    ### API calls

    I have used Javascript's native fetch method to make asynchronous calls to star wars API. I have also leveraged Promises to make multiple parallel API requests.

    ### Routing

    Routing is handled through React-router package which makes it very easy to declaratively render components based on change in url routes.
