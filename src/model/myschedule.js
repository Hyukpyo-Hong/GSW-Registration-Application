module.exports = function (conn, mem_email, cl_year, cl_semester) {
    return new Promise((resolve, reject) => {
        var sql = `SELECT 
                    cl_SubjCode, cl_CrseNo, cl_title, cl_CreditHours
                FROM
                    schedule AS a
                        LEFT JOIN
                    course_list USING (cl_CRN)
                        LEFT JOIN
                    course USING (cl_SubjCode , cl_CrseNo)
                WHERE
                    mem_email = ? AND a.cl_year = ?
                        AND a.cl_semester = ?;`
        var params = [mem_email, cl_year, cl_semester];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                var html = makeHtml(rows,mem_email);
                resolve(html);
            }
        });
    })
}


function makeHtml(rows,mem_email) {
    var html = '';
    html += '<table class="table" id="myschedule_table">';
    html += '<thead>';
    html += '<th class="text-center">SUBJ CRSE</th>';
    html += '<th class="text-center">TITLE (Credit Hours)</th>';
    html += '<th class="text-center">Grade</th>';
    html += '<th class="text-center"></th>';
    html += '</thead>';
    html += '<tbody>';
    for (var i in rows) {
        console.log(rows);
        var _credit = rows[i].cl_CreditHours;
        var rowid = 'schedule' + i;
        var a = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' a';
        var b = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' b';
        var c = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' c';
        var d = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' d';
        var f = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' f';
        html += `<tr>`;
        html += '<td class="text-center">' + rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + '</td>';
        html += '<td class="text-center">' + rows[i].cl_title + " (" + rows[i].cl_CreditHours + ')</td>';
        html += `<td class="text-center"  id="` + rowid + `">`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ a + `" name="`+rowid+`">A
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ b + `" name="`+rowid+`">B
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ c + `" name="`+rowid+`">C
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ d + `" name="`+rowid+`">D
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ f + `" name="`+rowid+`">F
                 </label>`;
        html += `</td>`;
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
    html += '</tbody>';
    html += '</table>';
    return html;
}
