# Guide til oprettelse af droplet med Digital Ocean

## Opret bruger på Digital Ocean
Link: https://cloud.digitalocean.com/

Brug skolemail til oprettelse af bruger.

*E-mail: 4514756@RTS-365.dk *

## Oprettelse af droplets

step 1: vælg distribution CentOS version 6.9x32

step 2: "Choose a size" vælg 1 GB 

step 3: vælg datacenter region, det er at fortrække at vælge Amsterdam eller Frankfurt.

step 4: vælg et hostnavn, gør det kort og præcist som f.eks. "fisk" eller "test".

step 5: Tryk på gem, tadaaa!

step 6: Når droplet er loaded færdigt, bliver der sendt en kode samt IP-adresse til din mail. 

Det vil komme til at se nogenlunde således ud
```diff
Droplet Name: fisk
IP Address: 138.68.98.235
Username: root
Password: 10958f86a102af2b2f7efd924c
```
Nu er du klar til opsætning af Linux :-)

# Guide til opsætning af en Linux webserver med en MySQL database

## *Linux-server med Node.js & MySQL*

## Log på 
som Mac bruger har jeg en indbygget terminal klar til brug, men windows folk skal lige downloade putty først.

*Log på med IP-Adressen*
```
ssh root@138.68.98.235
```
*Skriv adgangskoden du har modtaget via mailen*



*ændre den til noget mere mindeværdigt*


## 0. Installer Nano
Nano er en linux tekst editor, som er simpel at bruge.

*Installation*
```diff
yum install nano
```
*Command Keys*
Du du bruger nano, control characters (CTRL) er repræsenteret af carat (^). Eksempelvis, hvis du ønsker at skære en linje tekst ud, vil man bruge “CTRL” key efterfulgt af “K” key. Denne sekvens af kommandoer er repræsenteret som ^K i nano.
Nogle kommandoer bruger "Alt" key før det fungerer, dette er repræsenteret af bogstavet "M". En kommando repræsenteret som M-R i nano, bliver udført ved at trykke "Alt" efterfulgt af "R" key. Hvis man har Mac som jeg har, kan man nøjes med at trykke "Escape" (Esc) key, istedet for "Alt" key lige i forhold til disse kommandoer.

*Lav og åben en fil*
Skriv nano uden nogle argumenter, så vil der blive åbnet en blank fil man kan redigere i.
Hvis du laver ændringer i filen, vil du blive bedt om at vælge et filnavn.

*Godt tip: Hvis der er en module der ikke kan installeres eller en fil man ikke kan få adgang til, prøv at bruge sudo foran ens kommando*

## 1. Installer MySQL
MySQL er en flertrådet SQL-databaseserver som understøtter mange samtidige brugere. SQL (Structured Query Language) er det mest populære databasesprog i dag. MySQL er et klient/server-program der består af en server (mysqld) og mange forskellige klientprogrammer.

Installation
```
yum install mysql-server
```
Start/stop/restart
```
service mysqld start/stop/restart
```

Konfigurer MySQL
```
sudo /usr/bin/mysql_secure_installation
```
Når du har MySQL installeret på din droplet, kan du få adgang til MySQL shell ved at skirve den følgende kommando

```
mysql -u root -p
```

## 2. Installer Node.js
Node.js er et open source, cross-platform runtime system til udvikling af server-side webapplikationer. Node.js er skrevet i JavaScript og kan køres i node.js runtime på en bred vifte af platforme, herunder Microsoft Windows, Google Chrome OS, Linux, FreeBSD, Apple OS X,IBM AIX, IBM System z og IBM i. Node.js er hostet og støttet af Node.js Foundation, et samarbejdsprojekt hos Linux Foundation.

Installation
```
yum install epel-release
yum install nodejs
yum install npm
npm install -g n
```
Opdater nodejs
```
n lts
n
```

**Genstart din linux-box nu.**

## 3. Installer PM2
PM2 er en process manager til Node.js applikationer.

Installation
```
npm install -g pm2
```

Kør PM2 ved startup
```
pm2 startup
```

## 4. Installer Git
Installation
```
yum install git
```

Konfiguration
```
git config --global user.name "Dit navn"
git config --global user.email "din@email.dk"
```

Tjek konfigurationen
```
nano ~/.gitconfig
```

## 5. Opret et nøglesæt til at logge ind på GitHub
Opret nøglesæt
```
ssh-keygen -t rsa
```

Åbn den offentlige nøgle
```
nano ~/.ssh/id_rsa.pub

*skriv dette for at åbne nøglen i terminalen*

cat ~/.ssh/id_rsa.pub

Nøgle kommer til at ligne noget alá dette:
*ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAx5/Z2hdHIgbG2Kpr0VZ1/dDf1KWWpDUZROQz0C6GArVLzAkUsutqc0R1Zo5yNVr7gy/rV7khXTf10Sgv7kMTrTQzR6ocTbHNvienGG3QQJRqEVfvzsgTw/ejYqjFh8RETkE9rli2DGfRk79XxA7LlCaosTw5RZWl57HzOGz3aYzrL+urtpfQS3XPI4/gUv1GtCt+9UAqr6tDmoKzHM6kvIPunL7GGM5oZOOBmtYizIV7gLBu4SzZ2LAVPuXc53DwUYpV2BvIZcP7OCJVrmYa2D4D3TYhg6b1BJeapqL2WpRhG1P/LMtcdZ9Wf5t/3OdAXWEtfv/DCczSXrZQPIhqOQ== root@fisk*

Kopier indholdet af den offentlige nøgle til GitHub -> Settings -> SSH and GPG keys -> New SSH key
```

## 6. Opret en mappe til din applikation
```
mkdir ~/www
```
Naviger ind i mappen
```
cd ~/www
```

## 7. Klon dit repository fra GitHub
```
git clone git@github.com:brugernavn/repository
```

(og når du har en opdatering, skal du lave et pull)
```
git pull git@github.com:brugernavn/repository
```

# Opsætning af MySQL på linux-box

### Første del 

## 0.
Vi skal først give nogle tilladelser før vi kan logge på MySQL server

´´´
mysql -p
´´´
p'et står får password, så du skal skrive dit password til root brugeren.

## 1.
Dernærst giv root brugeren lov til at logge ind fra andre adresser end localhost.

´´´
GRANT ALL ON *.* TO 'root'@'%'

´´´
Dette *.* betyder 'alle databaser samt alle tabeller' dvs. at brugeren får adgang til alle databaser samt tabeller på MySQL serveren.

% står for alle host dvs root må gøre alle handlinger alle databaser samt tabeller

## 2. 
Sæt kodeord til root-brugeren når man logger på fra andre adresser end localhost

´´´
SET PASSWORD FOR 'root'@'%' - PASSWORD:('HetSkriverDuDitPassword');

´´´

Til sidst skal vi lige ud af MySQL og ud i vores hjemmemappe på linuxmaskinen igen, skriv derfor :

´´´
quit;
´´´
### Anden del

Nu har vi givet root brugeren adgang, nu skal vi bruge MySQL workbench
## 0.



