# View Engines

Indtil viderer har vi arbejdet ud fra et koncept der er baseret på en client-side del med HTML/CSS og javascript der via `fetch()` henter data fra en server-side API.
Det fungerer ganske fint, dog er der scenarier hvor den tilgang ikke nødvendigvis er hensigtsmæssig.

F.eks. hele vores administrations panel ligger som helt almindelige HTML filer og kan med lidt snilde indlæses i browseren, også selv om en bruger ikke er logget på. Godt nok er API'en sikret med et token tjek, men selve administrations siden er synlig.

Her kunne det være rart hvis vi kunne sætte en særlig route op på vores server, som kunne håndtere requests og opsætte den side som skal sendes tilbage til klienten, hvis klienten har de nødvendige rettigheder.

Til det formål benyttes et koncept kaldet **View Engines**. Det er en blanding af HTML og JavaScript, som afvikles på serveren. 

Der er en del forskellige, og der er stor variation i hvordan de ser ud. I undervisningen her, vælger vi at fokusere på en bestemt engine, kaldet `ejs`.



Vi skal sætte et projekt op, så vi kan arbejde med `ejs`. 

til det skal vi igennem de sædvanlige trin, med `npm init` og der skal sættes en mappe struktur op.

* server
   * config
   * modules
   * routes
   * services
   * views 
* public

Her har jeg valgt at omdøbe den mappe jeg plejer at kalde `api` til `server`, da dens formål også vil være at servere sider frem for kun at være en API server. 

placer din `app.js` i roden af `server` mappen.

---

## Moduler der skal installeres

Vi skal benytte en samling moduler, for at serveren vil fungere. 

* express
* morgan
* body-parser
* mysql2

Og så prøver vi denne gang, at installere `nodemon` som et globalt modul: `npm install nodemon -g`
Det betyder at nodemon installeres i selve NodeJS installationens moduler, og den vil være tilgængelig på samtlige projekter. Det vil spare lidt plads, men ellers er funktionen den samme.


---


## Opsætning af serveren.

Serveren opsættes som normalt i `app.js` filen, det ser ud som det plejer, dog med få nye tilføjelser:

```javascript
// indlæs express
const express = require('express');
const app = express();

// knyt morgan til som logger
const logger = require('morgan');
app.use(logger('dev'));

// sæt view-engine op til at benytte ejs
app.set('view engine', 'ejs'); // definer template engine
app.set('views', './server/views'); // definerer hvor ejs filerne er placeret

// konfigurer bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

// for at demonstrere at viewengine fungerer, definers en default route
app.get('/', (req, res) => {
   // routens formål er at indlæse templaten kaldet 'index.ejs' 
   // som er placeret i roden af views mappen.
   // der sendes et json objekt med, som indeholder et 'title' og et 'data' element
   // de to elementer er noget vi finder på! .. mere om det senere.
   res.render('index', {
      "title": "Mine Fisk",
      "data": "Akvarie fisk er flotte"
   });
});

// start serveren på en port
const port = 3000;
app.listen(port, (err) => {
   if (err) {
      console.log(err);
   }
   console.log('App is listening on http://localhost:' + port);
});
```



Eksempel på filen `index.ejs` som placers i `server/views/` mappen:
```html
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>
      <%= title %>
   </title>
</head>

<body>

   <main>
      <h1>
         <%= title %>
      </h1>
      <p>
         <%= data %>
      </p>
   </main>

</body>

</html>
```

Til at starte med behøver vi ikke ydeligere filer for at kunne teste funktionen, så husk lige at tilpasse `scripts` i `package.json`, så `npm start` sørger for at genstarte serveren når den kører. 

---

## At sende data til skabelonen

Som demonstreret i eksemplet oven over, kan skabelonen udskrive data i nogle særlige javascript tegn: `<%= data %>` 

Det kaldes et servertag: `<% %>` og der er et par forskellige varianter der er værd at kende.

* `<% %>` betyder at imellem de to procent tegn, skrives ren javascript som udføres på stedet.
* `<%= %>` benyttes til at udskrive indholdet af variabler, i stil med `document.write()` funktionen.
* `<%- %>` benyttes som en `content literal`, det minder om den funktionalitet `innerHTML` arbejder udfra. *(dette vil vi arbejde med senere)*

Hvis skabelonen blot skal udskrive indholdet af *simple variabler*, så er det oplagt at benytte `<%= variabel_navn %>` tilgangen.

Men hvis der er behov for at behandle indholdet før det udskrives, eller det er et array der arbejdes med, så er det oftest nødvendigt at benytte `<% %>` hvor der kodes lidt javascript.

Et eksempel, hvor data er et array:

```html
<main>
   <h1>
      <%= title %>
   </h1>
   <ul>
      <% (data || []).forEach(element => { %>
         <li>
            <%= element %>         
         </li>
      <% }) %>
   </ul>
</main>
```

Hvis `data` ikke findes, så vil det tomme array benyttes istedet, og det forhindrer koden i at fejle hvis f.eks. en data-service har fejlet. Læg mærke til at der hoppes ind og ud af javascript blokken flere gange.




## Det smarte ved view engines

En af fordelene med en view engine, er at vi kan genbruge den samme HTML flere steder, frem for at skulle copy/paste strukturen igen og igen...

Her arbejder `ejs` med et koncept kaldet `partials` som kan importeres og derved indsættes i html strukturen efter behov.

For at afprøve det koncept, oprettes to mapper i `server/views` mappen, en kaldet `pages` og en kaldet `partials`.

