# zds-api-client

[![NPM Package](https://nodei.co/npm/zds-api-client.png?compact=true)](https://www.npmjs.com/package/zds-api-client)

[![Coverage Status](https://coveralls.io/repos/sandhose/zds-api-client/badge.svg)](https://coveralls.io/r/sandhose/zds-api-client) [![Build Status](https://travis-ci.org/sandhose/zds-api-client.svg?branch=master)](https://travis-ci.org/sandhose/zds-api-client)

Client Javacript pour l'API de [Zeste de Savoir](http://zestedesavoir.com/). Fonctionne avec Node.js, et dans le navigateur via browserify/webpack.

## Utilisation

```shell
npm install zds-api-client
```

Les méthodes de ce client suivent à peu près celle de l'API, sous la forme `api.{nom de l'api}().{methode}({parametres}, {callback})`, avec la méthode en camelCase.

#### Exemple 1: lister les membres

```js
var api = require("zds-api-client");

api.membres().list(function(err, results) {
    if(err) throw err;

    console.log(results);
    /*
       { count: 1337,
         results: [{
             pk: 1,
             username: 'John Doe'
         }, ...]
       }
    */
});
```

#### Exemple 2: Bannir un membre

Pour certaines "sous-resources", il faut chainer avec la méthode `patch(pk)`

```js
var api = require("zds-api-client");

api.membres().patch(136).ban.set(function(err, results) {
    // ...
});
```

Jetez un oeil dans `api/` pour voir toutes les méthodes de l'API.

#### Exemple 3: Modifier un membre

Les données de formulaires POST/PUT doivent passer par le paramètre `resource`. Le callback est d'ailleurs optionnel

```js
var api = require("zds-api-client");

api.membres().update({ pk: 136, resource: {
    sign: "npm <3"
});
```

### OAuth2

```js
var api = require("zds-api-client");
var OAuth2 = api.auth.OAuth2;

var authClient = new OAuth2(CLIENT_ID, CLIENT_SECRET);
authClient.getToken({
    username: "John Doe",
    password: "123456"
}, function(err, tokens) {
    if(err) throw err;

    authClient.credentials = tokens;

    console.log(tokens);
    /*
        {
            access_token: ...,
            refresh_token: ...
        }
    */

    // On fait une requete avec l'authentification
    api.membres().monProfil({ auth: authClient }, function(err, results) {
        // ...
    })
});
```

Vous pouvez sauvegarder le refresh_token dans votre base de données pour l'utiliser pour regénérer un access_token plus tard:

```js
var api = require("zds-api-client");
var OAuth2 = api.auth.OAuth2;

var authClient = new OAuth2(CLIENT_ID, CLIENT_SECRET);
authClient.getToken({
    refresh_token: ...
}, function(err, tokens) {
    // ...
});
```

L'access token est automatiquement rafraichit s'il arrive à expiration lors d'une requête.

### Changer l'URL de base

Par défaut, les requètes se font sur `https://zestedesavoir.com`. Si vous voulez changer cette URL, utilisez la méthode `api.setBaseURL`.

```js
var api = require("zds-api-client");

api.setBaseURL("http://localhost:8000");
api.membres().list(function() { ... });
```

