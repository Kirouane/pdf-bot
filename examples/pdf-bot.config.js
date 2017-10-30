const htmlPdf = require('html-pdf-chrome');
module.exports = {
    api: {
        port: 3003,
        token: 'api-token'
    },
    // html-pdf-chrome options
    generator: {
        completionTrigger: new htmlPdf.CompletionTrigger.Timer(5000),// waits for 1 sec
        port: 9222,
        host: "localhost"
    },
    queue: {
        parallelism : 1
    },
    storagePath: 'storage',
    webhook: {
        headerNamespace: 'X-PDF-',
        requestOptions: {

        },
        secret: '1234',
        url: 'http://localhost:3005/webhooks/pdf'
    }
};

