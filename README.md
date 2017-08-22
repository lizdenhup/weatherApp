# weatherApp
weatherApp is a React-Rails application for fetching forecast data from the Wunderground API. The back-end of this application was built using Rails 5 in api-only mode and the front-end is built with React. The back-end uses HTTP Caching to deliver quick responses if the data being requested is less than one hour old.

# Set-up 
These instructions are written from the perspective of a Mac user. If you are using a Windows machine, replace the Mac commands with their Windows counterparts inside your Windows shell.

To run this application, clone this repository to your machine. Use your terminal to cd into the weather_api directory within the weatherApp folder. Enter the command 'rails s -p 3002' into your
terminal to start the server for the back-end API. Now open another terminal tab. cd into the 'client' subdirectory within the weather_api folder. Type 'yarn start' (or 'npm run && npm start' if npm your preferred package manager) to start the server for the front-end of the app. 

Your internet browser should bring you to localhost:3000 automatically. Now you are ready to use the application. Enter a 5-digit zipcode into the search bar and press enter or click the submit button. A modal window with the forecast should appear (or an alert warning you that something went awry, if you did not enter a valid zip code). 

# License
This project is available for use under the MIT license. You can read more about this license [here](https://opensource.org/licenses/MIT).