const admin = require("firebase-admin");

const firebaseConfig = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
});

const dbInstance = admin.firestore();

const getUsers = () => {
  const userRefs = dbInstance.collection("users");
  return userRefs.get().then(snapshot => {
    return snapshot.docs.map(doc => doc.data());
  });
};

exports.handler = function(event, context, callback) {
  getUsers()
    .then(data => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ data })
      });
    })
    .catch(err => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ error: err.message })
      });
    });
};
