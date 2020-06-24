# Dating-App [![Build Status](https://travis-ci.org/dewarian/Dating-Shreks.svg?branch=master)](https://travis-ci.org/dewarian/Dating-Shreks)
<img src="https://user-images.githubusercontent.com/13199349/85468844-3fa57880-b5ad-11ea-8ffb-9a98a8feaee7.png" align="right"
     alt="" width="110" height="168">
## Hey Shrek!
You may want to rewind and watch a old classic or watch a great story... But there is no one to watch it with. 
Shrek's Dating-app tries to solve that for you, find someone that enjoys the same type of films you do.

<h3 align="center">Cherry pick your next moviedate</h3>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-install">How To Use</a> •
  <a href="https://github.com/dewarian/Dating-Shreks/archive/master.zip">Download</a> •
  <a href="/wiki">Read Wiki</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Key features

- Create an account with movie preferences
- Pick your favourite movies from the selection
- User finding potentional Netlfix dates

## How to use
- Navigate with your browser (netscape?) to [dating-shreks.herokuapps.com](dating-shreks.herokuapps.com).
- Enter name
- Select movie
- Navigate to users
- Edit / remove user if admin rights.

### Or clone it and run locally
- Create folder where to clone it to, open terminal
- $`git clone https://github.com/dewarian/Dating-Shreks.git`
- $`npm install`
- create a .env file in the folder*
``` DB_NAME=shreks
    PORT=3000
    SESSION_SECRET=LUIGI
    MONGO_URL=mongodb+srv://<YOUR_MONGO_USERNAME>:<YOUR_MONGO_PASS>@<MONGO_DOMAIN>/<DATABASE>?retryWrites=true&w=majority
    OMDB_KEY=<OMDB_API_KEY>
```
- run $`npm run dev` to start developing for the dating-shreks concept app.  
> * `OMDB_API_KEY` is generated by going to the [OMDb website](http://www.omdbapi.com/apikey.aspx) and fill in the data.

### Database

Database software used for this concept app is [mongoDB](https://www.mongodb.com/) on its cloud platform:
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Snapshot from the database 'shreks'
![image](https://user-images.githubusercontent.com/13199349/85480443-54d7d280-b5c0-11ea-8bb2-9e3c95a0ac20.png)  
Snapshot of two documents within collection 'users'.
![image](https://user-images.githubusercontent.com/13199349/85480390-3e317b80-b5c0-11ea-9d63-75d6e4c5bf7b.png)  



## Credits

This concept app is developed by the following people
* [ParvinBDJ](https://github.com/ParvinBDJ/)
* [uxtothemax](https://github.com/uxtothemax)
* [dewarian](https://github.com/dewarian)

## License

MIT

