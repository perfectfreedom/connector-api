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

app.get('/api/:something',(request,response)=>{
    let myArray = [];
    let itemsEvaluated = 0;
    let pageNumber = 1;

    const arbitraryThing = request.params.something.toLowerCase()
    //Create a do while loop like the one I sent to Bryce, to make a code block execute only the requisite number of times to iterate through each page
    //Within that code block, grab the data on the page we're on, and then increment the page for next time
    //Take that data, which should come in the form of an object, and add it to an array. Ultimately, respond with that array

    do {
      const url = `https://api.setlist.fm/rest/1.0/user/${arbitraryThing}/attended?p=${pageNumber}`
      fetch(url, {
        headers: {
           'x-api-key': 'u5LIAchLmBhGqtbC2jBMVioW4ubDgassB4Fc',
           'Accept': 'application/json'
        }
      })
          .then(res => res.json()) // parse response as JSON
          .then(data => {
          const itemsPer = data["itemsPerPage"];
          const theTotal = data["total"];
          myArray.push(data);
          })
          .catch(err => {
            console.log(`error ${err}`)
          });
          itemsEvaluated += itemsPer;
        } while (itemsEvaluated < theTotal);

        response.json(myArray);

/*    if( setlists[arbitraryThing] ){
        response.json(setlists[arbitraryThing])
    }else{
        response.json(setlists['unknown'])
    }*/
    
  })


    



app.listen(PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})