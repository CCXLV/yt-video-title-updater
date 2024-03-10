const { google } = require('googleapis');
const cron = require('node-cron');

require('dotenv').config({ path: __dirname + '/secret.env' });

const authClient = new google.auth.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

authClient.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const youtube = google.youtube({
    auth: authClient,
    version: 'v3'
});

async function main() {
    youtube.videos.list({
        id: process.env.VIDEO_ID,
        part: 'snippet, statistics'
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

        if (response.data.items) {
            if (response.data.items[0]) {
                console.log('Found video. Updating title...');
                updateVideo(response.data.items[0]);
            } else {
                console.log('Zero items in list');
            }
        } else {
            console.log('No items found');
            console.log(response);
            return;
        }
    })
}

function updateVideo(videoData) {
    const { snippet, statistics } = videoData;

    const newTitle = `This Video Has ${statistics.viewCount} Views and ${statistics.likeCount} Likes`;

    snippet.title = newTitle;
    youtube.videos.update({
        part: 'snippet',
        requestBody: {
            id: process.env.VIDEO_ID,
            snippet
        }
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        if (response) {
            if (response.status === 200) {
                console.log('Completed!')
            }
        }
    });
}

cron.schedule('*/45 * * * * *', async function() {
    console.log('Running function...');
    await main();
});