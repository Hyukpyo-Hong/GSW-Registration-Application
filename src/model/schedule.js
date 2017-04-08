exports.getSchedule = (conn, year, semester) => {
    return new Promise((resolve, reject) => {
        var sql = "select * from course_list left join course using (cl_SubjCode, cl_CrseNo) where cl_close!=? and cl_year=? and cl_semester=?";
        var params = ['c', year, semester];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);

            } else {
                console.log(year, " ", semester, " schedule loading success");
                var html =`<div>` + year + ' ' + semester + ` Schedule</div>`;
                html += `<div>CRN	SUBJ CODE	CRSE NO.	TITLE	PTRM	CRED HOURS	SEATS AVAIL	TOTAL SEATS	DAYS	CLASS TIME	LOCATION	INSTRUCTOR<div>`;
                html += makeHtml(rows);

                resolve(html);
            }
        });
    });
}

function makeHtml(rows) {
    var html;
    for (var i in rows) {
        html += `<div>` + rows[i].cl_Title + `</div>`;
    }
    return html;
}