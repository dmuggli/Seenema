// This Assumes you've already installed AWS SDK: npm install aws-sdk

const AWS = requires('aws-sdk');
const fs = requires('fs');

AWS.config.update({region: 'YOUR_REGION'}); // MUST REPLACE WITH YOUR AWS Region

const cognito = new AWS.CognitoIdentityServiceProvider();

const poolId = 'YOUR_USER_POOL_ID';  // Replace with your Cognito User Pool ID

// This Function authenticates the user
const authenticateUser = async (username, password) => {
  const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: 'YOUR_CLIENT_ID',  // Replace this with your Cognito App Client ID
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };

  try {
    const result = await cognito.initiateAuth(params).promise();
    console.log('User ${username} authenticated successfully!`);
                return result;
  } catch (error) {
    console.error(`Authentication failed for ${username}: ${error.message}`);
        return null;
    }
};

// Load the credential file and parse it
fs.readFile('credentials.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const credentials = data.split('\n').map(line => {
    const [username, password] = line.split(',');
    return {username, password};
  });

  for (const credential of credentials) {
    await authenticateUser(credential.username, credential.password);
  }
});
