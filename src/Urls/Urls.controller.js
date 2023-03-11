const urlsData = require("../data/urls-data")
const newUrlId = urlsData.length + 1

function list(req, res) {
    res.status(200).json({data: urlsData})
  }

 

function create(req, res) {
    const { data: { href } = {} } = req.body;
    const newUrl = {
      id: newUrlId,
      href,
    };
    urlsData.push(newUrl);
    res.status(201).json({ data: newUrl });
    
  }

  function hasHref(req, res, next) {
    const {data: {href} = {}} = req.body
    if(href) {
        return next()
    }
    next({status: 400, message: "A 'href' property is required."})
  }

  function urlExists(req, res, next) {
    const urlId = Number(req.params.urlId)
    const foundUrl = urlsData.find((url) => url.id === urlId)
    if (foundUrl) {
      res.locals.url = foundUrl
      return next
    }
    next({
      status: 404,
      message: `url id not found: ${req.params.foundUrl}` 
    })
  }

  function read(req, res, next) {
    const {urlId} = req.params
    const foundUrl = urlsData.find((url) => url.id === Number(urlId))
    res.json({data :foundUrl})
  }

  function destroy(req, res) {
    const {urlId} = req.params
    const index = urlsData.findIndex((url) => url.id === Number(urlId))
    if(index > -1) {
      urlsData.splice(index, 1)
    }
    res.sendStatus(204)
  }

  function update(req, res, next) {
const url = res.locals.url
const  {data: {href} = {}} = req.body
url.href = href
res.json({data: url})
  }
 

module.exports = {
    create: [hasHref, create],
    list,
    read: [read, urlExists],
    read2: [read],
    urlExists,
    delete: destroy,
    update: [update, urlExists, hasHref]
}