I `pages` oprettes en ny fil kaldet `index.ejs` *(eller kopier den du har i roden af views)*

I `partials` oprettes en fil kaldet `head.ejs` 

Indholdet af `head.ejs` skal blot være et simplet `<h1>` tag hvor title elementet udskrives: 

```html
<h1>
   <%= title %>
</h1>
```


I `pages/index.ejs` filen, skal den nye `head.ejs` fil indlæses via en `include` kommando, så find kodenstumpen: 

```html
<h1>
   <%= title %>
</h1>
```

og erstat den med følgende kodelinje:

```html
<% include ../partials/head %>
```

For at kunne teste at skabelonen kan inkludere den nye head, skal vi routen i `app.js` ændres, så den peger på den nye `index.ejs` *(tilføj `pages` ved index)*
```javascript
app.get('/', (req, res) => {
   res.render('pages/index', {
      "title": "Mine Fisk",
      "data": "Dette er data" 
   });
});
```

Test at siden kan vises i browseren.

---





## inkluder html stumper, kontra en skabelon hvor indholdet udskiftes

Tilgangen vi lige har afprøvet fungerer rigtig fint, og kan benyttes til at alle mulige forskellige små HTML stumper efter behov.

Men hvad nu hvis vi har en hjemmeside med mange undersider, hvor header, menu, footer og en sidebar er identiske, så vil vi have fire inkludes på hver side.

Der er en anden tilgang der kan løse den problemstilling, nemlig et koncept kaldet `extend`.

Med `extend` kan vi have ét dokument som er vores overordnede design, hvor al menu osv er placeret, og så er det kun det ene sted i skabelonen hvor inholdet skal placeres der skal udkrives. Her benyttes `content literal` funktionen som blev nævnt tidligere.

Start med at oprette en fil kaldet `template.ejs` som placeres i `views/partials` mappen, og kopier dette indhold ind i den:
```html
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>
      <%= title %>
   </title>
</head>

<body>

   <header>
      <h1>Akvarie Test</h1>
   </header>

   <main>
      <%- content %>
   </main>

</body>
</html>
```

I mappen `views/pages` placeres en fil kaldet `fisk.ejs`, som får dette indhold:

```html
<% extend('../partials/template') %>
   <h2>
      <%= title %>
   </h2>

   <p>
      <%= data %>
   </p>
```

**Sørg for at rette din route, så det er den nye `fisk.ejs` fil der indlæses!**

Siden burde ligne den forrige, blot med en ny overskrift *Akvarie Test* på siden.

---


## data fra en database... hvordan det?

Ind til videre har vi ikke arbejdet med data fra en database, så der er ikke meget dynamisk over siden.

Opret en ny database kald den f.eks. `avanceret_webintegration_del1` og sørg for din `config/mysql.js` fil forbinder til den nye database.

Importer det SQL-dump som ligger i `fisk.sql` filen.


Derefter oprettes en data-service der kan hente alle fisk ud af databasen, ud fra samme princip som vi har arbejdet med tidligere med promises.

Når det er sat op, så oprettes også en route fil som på sigt kommer til at holde på alle vores fiske-routes. Opsæt kun en enkelt route, kaldet `fisk` som benytter den service du lige har oprettet. Husk at indlæse fisk-routen fra `app.js`...


I mit følgende eksempel, er servicen indlæst i en variabel kaldet `fisk_service` og funktionen der henter alle, hedder overraskende nok `hent_alle()`. 

Det svar der kommer tilbage fra servicen, vil blive placeret i `result` variablen som oprettes i `then()` funktionen, og sendes direkte med til `render()` funktionen.
```javascript
fisk_service.hent_alle()
   .then(result => {
      res.render('pages/fisk', {
         "title": "Mine Fisk",
         "data": result
      });
   })
```

Det kræver at vi tilpasser den `fisk.ejs` fil som ligger i `pages`, for nu skal den udskrive et array frem for en simpel variabel. Filens indhold skal se sådan ud:
```html
<% extend('../partials/template') %>
   <h2>
      <%= title %>
   </h2>

   <% (data || []).forEach(element =>{ %>
      <p>
         <%= element.fisk_navn %>
      </p>
   <% }) %>
```

Hvis alle filer er sat korrekt op, og der er linket til dem hvor det er nødvendigt, så burde det være muligt at gå i browseren og besøge `localhost:3000/fisk` og få de 2 fisk udskrevet på siden.

---

## Opgaven.

Nu hvor det er muligt at arbejde med en skabelon, så skal der sættes et par sider op, som kan indlæses via ejs-view-engine.

Der skal oprettes et simplet site hvor vi ser en liste over alle fisk, man skal kunne klikke på en enkelt fisk og komme hen på en simpel detalje side. Derudover oprettes et meget simpelt "administrations panel" hvor det skal være muligt at oprette, rette og slette fisk. Start med at sætte formular og liste op, vent lidt med selve funktionaliteten, og der skal ikke tænkes login. 

Der skal være noget navigation, så man kan klikke rundt imellem de forskellige sider, og sørg for at indsætte en header og en footer.

For at få styles til at fungere, er det nødvedigt at oprette en public mappe, og opstte en static route til den fra `app.js`. Du vil derefter kunne linke til et stylesheet fra din skabelon, præcis som du plejer. Det er også her i public mappen du kan placere billeder til sidens design, hvis du skulle finde på at indsætte lidt billeder.



Det vil være nødvendigt at oprette en service til at hente en enkelt fisk. Hver funktion i det simple adminpanel vil også kræve en route for sig selv, 
