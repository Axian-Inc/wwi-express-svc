# FFTHH Express GraphQL Service
A basic express server with typescript, ready for graphql.

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
3. Once VS Code is running with the folder hosted out of the container, set the application config in the `.env` file.
4. Run this application via one of the following means:
    - `Start the application in a debugging session`: Press `F5`, or click `Debug -> Start Debugging` from the VS Code top navigation.
    - `Start the application w/out debugger`:
        - Press `CTRL + F5`, or click `Debug -> Start Without Debugging` from the VS Code top navigation.
        - Run `npm start` from the container environment terminal.