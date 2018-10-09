import {Request, Response} from 'express'

type RPCMethod = (args: object) => Promise<object>
type RPCRunner = (req: Request, res: Response) => Promise<void>

function createRPC (methods: {[key: string]: RPCMethod}): RPCRunner {
  return async function (req, res) {
    try {
      const {method, args} = req.body;
      console.log(method, args, req);
      const result = await methods[method](args);
      res.json(result)
    } catch (e) {
      res.status(500).json({error: `${e}`})
    }
  }
}

export {createRPC}
