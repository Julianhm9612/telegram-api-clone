const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function(req, res) {
  const filterMessages = req.query.user || null;
  controller.getMessages(filterMessages)
    .then((messageList) => {
      response.sucess(req, res, messageList, 200);
    })
    .catch(e => {
      response.error(req, res, 'Unexpected Error', 500, e);
    });
});

router.post('/', function(req, res) {
  controller.addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
      response.sucess(req, res, fullMessage, 201);
    })
    .catch(e => {
      response.error(req, res, 'Invalid info', 400, 'Error in Controller');
    });
});

router.patch('/:id', function(req, res) {
  controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.sucess(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, 'Internal Error', 500, e);
    });
});

router.delete('/:id', function(req, res) {
  controller.deleteMessage(req.params.id)
    .then(() => {
      response.sucess(req, res, data, 200);
    })
    .catch(e => {
      response.error(req, res, 'Internal Error', 500, e);
    });
});