### Examples of a valid API call to Wunderground using zipcode as a param

http://api.wunderground.com/api/<YOUR_API_KEY>/forecast/q/<ZIP_CODE>.json

### Instructions

** Instructions
   - Develop the client and backend applications with whatever stack you want. Flask/Angular/MySQL? React/Express/Mongo? Imba/Sinatra/PSQL? ELM/Lambda/Dynamo? We are looking forward to see what you pick.
   - Submit the project to us in a public github.com repository. Include instructions in a README.md on how to install and start the app, and access it.
 
** Part I Backend
***  Create a very simple application that receives HTTP GET requests from a single page app outlined in Part II.
   - Receive a GET request that contains a ZIP code
   - If needed, connects to Wunderground API and gets weather data and persist it. Cache it for one hour. Wunderground API Info: http://www.wunderground.com/weather/api/d/docs?d=data/forecast
   - Returns weather data to the single page app.
   - Think of any ways this API might get broken or abused and account for them. i.e. proper validation, API key ? Use your imagination.
 
** Part II Client
*** Create a simple single page application that connects to the API you create in part 1 of this exercise. The page should do the following:
   - Allow a user to enter a zip code
   - Display a three day forecast for the entered zip code.
   - Display a spinning circle over the forecast while waiting for API data to load to give the user some indication that something is happening while you wait for data.
 
** Part III Docs & Build
   - Add a readme with detailed step by step instructions on how to run your application. Assume Nothing.
   - Dockerfiles, Makefiles, Cloudformation, Ansible, etc  are fine, as long as you provide the commands for how to run them.
 
** Example :
 1) Receive API request from Client Application for zip code 60203.
 2) Check your stored data table for data on 60203 that is less than 1 hour old.
 3) If data is not stale, return it to the user making the API request and you are done.
 4) if data is stale (older than 60 minutes) or non-existent, go to the wunderground API to get the data, update cache and return the data.