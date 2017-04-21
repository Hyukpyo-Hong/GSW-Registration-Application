$(document).ready(function () {
    $("#signup").on('click', function () {
        var test = true;
        $(".error").html('');
        var pw = $("#pw").val();
        var pwc = $("#cpw").val();
        var email = $("#email").val();
        var degree = $("#degree").val();
        var year = $("#year").val();
        var major = $("#major").val();
        if (pw !== pwc) {
            $(".error").append("<br/>√ Passwords are not same.");
            test = false;
        }
        if (email === '') {
            $(".error").append("<br/>√ Email should be input.");
            test = false;
        }
        if (pw === '' || pwc === '') {
            $(".error").append("<br/>√ Passwords should be input.");
            test = false;
        }
        if (degree === null) {
            $(".error").append("<br/>√ Degree should be chosen. (Current Version supports Undergraduate)");
            test = false;
        }
        if (year === null) {
            $(".error").append("<br/>√ Year should be chosen. (Current Version supports 2017)");
            test = false;
        }
        if (major === null) {
            $(".error").append("<br/>√ Major should be chosen. (Current Version supports Computer Science)");
            test = false;
        }
        if (degree !== 'Undergraduate') {
            $(".error").append("<br/>√ Current Version supports Undergraduate");
            test = false;
        }
        if (year !== '2017') {
            $(".error").append("<br/>√ Current Version supports 2017");
            test = false;
        }
        if (major !== 'ComputerScience') {
            $(".error").append("<br/>√ Current Version supports Computer Science");
            test = false;
        }
        if (test) {
            $("#signupform").submit();

        }
    })

});

