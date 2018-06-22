# Guide til oprettelse af droplet med Digital Ocean

## Opret bruger på Digital Ocean
Link: https://cloud.digitalocean.com/

Brug skolemail til oprettelse af bruger.

*E-mail: 4514756@RTS-365.dk *

## Oprettelse af droplets

step 1: vælg distribution CentOS version 7.5x64
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

![Alt text](relative/billeder/linux1.jpg?raw=true "Title")

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

## 1. Installer MySQL
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

## 2. Installer Node.js
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
