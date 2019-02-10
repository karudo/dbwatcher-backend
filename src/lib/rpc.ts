import {Request, Response} from 'express'
import {DriverInstancesManager} from '@/lib/dbs/manager';

type RPCRunner = (req: Request, res: Response) => Promise<void>

function createRPC (manager: DriverInstancesManager): RPCRunner {
  return async function (req, res) {
    try {
      const {method, args} = req.body;
      console.log(method, args, req);
      //const result = await methods[method](args);
      //res.json(result)
    } catch (e) {
      res.status(500).json({error: `${e}`})
    }
  }
}

export {createRPC}
