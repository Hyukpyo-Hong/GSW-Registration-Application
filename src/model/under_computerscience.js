var year = '2016-2017';
var level = 'Undergraduate';
var major = 'ComputerScience';
var conn = null;
var totalrows = null;

function filter(array, key, value) {
    var i, j, hash = [], item;

    for (i = 0, j = array.length; i < j; i++) {
        item = array[i];
        if (typeof item[key] !== "undefined" && item[key] === value) {
            hash.push(item);
        }
    }

    return hash;
}

exports.getCurriculum = (connector) => {
    conn = connector;

    return new Promise((resolve, reject) => {
        var sql = `
            SELECT 
                cl_SubjCode, cl_CrseNo, cl_Title,cl_CreditHours,curi_area, curi_group, cg_credit
            FROM
                curriculum left join class_group using(curi_year,deg_level,deg_major, curi_area, curi_group)
                left join course using(cl_CrseNo, cl_SubjCode)
            WHERE
            curi_year = ?
            AND deg_level = ?
            AND deg_major = ?`;
        var params = [year, level, major];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log("Get Area error ");
            } else {
                totalrows = rows
                var html = '<table class="table table-hover table-bordered" id="curriculumTable">'
                html += '<thead><th colspan="3" id="area">Area A (9hrs)(Min Grade of C Required)</th></thead>'
                html += '<tbody>'
                html += getArea('a', 1);
                html += '<thead><th colspan="3" id="area">Area B (4 hrs min)</th></thead>'
                html += getArea('b', 1);
                html += '<thead><th colspan="3" id="area">Area C (6 hrs)</th></thead>'
                html += getArea('c', 1);
                html += getArea('c', 2);
                html += '<thead><th colspan="3" id="area">Area D (12 hrs)</th></thead>'
                for (let i = 1; i <= 12; i++) {
                    html += getArea('d', i);
                }
                html += '<thead><th colspan="3" id="area">Area E (12 hrs)</th></thead>'
                for (let i = 1; i <= 4; i++) {
                    html += getArea('e', i);
                }
                html += '<thead><th colspan="3" id="area">Area F (18 hrs)</th></thead>'
                for (let i = 1; i <= 1; i++) {
                    html += getArea('f', i);
                }
                html += '<thead><th colspan="3" id="area">Physical Education (4 hrs)</th></thead>'
                for (let i = 1; i <= 2; i++) {
                    html += getArea('p', i);
                }
                html += '<thead><th colspan="3" id="area">Required Courses (41 hrs)</th></thead>'
                for (let i = 1; i <= 1; i++) {
                    html += getArea('r', i);
                }
                html += '<thead><th colspan="3" id="area">Major Electives (6 hrs)</th></thead>'
                for (let i = 1; i <= 1; i++) {
                    html += getArea('e1', i);
                }
                html += '<thead><th colspan="3" id="area">Math Electives (6-7 hrs)</th></thead>'
                for (let i = 1; i <= 1; i++) {
                    html += getArea('e2', i);
                }
                html += '<thead><th colspan="3" id="area">Free Electives ( 5-6 hrs)</th></thead>'
                html += '</tbody>'
                html += '</table>'
                resolve(html);

            }
        })
    })

}
function getArea(area, group) {
    let rows = (filter(totalrows, 'curi_area', area));
    rows = (filter(rows, 'curi_group', group));
    var html = "<thead><th colspan='3' id='class_group'>" + "↳Select" + rows[0].cg_credit + " Credits</th></thead>"
    for (var i in rows) {
        let code = rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo;
        html += '<tr id="' + area + ' ' + group + ' ' + code + '">'
        html += '<td>' + rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + '</td><td id="title"><strong> ' + rows[i].cl_Title + '</strong></td><td>' + rows[i].cl_CreditHours + ' Credits</td>'
        html += '</tr>'
    }
    return html;
}



/*
 
  curi_year: 2016-2017
  deg_level: Undergraduate
  deg_major: ComputerScience
cl_SubjCode: WGSS
  cl_CrseNo: 2001
  curi_area: b
 curi_group: 1
 
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
        });*/
function makeHtml(rows) {
    var html = '';
    html += '<table class="table table-hover" id="scheduleTable">'
    html += '<thead>'
    html += '<th>PTRM</th>'
    html += '<th>CRN</th>'
    html += '<th>SUBJ CRSE</th>'
    html += '<th>TITLE (Credit Hours)</th>'
    html += '<th>Avai/<br>Total</th>'
    html += '<th>DAYS/TIME</th>'
    html += '<th>LOCATION</th>'
    html += '<th>Instructor</th>';
    html += '</thead>'
    html += '<tbody>'
    for (var i in rows) {
        html += '<tr>'
        html += '<td>' + rows[i].cl_PTRM + '</td>'
        html += '<td>' + rows[i].cl_CRN + '</td>'
        html += '<td>' + rows[i].cl_SubjCode + ' ' + rows[i].cl_CrseNo + '</td>'
        html += '<td id="title">' + rows[i].cl_Title + " (" + rows[i].cl_CreditHours + ')</td>';
        html += '<td>' + rows[i].cl_SeatAvail + '/' + rows[i].cl_TotalSeats + '</td>'
        html += '<td>' + rows[i].cl_Days + ((rows[i].cl_start_time === '00:00:00') ? '' : ' / ' + rows[i].cl_start_time.substring(0, 5) + '-' + rows[i].cl_end_time.substring(0, 5)) + '</td>'
        html += '<td>' + rows[i].cl_Location + '</td>'
        html += '<td>' + rows[i].cl_instructor + '</td>'
        html += `</tr>`;
    }
    html += '</tbody>'
    html += '</table>'
    return html;
}
