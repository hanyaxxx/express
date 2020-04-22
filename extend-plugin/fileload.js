app.post('/postfile',(req,res)=>{
  const { query ,params} = req
  let data = ''
  req.on('data', function (chunk) {
    data += chunk
  })

  req.on('end', function () {
  
    res.send({success:'成功了',haha:123})
    res.end()
    
  })

  

})

app.get('/postfile', (req, res) => {
  const{ query }=req
  debugger
  res.end()

})