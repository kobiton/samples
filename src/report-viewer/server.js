const _ = require('lodash')
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.engine('.html', require('ejs').__express)
app.set('views', __dirname)
app.set('view engine', 'html')
app.use(express.static('reports'))

function generateReport(folder, prefix, req, res) {
  const pageSize = 10
  let currentPage = 1
  let pageCount = 0
  let totalResults = 0
  let resultsArrays = []
  let resultsList = []
  let results = []
  let currentArrayIndex = 1

  fs.readdir(folder, function (err, files) {
    if (err) {
      res.redirect('/')
    }
    else {
      const qs = req.query.qs
      results = files
        .filter((f) => path.extname(f) === '.html' && (!qs || f.includes(qs)))
        .map((f) => ({name: f}))

      if (results.length > 0) {
        totalResults = results.length
        pageCount = Math.ceil(results.length / pageSize)
        resultsArrays = _.chunk(results, pageSize)

        if (req.query.page !== undefined) {
          currentPage = req.query.page
          currentArrayIndex = req.query.page
        }

        currentArrayIndex = [currentPage - 1]
        resultsList = resultsArrays[currentArrayIndex]
      }

      resultsList = resultsList.sort()
      resultsList = resultsList.reverse()

      res.render('index', {
        results: resultsList,
        pageSize,
        totalResults,
        pageCount,
        currentPage,
        prefix,
        qs
      })
    }
  })
}

app.get('/', (req, res) => {
  res.render('homepage')
})

app.get('/test', (req, res) => {
  generateReport('reports/test', '/test/', req, res)
})

app.get('/staging', (req, res) => {
  generateReport('reports/staging', '/staging/', req, res)
})

app.get('/production', (req, res) => {
  generateReport('reports/production', '/production/', req, res)
})

const port = process.env.KOBITON_PORT || 3000
app.listen(port)
