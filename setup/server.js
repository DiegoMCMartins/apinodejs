import restify from 'restify'

export const server = restify.createServer()

server.use(restify.plugins.queryParser({ mapParams: false, allowDots: true }))
server.use(restify.plugins.bodyParser({ mapParams: false }))

const port = process.env.PORT || 3000;

server.start = () => {
  server.listen(port, () => console.log('Started'))
  return server
}