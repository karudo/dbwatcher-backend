function createRPC (methods) {
  return async (req, res) => {
    try {
      const {method, args} = req.body
      console.log(method, args, req)
      const result = await methods[method](args)
      res.json(result)
    } catch (e) {
      res.status(500).json({error: `${e}`})
    }
  }
}

module.exports.createRPC = createRPC
