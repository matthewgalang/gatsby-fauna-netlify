import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
secret: process.env.GATSBY_FAUNADB_COUNTS_READ
})

//async handler
exports.handler = async (event, context) => {
    console.log('Function `count-read-all` invoked')
    return client.query(q.Paginate(q.Match(q.Ref('indexes/all_counts'))))
        .then((response) => {
            const countRefs = response.data
            console.log('Count refs', countRefs)
            console.log(`${countRefs.length} counts found`)
            // create new query out of todo refs. http://bit.ly/2LG3MLg
            const getAllCountDataQuery = countRefs.map((ref) => {
                return q.Get(ref)
            })
            // then query the refs
            return client.query(getAllCountDataQuery).then((ret) => {
                return {
                    statusCode: 200,
                    body: JSON.stringify(ret)
                }
            })
        }).catch((error) => {
            console.log('error', error)
            return {
                statusCode: 400,
                body: JSON.stringify(error)
            }
        })
}