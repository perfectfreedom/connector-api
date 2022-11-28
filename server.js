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
    },
    "thirdShow" : {
      "eventDate" : "25-12-1984"
    }
    
  }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:something/:page',(request,response)=>{
    const arbitraryThing = request.params.something.toLowerCase()
    const page = request.params.page.toLowerCase()
    const url = `https://api.setlist.fm/rest/1.0/user/${arbitraryThing}/attended/?p=${page}`
    fetch(url, {
      headers: {
          'x-api-key': 'u5LIAchLmBhGqtbC2jBMVioW4ubDgassB4Fc',
          'Accept': 'application/json'
      },
    }, {credentials: 'include'})
        .then(res => res.json()) // parse response as JSON
        .then(data => {
         response.json(data);
         console.log(data);
        })
        .catch(err => {
          console.log(`error ${err}`)
        });

/*    if( setlists[arbitraryThing] ){
        response.json(setlists[arbitraryThing])
    }else{
        response.json(setlists['unknown'])
    }*/
    
  })


    



app.listen(PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})