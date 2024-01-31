const { google } = require('googleapis');
const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

//make sure you have GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS set up in the env variables
async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({spreadsheetId, auth}) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
  });
  return res;
}


module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
}
