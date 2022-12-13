# RailRoad 🚆

RailRoad est une application web d'achat de tickets et cartes de bus, métro et train dans la blockchain Ethereum.

# Comment installer
## Prérequis
- nodeJS et npm
- Ganache
- truffle

## Déployer le contrat

Rendez-vous dans le dossier *truffle*.

Dans le fichier /*migrations/1_deploy_contracts.js*, modifier la ligne 4 en remplacant l'adresse eth par une adresse existante dans votre réseau (cette adresse sera l'administrateur).

excutez la commande `truffle deploy`

## Application web

Rendez-vous dans le dossier *web*.

éxecutez les commandes suivantes dans l'ordre
```
// Pour télecharger les node modules
npm i

// Pour lancer le serveur react
npm start
```
