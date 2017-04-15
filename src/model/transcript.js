exports.get_transcript = (conn, mem_email) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT 
                        *
                    FROM
                        transcript
                            LEFT JOIN
                        course USING (cl_SubjCode , cl_CrseNo)
                    WHERE
                        mem_email = ?;`
        var params = [mem_email];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                var html = makeHtml(rows, mem_email);
                resolve(html);
            }
        });
    })
};
exports.delete_transcript = (conn, mem_email, subj, crse) => {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM transcript 
                    WHERE
                        mem_email = ?
                        AND cl_SubjCode = ?
                        AND cl_CrseNo = ?;`
        var params = [mem_email,subj,crse];
        conn.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve();
            }
        });
    })
};

function makeHtml(rows, mem_email) {
    var gpa = null;
    var score = null;
    var credit = null;
    var html = '';
    html += '<table class="table" id="transcript_table">';
    html += '<thead>';
    html += '<th class="text-center">SUBJ CRSE</th>';
    html += '<th class="text-center">TITLE (Credit Hours)</th>';
    html += '<th class="text-center">Grade</th>';
    html += '<th class="text-center"></th>';
    html += '</thead>';
    html += '<tbody>';
    for (var i in rows) {
        var _credit = rows[i].cl_CreditHours;
        switch (rows[i].tran_grade) {
            case 'a':
                score += 4 * _credit;
                credit += _credit;
                break;
            case 'b':
                score += 3 * _credit;
                credit += _credit;
                break;
            case 'c':
                score += 2 * _credit;
                credit += _credit;
                break;
            case 'd':
                score += _credit;
                credit += _credit;
                break;
            case 'f':
                score += 0
                credit += _credit;
                break;
        }
        html += `<tr>`;
        html += '<td class="text-center">' + rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + '</td>';
        html += '<td class="text-center">' + rows[i].cl_Title + " (" + rows[i].cl_CreditHours + ')</td>';
        html += '<td class="text-center">' + rows[i].tran_grade.toUpperCase() + '</td>';
        html += '<td>';
        html += `<button type="button" class="btn btn-default transcript_delete" aria-label="Left Align" `;
        html += `subj="`;
        html += rows[i].cl_SubjCode + `" `;
        html += `crse="`;
        html += rows[i].cl_CrseNo + `" `;
        html += `mem_email="`;
        html += mem_email + `"> `;
        html += `<span class="glyphicon glyphicon glyphicon-trash" aria-hidden="true"></span>`;
        html += '</button></td>';
        html += `</tr>`;
    }
    html += '<tr class="success"><td colspan="4" class="text-right">Total Credit: <strong>' + credit; +'</strong></td></tr>';
    html += '<tr class="success"><td colspan="4" class="text-right">Overall GPA: <strong>' + (score / credit).toFixed(1); +'</strong></td></tr>';
    html += '</tbody>';
    html += '</table>';
    return html;
}
