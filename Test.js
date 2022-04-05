const googleIt = require('google-it')

googleIt({'query': '1 + 1'}).then(results => {
    console.log(item.title,item.link,item.googleIt)
  }).catch(e => {
    // any possible errors that might have occurred (like no Internet connection)
  })
  