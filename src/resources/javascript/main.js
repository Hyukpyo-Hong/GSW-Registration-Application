var serverurl = "http://localhost:4321/";

$(function () {
    initialize();
})


function initialize() {
    $("#scheduleSeletor").on('change', () => {
        var selected = $("#scheduleSeletor option:selected").val();
        if (selected === '2017S') {
            var year = 2017;
            var semester = 'summer';
        } else if (selected === '2017F') {
            var year = 2017;
            var semester = 'fall';
        }
        $.ajax({
            type: 'POST',
            cache: false,
            data: {
                'year': year,
                'semester': semester,
            },
            url: serverurl + 'updateSchedule',
            success: function (data) {
                $("#schedule").html(data);
                initialize();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                $("#schedule").html("Error Happens during loading schedule!");
            }
        });
    })

    $("#curriculumTable tbody tr").on("click", function (event) {
        var title = $(this).children('#title').text();
        title += " " +
            $("#desc_title").text(title);
        $("#description").modal();
    });

    $("#scheduleTable tbody tr").on("click", function (event) {
        var title = $(this).children('#title').text();
        title += " " +
            $("#desc_title").text(title);
        $("#description").modal();
    });

    $("#scheduleButton").on("click", function (event) {
        $("#myschedule").modal();
    });

    $("#quicksearch").keyup(function () {
        var searchTerm = $("#quicksearch").val();
        var listItem = $('#scheduleTable tbody').children('tr');
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

        $.extend($.expr[':'], {
            'containsi': function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
        });

        $("#scheduleTable tbody tr").not(":containsi('" + searchSplit + "')").each(function (e) {
            $(this).attr('visible', 'false');
        });

        $("#scheduleTable tbody tr:containsi('" + searchSplit + "')").each(function (e) {
            $(this).attr('visible', 'true');
        });

        var jobCount = $('#scheduleTable tbody tr[visible="true"]').length;

        if (jobCount == '0') { $('.no-result').show(); }
        else { $('.no-result').hide(); }
    });

    $("#datesearch").keyup(function () {
        var input, filter, table, tr, td, i;
        input = document.getElementById("datesearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("scheduleTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[5];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    })
}