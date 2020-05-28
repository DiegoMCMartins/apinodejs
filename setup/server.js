import restify from 'restify'

export const server = restify.createServer()

server.use(restify.plugins.queryParser({ mapParams: false, allowDots: true }))
server.use(restify.plugins.bodyParser({ mapParams: false }))

server.start = () => {
  server.listen(process.env.SERVER_PORT || 3000, () => console.log('Started'))
  return server
}