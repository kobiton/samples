const _ = require('lodash')
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.engine('.html', require('ejs').__express)
app.set('views', __dirname)
app.set('view engine', 'html')
app.use(express.static('reports'))
app.use(express.static('reports/portal'))

function generateReport(folder, prefix, req, res) {
  const pageSize = 10
  let currentPage = 1
  let pageCount = 0
  let totalResults = 0
  let resultsArrays = []
  let resultsList = []
  let results = []
  let currentArrayIndex = 1

  fs.readdir(folder, (err, files) => {
    if (err) {
      res.redirect('/')
    }
    else {
      const qs = req.query.qs
      results = files
        .filter((f) => path.extname(f) === '.html' && (!qs || f.includes(qs)))
        .map((f) => ({name: f}))

      if (results.length > 0) {
        results = results.reverse()
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

const foldersDir = (dir) => {
  const folderList = []
  const folders = fs.readdirSync(dir)
  folders.filter((f) => fs.statSync(dir + '/' + f).isDirectory())
    .map((f) => folderList.push(f))
  return folderList
}

const walkSync = (dir, filelist) => {
  const files = fs.readdirSync(dir)
  filelist = filelist || []

  files.forEach((file) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist)
    }
    else {
      if (path.extname(file) === '.json') {
        filelist.push(dir + '/' + file)
      }
    }
  })
  return filelist
}

function generatePortalReport(folder, prefix, req, res) {
  let folderList = []
  let results = []

  fs.readdir(folder, (err, files) => {
    if (err) {
      res.redirect('/')
    }
    else {
      const qs = req.query.qs

      folderList = foldersDir(folder)
      .filter((f) => (!qs || f.includes(qs)))
      .map((f) => ({name: f}))

      folderList = folderList.sort()
      folderList = folderList.reverse()

      const foldername = req.params.foldername
      if (foldername) folder = `${folder}/${foldername}`

      files = walkSync(folder)
      results = files
        .map((f) => ({
          name: path.basename(f, '.json'),
          data: JSON.parse(fs.readFileSync(f, 'utf8'))
        }))

      res.render('portal', {
        folderList,
        results,
        prefix
      })
    }
  })
}

app.get('/', (req, res) => {
  res.render('homepage')
})

for (const env of ['test', 'staging', 'production']) {
  app.get('/' + env, (req, res) => {
    generateReport('reports/' + env, '/' + env + '/', req, res)
  })

  app.get('/portal/' + env, (req, res) => {
    generatePortalReport('reports/portal/' + env, '/portal/' + env + '/', req, res)
  })

  app.get('/portal/' + env + '/:foldername', (req, res) => {
    generatePortalReport('reports/portal/' + env, '/portal/' + env + '/', req, res)
  })
}

const port = process.env.KOBITON_PORT || 3000
app.listen(port)
