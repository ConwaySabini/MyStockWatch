<h1 align="center">Welcome to MyStockWatch 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ConwaySabini/MyStockWatch#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ConwaySabini/MyStockWatch/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ConwaySabini/MyStockWatch/blob/master/LICENSE" target="_blank">
    <img alt="License: Creative Commons Attribution--NonCommercial--NoDerivs 3.0 Unported License" src="https://img.shields.io/github/license/ConwaySabini/MyStockWatch" />
  </a>
</p>

Link: https://my-stock-watch.netlify.app/

> A stock tracking platform which includes technical analysis, news, list management, accounts, user authentication, and more
> MyStockWatch is a full-stack web app where you can create an account, add and remove stocks, 
  analyze stocks with different time frames and using various technical analysis indicators, 
  keep a list of favorites, create custom lists, check financial news and stock specific news, and more. 
  This application was deployed to Netlify and Heroku, with the front-end on Netlify, and the back-end on Heroku. 
  I used financial and news APIs to fetch the relevant data for the application and Auth0 for user authorization. 
  I Designed the front end with Bulma, component based architecture, and react hooks. 
  The server and API was implemented with NodeJS, Express, and MongoDB for storing the users, stock data, etc.
  
  > To run this code locally, you can clone the repo and run npm install or yarn install to get all of the dependencies.
  Then change the directory to the client and run npm install or yarn install again to get all of the client dependencies.
  You will need to create your own environment variables in a file with a mongoDB database in order for the API calls to 
  the financial data and back-end to work. Twelve Data and Bing News are the financial APIs being used.
  In the base directory, run docker-compose build to create the deployment image.
  Then run docker-compose up -d to run the image which will contain both the front end and the back end in a single docker image.

### 🏠 [Homepage](https://github.com/ConwaySabini/MyStockWatch#readme)

Architecture:


![image](https://user-images.githubusercontent.com/53063791/194472711-b0909676-e376-4e81-a0e8-959c3c1b3e20.png)


Dashboard:



![image](https://user-images.githubusercontent.com/53063791/194472676-66281f63-96f0-4bca-baf4-6acc528662e8.png)


### ✨ [Demo](https://my-stock-watch.netlify.app/)

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Ethan Sabini**

* Website: [Ethan Sabini](https://my-stock-watch.netlify.app/)
* Github: [@ConwaySabini](https://github.com/ConwaySabini)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ConwaySabini/MyStockWatch/issues). You can also take a look at the [contributing guide](https://github.com/ConwaySabini/MyStockWatch/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Ethan Sabini](https://github.com/ConwaySabini).<br />
This project is [Creative Commons Attribution--NonCommercial--NoDerivs 3.0 Unported License](https://github.com/ConwaySabini/MyStockWatch/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
