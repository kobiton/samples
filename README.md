1. Install [nodejs](https://nodejs.org/)
2. Open Terminal, navigate to `samples/tests` folder and run `npm install`
3. Access [Kobition](https://kobiton.com) to get *username* and *api key*
5. Prepare 01 gmail account
6. Open `src/config.js`
	1. Replace *username* and *api key* to appropriate variables
  2. Replace *gmail* and *password* of gmail accounts to appropriate variables
	3. Modify`desiredCaps` to match with your available devices
7. Run `npm test` or `NODE_ENV=production npm test`

> To run the same server with different caps so that it can test both
> devices at the same time, open two Terminals

  1. Run `npm run test2`
  2. Run `npm run test3`

> To run the same server with different caps so that it can test both
> devices in the sequence time
> Run `npm run test-sequence`
