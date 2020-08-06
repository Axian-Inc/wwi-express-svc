# FFTHH Express Service
A basic express server with TypeScript for use in FFTHH 2020.

## Getting Started
This project makes use of Docker and VS Code to provide a portable and explicit environment to develop against and target deployments towards.

### Workstation Dependencies
Ensure you have the following installed on your workstation:
*   [Docker Desktop](https://www.docker.com/products/docker-desktop)
*   [Visual Studio Code](https://code.visualstudio.com/download)
*   [Remote Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Running Locally
1. Clone down this repository.
2. Open the folder in VS Code, the `Remote Containers` extension will notice the `.devcontainer\devcontainer.json` and attempt to build a container to house this environment and open this folder inside the container, as described by the project's root `Dockerfile`.
3. Once VS Code is running with the folder hosted out of the container, set the application config in the `.env` file. This is where credentials to the database server are set, along with the target `PORT` to host the serviceon. You can source these values from Gabe Harris or Tyler Holmes or the Lab notes.
```
PORT=8081
DB_HOST=someDatabaseServer.database.windows.net
DB_USER=someUser
DB_PASS=somePassword
```

4. Run this application via one of the following means:
    - `Start the application in a debugging session`: Press `F5`, or click `Debug -> Start Debugging` from the VS Code top navigation.
    - `Start the application w/out debugger`:
        - Press `CTRL + F5`, or click `Debug -> Start Without Debugging` from the VS Code top navigation.
        - Open a new VS Code terminal and run `yarn develop`

### Running Tests
Tests are written in TypeScript and orchestrated via Jasmine. These tests are executed by running  the command below from the terminal (see `package.json` for underlying command).
```
$> yarn test
```

### Compiling Code
This application is written and executed locally using TypeScript (using the `ts-node` transpiler), but we'd rather run node/javascript in production.
Run the command below from the terminal to execute the `tsc` compiler on our project using the settings in `tsconfig.json`.

This process populates the `./dist` folder with semantically equivalent javascript. It also makes use of a `postbuild` command in the `package.json` which copies over `node_modules` and `package.json` (which has our startup command to run when we're deployed).
```
$> yarn build
```

### Running in Azure
We'll run a different command in Azure so that we're executing the raw javascript as opposed to transpiling at runtime.

**NOTE**: A big difference when running in live is that we won't be loading the contents of the `.env` file. You'll need to set this config in Azure for any appSettings/environment variables.
Also, this command is intended to be run from INSIDE the `./dist` folder.

 ```
 $> yarn live
 ```