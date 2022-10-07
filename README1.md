MyStockWatch: https://my-stock-watch.netlify.app/

Architecture:


![image](https://user-images.githubusercontent.com/53063791/194419656-fe5d3aaa-103e-4074-a331-75c932927810.png)


Dashboard:


![image](https://user-images.githubusercontent.com/53063791/194419949-316760b3-34a5-49b1-a23e-be4e10e7735e.png)



  Just create an account and follow the instructions to begin using the stock tracker application.

About:

  MyStockWatch is a full-stack web app where you can create an account, add and remove stocks, 
  analyze stocks with different time frames and using various technical analysis indicators, 
  keep a list of favorites, create custom lists, check financial news and stock specific news, and more. 
  This application was deployed to Netlify and Heroku, with the front-end on Netlify, and the back-end on Heroku. 
  I used financial and news APIs to fetch the relevant data for the application and Auth0 for user authorization. 
  I Designed the front end with Bulma, component based architecture, and react hooks. 
  The server and API was implemented with NodeJS, Express, and MongoDB for storing the users, stock data, etc.
  
  To run this code locally, you can clone the repo and run npm install or yarn install to get all of the dependencies.
  Then change the directory to the client and run npm install or yarn install again to get all of the client dependencies.
  You will need to create your own environment variables in a file with a mongoDB database in order for the API calls to 
  the financial data and back-end to work. Twelve Data and Bing News are the financial APIs being used.
  In the base directory, run docker-compose build to create the deployment image.
  Then run docker-compose up -d to run the image which will contain both the front end and the back end in a single docker image.
