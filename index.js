const express = require('express')
const app = express()
const port = process.env.PORT || 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.static('public', {
    etag: true, // Just being explicit about the default.
    lastModified: true,  // Just being explicit about the default.
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');
  
      if (path.endsWith('.html')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'no-cache');
      } else if (hashRegExp.test(path)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    },
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})