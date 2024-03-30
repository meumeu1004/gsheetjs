const {google} = require ('googleapis');
const keys = require ('./keys.json');

const client = new google.auth.JWT(
    keys.client_email, 
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);


client.authorize(function(err, tokens){

    if (err){
            console.log(err);
            return;
    }   else{
        console.log('Connected!');
        gsrun(client);
    }
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth:cl }); 

    const opt = {
        spreadsheetId: '1jdEUJK2uw71YAn_AeK3uEQK77oOtGCVOI12TJHWN0QE',
        range: 'Data!A2:F5'

    };

    let sheetdata = await gsapi.spreadsheets.values.get(opt);
    let sdataArray = sheetdata.data.values; 
    let newDataArray = sdataArray.map(function(r){
         r.push(r[0] + '-' + r[1] + r[2] + r[3] + r[4] + r[5]);
        return r;

});
    console.log(newDataArray);

}