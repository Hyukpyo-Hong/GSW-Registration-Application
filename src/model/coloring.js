exports.getList = (conn, mem_email) => {
    return new Promise((resolve, reject) => {
        var result = [];
        var sql = `SELECT 
                        cl_SubjCode, cl_CrseNo
                    FROM
                        schedule
                            LEFT JOIN
                        course_list USING (cl_CRN)
                    WHERE
                        mem_email = ? 
                    UNION SELECT 
                        cl_SubjCode, cl_CrseNo
                    FROM
                        transcript
                    WHERE
                        mem_email = ? ;`
        var params = [mem_email, mem_email];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                for (var i in rows) {
                    let temp = "#"+rows[i].cl_SubjCode + '_' + rows[i].cl_CrseNo;
                    result.push(temp);
                }
                resolve(result);
            }
        });
    })
}
