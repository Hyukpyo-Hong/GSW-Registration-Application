exports.getSchedule = (conn, year, semester) => {
    return new Promise((resolve, reject) => {
        var sql = "select * from course_list left join course using (cl_SubjCode, cl_CrseNo) where cl_close!=? and cl_year=? and cl_semester=? order by cl_SubjCode, cl_CrseNo";
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
    html += '<table class="table table-hover" id="scheduleTable">';
    html += '<thead>';
    html += '<th class="text-center">PTRM</th>';
    html += '<th class="text-center">CRN</th>';
    html += '<th class="text-center">SUBJ CRSE</th>';
    html += '<th class="text-center">TITLE (Credit Hours)</th>';
    html += '<th class="text-center">Avai/<br>Total</th>';
    html += '<th class="text-center">DAYS/TIME</th>';
    html += '<th class="text-center">LOCATION</th>';
    html += '<th class="text-center">Instructor</th>';
    html += '</thead>';
    html += '<tbody>';
    for (var i in rows) {
        let id = rows[i].cl_SubjCode + '_' + rows[i].cl_CrseNo;
        if (rows[i].cl_type === 'Online Course') {
            html += '<tr class="online">';
        } else if (rows[i].cl_type === 'Hybrid Course') {
            html += '<tr class="hybrid">';
        } else {
            html += '<tr>';
        }
        html += '<td>' + rows[i].cl_PTRM + '</td>';
        html += '<td>' + rows[i].cl_CRN + '</td>';
        html += '<td id="'+id+'">' + rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + '</td>';
        html += '<td id="schedule_title">' + rows[i].cl_Title + " (" + rows[i].cl_CreditHours + ')</td>';
        html += '<td>' + rows[i].cl_SeatAvail + '/' + rows[i].cl_TotalSeats + '</td>';
        html += '<td>' + rows[i].cl_Days + ((rows[i].cl_start_time === '00:00:00') ? '' : ' / ' + rows[i].cl_start_time.substring(0, 5) + '-' + rows[i].cl_end_time.substring(0, 5)) + '</td>';
        html += '<td>' + rows[i].cl_Location + '</td>';
        html += '<td>' + rows[i].cl_instructor + '</td>';

        html += '<input type="hidden" id="schedule_subj" value="' + rows[i].cl_SubjCode + '"\>';
        html += '<input type="hidden" id="schedule_crse" value="' + rows[i].cl_CrseNo + '"\>';
        html += '<input type="hidden" id="schedule_crn" value="' + rows[i].cl_CRN + '"\>';
        html += '<input type="hidden" id="schedule_desc" value="' + rows[i].cl_description + '"\>';
        html += `</tr>`;
    }
    html += `<tr class="warning no-result">
                <td colspan="8"><i class="fa fa-warning"></i> No result</td>
            </tr>`;
    html += '</tbody>';
    html += '</table>';

    return html;
}
