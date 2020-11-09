import { config } from 'dotenv';
import { google } from 'googleapis';
config();

const oauth2Client = new google.auth.OAuth2(
  `${process.env.GOOGLE_CLIENT_ID}`,
  `${process.env.GOOGLE_CLIENT_SECRET}`,
  `${process.env.GOOGLE_CALLBACK_URL}`
);

export let redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile']
});


export async function login(auth: boolean){
    let googleResponse = {auth: false, userInfo: {}}
    let oauth2 = google.oauth2({version: 'v2', auth: oauth2Client});
    if (auth) {
        let userInfo = await oauth2.userinfo.v2.me.get();
        googleResponse.auth = true;
        googleResponse.userInfo = userInfo;
        return googleResponse;
    } else {
        return googleResponse;
    }
}

export async function setCredentials(code: any){
    
    if (code) {
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        return true
    }
    return false
}

export async function removeCredentials(){
    oauth2Client.revokeCredentials().then(r => console.log('revoke ', r));
}


