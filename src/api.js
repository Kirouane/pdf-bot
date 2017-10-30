// these need to occur after dotenv
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('pdf:api');
const error = require('./error');
const fs = require('fs');

function createApi(createQueue, options = {}) {
    let api = express();
    api.use(bodyParser.json());

    let token = options.token;

    if (!token) {
        debug('Warning: The server should be protected using a token.')
    }

    api.post('/', function (req, res) {
        const queue = createQueue();
        let authHeader = req.get('Authorization');

        if (token && (!authHeader || authHeader.replace(/Bearer (.*)$/i, '$1') !== token)) {
            res.status(401).json(error.createErrorResponse(error.ERROR_INVALID_TOKEN));
            return
        }

        const response = queue.addToQueue({
            url: req.body.url,
            meta: req.body.meta || {}
        });

        if (error.isError(response)) {
            res.status(422).json(response);
            return
        }


        res.status(201).json(response)
    });

    api.post('/storage', function (req, res) {
        let authHeader = req.get('Authorization');

        if (token && (!authHeader || authHeader.replace(/Bearer (.*)$/i, '$1') !== token)) {
            res.status(401).json(error.createErrorResponse(error.ERROR_INVALID_TOKEN));
            return
        }


        if (!req.body.local) {
            res.status(403).json(error.createErrorResponse(error.ERROR_NO_STORAGE));
            return;
        }

        if (!fs.existsSync(req.body.local)) {
            res.status(404).json(error.createErrorResponse(error.ERROR_NOT_FOUND));
            return;
        }

        const data = fs.readFileSync(req.body.local);
        res.contentType("application/pdf");
        res.send(data);
    });

    return api
}

module.exports = createApi;
