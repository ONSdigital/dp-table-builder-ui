# dp-table-builder-ui

## Starting the dev server

To run dp-table-builder-ui you must have:

1. [nvm](https://github.com/nvm-sh/nvm) installed:

   ```shell
   brew install nvm
   ```

   :warning: Make sure to follow the instructions provided at the end of the install to configure up your shell profile.

1. The node version specified in [`.nvmrc`](./.nvmrc) installed through nvm:

   ```shell
   nvm install
   ```

Once you have installed those dependencies and cloned this repo you need to run the following:

1. Move into the correct directory

    ```shell
    cd dp-table-builder-ui
    ```

1. Build node modules (you won't need to do this everytime only when the assets need to be rebuilt)

   ```shell
   make node-modules
   ```

1. Run the server

   ```shell
   make debug
   ```

1. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `make audit`- Runs audit check
- `make build` - Builds into npm package
- `make debug` - Runs dev server
- `make lint` - Runs lint checks
- `make test` - Runs tests
- `make node-modules` - Builds dependencies
- `make clean` Deletes built assets
- `make help` - Show help page for list of make targets

## Troubleshooting

### Error saying python2 not found in path for macOS users

#### Solution You will need to install python2

As other services use Python3, it is advised to use pyenv to manage the python versions
There is a `.python-version` file that will set the python version locally

1. `brew install pyenv`
2. if running on macOS 10.9 > then run
`brew install zlib; CPPFLAGS="-I$(brew --prefix zlib)/include" pyenv install 2.7.16`
else run
`pyenv install 2.7.16`
3. `pyenv local 2.7.16` (This command shouldn't be required but if the dot file isn't picked up then this will set it)
