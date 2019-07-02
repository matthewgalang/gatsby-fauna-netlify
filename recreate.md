gatsby new gatsby-fauna-netlify
cd gatsby-fauna-netlify
npm i --save faunadb 
npm i --only=dev http-proxy-middleware netlify-lambda npm-run-all
nano ~/.bashrc
    add GATSBY_FAUNADB_SECRET
source ~/.bashrc
nano functions/counts-read-all.js
    change to GATSBY_FAUNADB_SECRET
