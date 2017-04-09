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
                var html = makeHtml(rows);
                resolve(html);
            }
        });
    });
}

function makeHtml(rows) {
    var html = '';
    html += '<table class="table table-hover">'
    html += '<thead>'
    html += '<th>CRN</th>'
    html += '<th>SUBJ. CRSE</th>'    
    html += '<th>TITLE</th>'
    html += '<th>PTRM/<br/>CREDIT</th>'
    html += '<th>Avai./<br>Total</th>'
    html += '<th>DAYS/TIME</th>'
    html += '<th>LOCATION</th>'
    html += '<th>Instructor</th>';
    html += '</thead>'
    html += '<tbody>'
    for (var i in rows) {
        html += `<tr>`;
        html += '<td>' + rows[i].cl_CRN + '</td>'
        html += '<td>' + rows[i].cl_SubjCode +' '+rows[i].cl_CrseNo + '</td>'
        html += '<td>' + rows[i].cl_Title + '</td>'
        html += '<td>' + rows[i].cl_PTRM +' / '+rows[i].cl_CreditHours+ '</td>'
        html += '<td>' + rows[i].cl_SeatAvail + '/' + rows[i].cl_TotalSeats + '</td>'
        html += '<td>' + rows[i].cl_Days +((rows[i].cl_start_time === '00:00:00') ? '' : ' / '+rows[i].cl_start_time.substring(0, 5) + '-' + rows[i].cl_end_time.substring(0, 5))+'</td>'
        html += '<td>' + rows[i].cl_Location + '</td>'
        html += '<td>' + rows[i].cl_instructor + '</td>'
        html += `</tr>`;
    }
    html += '</tbody>'
    html += '</table>'
    return html;
}
