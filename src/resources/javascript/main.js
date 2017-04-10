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
    $("#scheduleTable tbody tr").on("click", function (event) {
        var title = $(this).attr('title');
        title += " " +
            $("#desc_title").text(title);
        $("#description").modal();
    });
}

