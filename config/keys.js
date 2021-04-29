

// dbPassword = 'mongodb://localhost:27017/caps';
dbPassword='mongodb+srv://ghemhope:ghemhope@cluster0.n1xnq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// dbPassword = 'mongodb+srv://ghemhope:'+ encodeURIComponent('ghemhope') + '@cluster0.n1xnq.mongodb.net/myFirstDatabase?retryWrites=true';


module.exports = {
    mongoURI: dbPassword,
    google: {
        // clientID : '765952251939-6b7m92o2p1tt0chfk8mp96oh9n123nsc.apps.googleusercontent.com',
        clientID : '696915403702-hceekb6sg8gclpvktfspieu5f54dolch.apps.googleusercontent.com',
        // clientSecret: '40xu8H_serQ6fg6cDqfhJtdI',
        clientSecret: 'csI96-2PeEOAsL9nGeQHctTd'

    }
};
