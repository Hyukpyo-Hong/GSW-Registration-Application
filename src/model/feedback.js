exports.save = (conn, mem_email, content, subj, crse) => {
    return new Promise((resolve, reject) => {
        var sql = "insert into feedback(mem_email,feed_content,cl_SubjCode,cl_CrseNo) values(?,?,?,?);";
        var params = [mem_email, content, subj, crse];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);

            } else {
                console.log('feedback save');
                resolve('Good');
            }
        });
    });
}

exports.read = (conn, subj, crse) => {
    return new Promise((resolve, reject) => {
        var sql = "select feed_content from feedback where cl_SubjCode = ? and cl_CrseNo =?;";
        var params = [subj, crse];
        conn.query(sql, params, function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);

            } else {
                
                var html = makeHtml(rows);
                console.log(html);
                resolve(html);
            }
        });
    });
}

function makeHtml(rows) {
    var html = '';
    html += '<table class="table table-hover">';
    html += '<thead>';
    html += '<th class="text-center">Comments about this class.</th>';
    html += '</thead>';
    html += '<tbody>';
    for (var i in rows) {
        html += '<tr>';
        html += '<td>' + rows[i].feed_content + '</td>';
        html += `</tr>`;
    }
    html += '</tbody>';
    html += '</table>';

    return html;
}
