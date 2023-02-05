# REACT Eindopdracht Frontend NOVI
### Steven Minken 2023

## Inleiding
Veel mensen zijn ieder dag tijd en energie kwijt met de keuze wat er op tafel zal staan. Daardoor wordt er vaak teruggevallen op de bekende recepten en gerechten terwijl het juist belangrijk is afwisselend en gevarieerd te eten. Daarom heb ik een applicatie geprogrammeerd waarin de gebruiker een aantal passende recepten voorgesteld krijgt om op basis van een specifiek zoekterm. Soms zal de applicatie bijvoorbeeld meer comfort-food recepten voorstellen en wanneer iemand geen zin heeft om te koken worden er snelle en makkelijke recepten getoond.

De belangrijkste functionaliteiten van de applicatie zijn:
* Als gebruiker kan je door alle beschikbare recepten browsen en zo op zoek gaan naar specifieke recepten met behulp van een zoekfunctie.
* Als gebruiker kan je je registreren en inloggen.
* Een ingelogde gebruiker kan zijn persoonlijke gegevens aanpassen en deze worden geregistreerd op de NOVI backend database.
* Een ingelogde administrator kan de gegevens van alle gebruikers ophalen. (m.u.v. de wachtwoorden).

Om dit te mogelijk te maken heb ik een REACT webapplicatie gebouwd waarin gebruik gemaakt wordt van:
* REACT componenten
* REACT state en lifecycles
* REACT routing
* REACT context
* AXIOS voor API calls
* JWT JSON token voor de authenticatie

Daarnaast maak ik gebruik van de Edamam API (https://www.edamam.com/) om recepten op te vragen en te verwerken in mijn applicatie. 
Voor registeren, authentiseren en inloggen van de gebruikers maak ik gebruik van de NOVI backend.

![screenshotDeliciosoHomepage](https://user-images.githubusercontent.com/107759146/216838261-67926486-79ac-458e-ba6f-1d2b87dc2398.png)

## Installatie

Clone de repository naar je eigen computer:
```
git clone git@github.com:stevenminken/recipes-project.git
```

Open het project in een IDE zoals bijvoorbeeld WebStorm van jetbrains.

Nadat het project geopend of gecloned is dienen de `node_modules` geinstalleerd te worden door het volgende
commando uit te voeren in de terminal:

```
npm install
```

De API keys voor Edamam zijn uit veiligheidsoverwegingen niet meegeleverd.
Maak een .env file aan in de root van het project en kopieer daarin de in de documentatie meegeleverde REACT_APP_API_ID en REACT_APP_API_KEY.
Je kunt ook je eigen Edamam ID en KEY gebruiken.

Vervolgens kan de applicatie gestart worden met het commando:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000/) in je browser om de pagina te openen wanneer deze niet automatisch opent.

## Gebruik

De applicatie heeft onder andere de volgende pagina's met REACT routing

1. Homepagina (`/`)
2. Receptenpagina (`/recipe/:id`)
3. Registratiepagina (`/registration`)
4. Loginpagina (`/signin`)
5. Profielpagina (`/profile`)
6. Adminpagina (`/admin`)

Nu ben je klaar om op de applicatie te zoeken naar recepten, te registreren en in te loggen.

