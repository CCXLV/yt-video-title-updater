# YouTube video title updater
Automatically updates YouTube video title and puts number of views and likes in the title.

## Get credentials
1 - Create a project with YouTube Data API V3 service, create OAuth 2.0 Client ID and get Client SECRET and ID [Google Cloud Console](https://console.cloud.google.com).                          
2 - Authorize YouTube Data API V3 and get Refresh token [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground).           
3 - Get the video id which you want to update.

Put all these credentials in their places in `secrets.env.example`, then rename the file and remove `.example` from it (name has to be `secrets.env`)

### Set up
Install the dependencies
```cmd
npm i
```
Run the server
```
node main.js
```
