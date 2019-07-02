const chalk = require('chalk')

function checkForFaunaKey() {
  if (!process.env.GATSBY_FAUNADB_COUNTS_READ) {
    console.log(chalk.yellow('Required GATSBY_FAUNADB_COUNTS_READ enviroment variable not found.'))
    console.log(`
=========================

You can create fauna DB keys here: https://dashboard.fauna.com/db/keys

In your terminal run the following command:

export GATSBY_FAUNADB_COUNTS_READ=YourFaunaDBKeyHere

=========================
`)

    process.exit(1)
  }
}

checkForFaunaKey()
