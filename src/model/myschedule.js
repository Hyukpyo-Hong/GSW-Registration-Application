exports.register = (conn, mem_email, cl_year, cl_semester) => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT 
                    cl_SubjCode, cl_CrseNo, cl_title, cl_CreditHours,cl_Days,cl_start_time,cl_end_time,cl_Location,cl_instructor,cl_CRN
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
                var html = makeHtml(rows, mem_email);
                resolve(html);
            }
        });
    })
}


function makeHtml(rows, mem_email) {
    var crn = [];
    var html = '';
    html += '<div class="table-responsive">'
    html += '<table class="table table-condensed" id="myschedule_table">';
    html += '<thead>';
    html += '<th class="text-center">SUBJ CRSE</th>';
    html += '<th class="text-center">TITLE (Credit Hours)</th>';
    html += '<th class="text-center">Days/Time</th>';
    html += '<th class="text-center">Location</th>';
    html += '<th class="text-center">Instructer</th>';
    html += '<th class="text-center"></th>';
    html += '</thead>';
    html += '<tbody>';
    for (var i in rows) {
        crn.push(rows[i].cl_CRN);
        html += `<tr>`;
        html += '<td class="text-center">' + rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + '</td>';
        html += '<td class="text-center">' + rows[i].cl_title + " (" + rows[i].cl_CreditHours + ')</td>';
        html += '<td class="text-center">' + rows[i].cl_Days + ' / ' + rows[i].cl_start_time + '-' + rows[i].cl_end_time + '</td>';
        html += '<td class="text-center">' + rows[i].cl_Location + '</td>';
        html += '<td class="text-center">' + rows[i].cl_instructor + '</td>';
        html += '<td>';
        html += `<button type="button" class="btn btn-default myschedule_delete" aria-label="Left Align" `;
        html += `crn="`;
        html += rows[i].cl_CRN + `">`;
        html += `<span class="glyphicon glyphicon glyphicon-trash" aria-hidden="true"></span>`;
        html += '</button></td>';
        html += `</tr>`;
    }
    html += '<thead><th colspan=6  class="success">CRN List (Copy into RAIN registration form)</th></thead>'
    html += '<tr class="success"><td colspan=6>'
    html += crnlist(crn);
    html += '</td></tr>'
    html += '</tbody>';
    html += '</table>';
    html += '</div>'
    return html;
}

function crnlist(crn) {
    var a = '';
    for (var i in crn) {
        a += crn[i];
        a += '\t\t\t';
    }
    return a;
}

exports.delete = (conn, mem_email, cl_CRN, cl_year, cl_semester) => {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM schedule where mem_email =? and cl_CRN=? and cl_year=? and cl_semester=? ;`
        var params = [mem_email, cl_CRN, cl_year, cl_semester];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Delete Success.")
                resolve();
            }
        });
    })
}

/*
        var _credit = rows[i].cl_CreditHours;
        var rowid = 'schedule' + i;
        var a = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' a';
        var b = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' b';
        var c = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' c';
        var d = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' d';
        var f = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + ' f';
html += `<td class="text-center"  id="` + rowid + `">`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ a + `" name="` + rowid + `">A
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ b + `" name="` + rowid + `">B
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ c + `" name="` + rowid + `">C
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ d + `" name="` + rowid + `">D
                 </label>`;
        html += `<label class="radio-inline">
                    <input type="radio" value="`+ f + `" name="` + rowid + `">F
                 </label>`;
        html += `</td>`;

*/