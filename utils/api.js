import nc from 'next-connect'

const api = () => {
  return nc({
    onError: (err, _, res) => {
      res.writeHead(err.response?.status ?? 500)
      res.end(err.response?.data)
    },
    onNoMatch: (req, res) => {
      res.writeHead(405)
      res.end(`Method ${req.method ?? ''} Not Allowed`)
    }
  })
}

export { api }
