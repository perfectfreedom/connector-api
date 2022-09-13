const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8000

app.use(cors())

const setlists = {
  "firstuser" : {
    "firstShow" : { 
      "eventDate" : "23-08-1964"
    }
  },
  "seconduser" : {
    "firstShow" : {
      "eventDate" : "23-06-1964"
    },
    "secondShow" : {
      "eventDate" : "25-12-1995"
    }
    
  }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:something',(request,response)=>{
    const arbitraryThing = request.params.something.toLowerCase()

    if( setlists[arbitraryThing] ){
        response.json(setlists[arbitraryThing])
    }else{
        response.json(setlists['unknown'])
    }
    
  })

app.listen(PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})