#  dp-Table-Builder-UI

## Starting the dev server

Make sure you have the latest Stable or LTS version of Node.js installed.

1. `git clone git@github.com:ONSdigital/dp-table-builder-ui.git`
2. Run `npm install`
3. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder

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
