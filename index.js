import { server } from './setup/server';
import * as jwt from './setup/jwt'

const hotelClients = require('./api/data/hotelClients.json');

const findById = (id) => {
  return new Promise((resolve, reject) => {
    let clientFinded = null;

    for (const client of hotelClients.data) {
      if (client.id === id){
        clientFinded = client;
        break;
      }
    }

    if (clientFinded) {
      resolve(clientFinded);
    } else {
      reject(clientFinded);
    }
  })
}

const findOne = ({email, password}) => {
  return new Promise((resolve, reject) => {

    let clientFinded = null;
    for (const client of hotelClients.data) {
      if (client.email === email && client.password === password) {
        clientFinded = client;
        break;
      }
    }

    if(clientFinded) {
      resolve(clientFinded);
    }else{
      reject(clientFinded);
    }
  })
}

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  
  try {
    const payload = await jwt.verify(token)
    const user = await findById(payload.user)
    

    if (user === null) {
      
      return res.send(401)
    }

    req.auth = user

    next()
  } catch (error) {
    res.send(401, 'Invalid token')
  }
}

server.get('/login', async (req, res) => {
  const [, hash] = req.headers.authorization.split(' ')
  const [email, password] = Buffer.from(hash, 'base64')
    .toString()
    .split(':')

  try {
    const user = await findOne({ email, password })

    if (!user) {
      return res.send(401)
    }

    const token = jwt.sign({ user: user.id })

    res.send({token})
  } catch (error) {
    res.send(404, error)
  }
})

server.get('/info', authMiddleware, async (req, res) => {
  try {
    const {name, email} = req.auth
    
    res.send({name, email})
  } catch (error) {
    res.send(error)
  }
})

server.get('/reservas', authMiddleware, async (req, res) => {
  try {
    const { reservas } = req.auth

    res.send(reservas)
  } catch (error) {
    res.send(error)
  }
})

server.start();