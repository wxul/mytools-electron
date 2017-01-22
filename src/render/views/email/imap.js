import db from './emdb';

var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
    user: 'user@user.com',
    password: 'password',
    host: 'imap.qq.com',
    port: 993,
    tls: true
});

function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
    console.log('ready')
    openInbox(function(err, box) {
        console.log(box);
        if (err) throw err;
        var f = imap.seq.fetch(box.messages.total + ':*', {
            bodies: ['HEADER.FIELDS (FROM)','TEXT'],
            struct: true
        });
        f.on('message', function(msg, seqno) {
            console.log('Message #%d', seqno);
            var prefix = '(#' + seqno + ') ';
            msg.on('body', function(stream, info) {
                var buffer = '';
                stream.on('data', function(chunk) {
                    buffer += chunk.toString('utf8');
                });
                stream.once('end', function() {
                    console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
                });
            });
            msg.once('attributes', function(attrs) {
                console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
            });
            msg.once('end', function() {
                console.log(prefix + 'Finished');
            });
        });
        f.once('error', function(err) {
            console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
            console.log('Done fetching all messages!');
            imap.end();
        });
    });
});
imap.once('error', function(err) {
    console.log(err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

imap.connect();