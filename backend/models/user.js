const db = require('../util/database');

module.exports = class User {
    constructor(fullname, email, password, type) {
        this.fullname = fullname,
            this.email = email,
            this.password = password,
            this.type = type
    }

    static find(email) {
        return db.execute('SELECT * FROM taskUser WHERE email = ?', [email]);
    }

    static save(user) {
        return db.execute(
            'INSERT INTO taskUser (fullname, email, password, type) VALUES (?, ?, ?, ?)',
            [user.fullname, user.email, user.password, user.type]
        );
    }
}

