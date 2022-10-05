
const db = require('../util/database');

module.exports = class Admin {
    static fetchAll() {
        return db.execute('SELECT * FROM taskUser');
    }

    static deleteUser(id) {
        return db.execute('DELETE FROM taskUser WHERE id = ?', [id]);
    }

}
