exports.register = (conn, mem_email, subj, crse) => {
    return new Promise((resolve, reject) => {
        var result = { state: "", value: "" };
        var sql = `SELECT 
                        pre_SubjCode, pre_CrseNo, cl_Title
                    FROM
                        prerequisite AS a
                            LEFT JOIN
                        (SELECT 
                            *
                        FROM
                            transcript
                        WHERE
                            mem_email = ?) AS b ON a.pre_SubjCode = b.cl_SubjCode
                            AND a.pre_CrseNo = b.cl_CrseNo
                            LEFT JOIN
                        course AS c ON a.pre_SubjCode = c.cl_SubjCode
                            AND a.pre_CrseNo = c.cl_CrseNo
                    WHERE
                        b.cl_CrseNo IS NULL
                            AND a.cl_SubjCode = ?
                            AND a.cl_CrseNo = ?;`
        var params = [mem_email, subj, crse];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(rows);
                result['state'] = rows.length;
                for (var i in rows) {
                    var temp = "<br/>" + rows[i].pre_SubjCode + ' ' + rows[i].pre_CrseNo + ' ' + rows[i].cl_Title;
                    result['value'] += temp;
                }
                resolve(result);
            }
        });
    })
}
