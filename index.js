
const express = require('express');
const app = express();
const APP_ID = '050e146b-4f4a-46df-95ad-8d068d3dd653';
const APP_SECERET = 'VC78Q~-.pn6HnSU~utS2pjL8DmeWGqCbdK1AQarN';
const TOKEN_ENDPOINT ='https://login.microsoftonline.com/8348fff7-e900-434d-b232-295abc2d42a7/oauth2/v2.0/token';
const MS_GRAPH_SCOPE = 'https://graph.microsoft.com/.default';
const axios = require('axios');
const qs = require('qs');
var accessToken ='';

port = process.env.PORT || 3000;
 
app.use(express.static('public'));



    // app.get('/', async (req, res) => {
async function GetToken() {
        const postData = {
            client_id: APP_ID,
            scope: MS_GRAPH_SCOPE,
            client_secret: APP_SECERET,
            grant_type: 'client_credentials'
          };
          
          axios.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded';
          
          await axios.post(TOKEN_ENDPOINT, qs.stringify(postData))
            .then(async response => {
            //   console.log(response.data);
              accessToken = response.data.access_token;
          
              //  apiUrl = 'https://graph.microsoft.com/v1.0/users/';
            //   const accessToken= (response.data.access_token);
            })
            .catch(error => {
              console.log(error);
            });
        }

        async function getProfileData() {
          const MS_GRAPH_USERS_ENDPOINT = 'https://graph.microsoft.com/v1.0/users';
      
          try {
              const response = await axios.get(MS_GRAPH_USERS_ENDPOINT, {
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              });
      
              const users = response.data.value;
             
              return users;
          } catch (error) {
              console.error('Error:', error);
              throw error;
          }
      }
      
      (() => {
        
          try { GetToken().then( async (req,res)=> {

          

            await getProfileData().then(profileData =>
              {
                console.log(profileData)
                // res.send(profileData);

                app.get('/results', function (req, res){
                  res.json(profileData);
                })
                app.listen(port, () => {
                  console.log(`Server is running on port ${port}`);
              });
              });
            // console.log('Profile Data:', userdata);
          });
         
          } catch (error) {
              console.error('Error fetching profile data:', error);
          }

      })();
      
    


            