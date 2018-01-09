const htmlPdf = require('html-pdf-chrome');
const fs = require('fs');

module.exports = {
    api: {
        port: 3003,
        token: 'api-token',
        server : {
            key : fs.readFileSync('/etc/apache2/ssl/carboxservices.dev/star.carboxservices.dev.key'),
            cert : fs.readFileSync('/etc/apache2/ssl/carboxservices.dev/star.carboxservices.dev.crt')
        }
    },
    // html-pdf-chrome options
    generator: {
        completionTrigger: new htmlPdf.CompletionTrigger.Timer(5000)// waits for 1 sec
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

