const serverurl = "http://localhost:4321/";
//const serverurl = "http://stapps.gswcm.net:4321/"; // for School Testing Server
var semester = null;
var year = null;
var mem_email = null;

$(document).ready(function () {
    semester = "summer";
    year = "2017";
    mem_email = $("#mem_email").text();
    initialize();
})

function reload() {


}

function initialize() {
    function set_current_semester() {
        $("#current_semester").html("Current Page: <strong>" + year + " " + semester.toUpperCase() + "</strong>");
    }
    set_current_semester();

    $("#schedule_Button").click(function () {

    });

    $("#transcript_Button").click(function () {
        $.ajax({
            type: 'POST',
            cache: false,
            data: {
                'mem_email': mem_email,
            },
            url: serverurl + 'get_transcript',
            success: function (result) {
                $("#transcript_body").html(result);
                $("#transcript").modal();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                alert("Error Happens. \n", thrownError);
            }
        });
    });

    $("#desc_taken").click(function () {
        var crse = $(this).parents(".modal-footer").find("#desc_crse").attr('value');
        var subj = $(this).parents(".modal-footer").find("#desc_subj").attr('value');
        var title = $(this).parents(".modal-content").find("#desc_title").text();
        $("#description").modal('hide');
        $("#taken_title").text(subj + ' ' + crse + ' ' + title);
        $("#taken_subj").val(subj);
        $("#taken_crse").val(crse);
        $("#taken").modal();
    });

    $("#desc_register").click(function () {

    });

    $("#taken_save").click(function () {
        $("#taken").modal('hide');
        $.ajax({
            type: 'POST',
            cache: false,
            data: {
                'mem_email': mem_email,
                'subj': $("#taken_subj").val(),
                'crse': $("#taken_crse").val(),
                'grade': $("#taken input:radio:checked").val(),
            },
            url: serverurl + 'save_taken_subject',
            success: function (result) {
                console.log(result);

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                alert("Error Happens. \n", thrownError);
            }
        });
        $("#taken").modal('hide');
    });

    //Semester Selector
    $(".dropdown-menu li a").click(function () {
        $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
        var selected = $(this).attr('value');
        if (selected === '2017S') {
            year = 2017;
            semester = 'summer';
            set_current_semester();
        } else if (selected === '2017F') {
            year = 2017;
            semester = 'fall';
            set_current_semester();
        } else {
            alert("Not implemented.")
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
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                $("#schedule").html("Error Happens during loading schedule!");
            }
        });
    })

    //Modal for curriculum click
    $("#curriculumTable tbody tr").on("click", function (event) {
        var title = $(this).children('#title').text();

    });

    //Modal for class description
    $('#schedule').delegate('#scheduleTable tbody tr', 'click', function () {
        var title = $(this).find('#schedule_title').text();
        var desc = $(this).find('#schedule_desc').val();
        var subj = $(this).find('#schedule_subj').val();
        var crse = $(this).find('#schedule_crse').val();
        var crn = $(this).find('#schedule_crn').val();
        $("#desc_desc").text(desc);
        $("#desc_title").text(title);
        $("#desc_subj").val(subj);
        $("#desc_crse").val(crse);
        $("#desc_crn").val(crn);
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


    $('#transcript_body').delegate('.transcript_delete', 'click', function () {
        var mem_email = $(this).attr('mem_email');
        var subj = $(this).attr('subj');
        var crse = $(this).attr('crse');

        $("#transcript_delete").find("#tran_mem_email").val(mem_email);
        $("#transcript_delete").find("#tran_subj").val(subj);
        $("#transcript_delete").find("#tran_crse").val(crse);
        $("#transcript_delete").modal();
    });

    $("#tran_delete").click(function (e) {
        $.ajax({
            type: 'POST',
            cache: false,
            data: {
                'mem_email': $(this).siblings("#tran_mem_email").val(),
                'subj': $(this).siblings("#tran_subj").val(),
                'crse': $(this).siblings("#tran_crse").val(),
            },
            url: serverurl + 'transcript_delete',
            success: function (data) {
                $("#transcript_delete").modal('hide');
                $("#transcript").modal('hide');
                $("#transcript_Button").click();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                $("#transcript_delete").modal('hide');
                $("#transcript").modal('hide');
                alert("Error")
            }
        });
    });

}

