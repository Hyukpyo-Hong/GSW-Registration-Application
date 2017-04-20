exports.register = (conn, mem_email, cl_CRN, cl_year, cl_semester) => {
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO schedule VALUES(?,?,?,?);`
        var params = [mem_email, cl_CRN, cl_year, cl_semester];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Register Success.")
                resolve();
            }
        });
    })
}

