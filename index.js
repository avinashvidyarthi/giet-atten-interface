var isLoading = false;

$(document).ready(function () {
    console.log("Site ready!!!");
    //$("#tg-btn").trigger('click');
});

function fetch_det() {
    setTimeout(() => {
        if (isLoading) {
            swal("Error","Can't fetch attendance!!!\nServer is not responding.","error");
            $("#form_sb_btn").removeAttr('disabled');
            $("#form_sb_btn").html("Fetch Details");
            return;
        }
    }, 30000);
    var roll = $("#std_roll").val().toUpperCase();
    //console.log(roll);
    var pass = $("#std_pass").val();
    if (roll === "" || pass === "") {
        swal("ERROR","Feilds can not be empty!","error");
        return;
    }
    $.ajax({
        type: "GET",
        url: "https://giet--atten.herokuapp.com/test/" + roll + "&&" + pass,
        success: function (response) {
            //console.log(response);
            isLoading = false;
            $("#form_sb_btn").removeAttr('disabled');
            $("#form_sb_btn").html("Fetch Details");
            if (response.status === 'error' && response.msg === 'login_failed') {
                swal("Error","Incorrect Username or Password!","error");
                return;
            }
            if (response.status === 'error') {
                swal("Error","Something not seems right!","error");
                return;
            }
            var out = "<b class='mt-2 mb-2'>" + response.stud + "</b>";

            if (response.cls_needed <= 0) {
                out += "<h5 class='text-success text-center text-justify mt-2'>You can bunk " + (-1 * response.cls_needed) + " classes. Still your attendance will be 80%!!!</h5>";
            }
            else {
                out += "<h5 class='text-danger text-center text-justify mt-2'>You have to attend " + (response.cls_needed) + " classes. Then your attendance will be 80%.</h5>";
            }

            out += "<div class='table-responsive'><table width=100% class='table-striped mt-3'>";
            out += "<tr><th class='p-2'>Subject</th><th class='p-2'>Held</th><th class='p-2'>Attended</th><th class='p-2'>%age</th></tr>";

            for (const sub in response.table) {
                if (response.table.hasOwnProperty(sub)) {
                    const element = response.table[sub];
                    var sub1 = element.subject.split(":")[0];
                    if (sub1 === "-") {
                        sub1 = "TOTAL";
                        out += "<tr class='font-weight-bold'>";
                    } else {
                        out += "<tr>";
                    }
                    out += "<td class='p-2'>" + sub1 + "</td>";
                    out += "<td class='p-2'>" + element.held + "</td>";
                    out += "<td class='p-2'>" + element.attended + "</td>";
                    out += "<td class='p-2'>" + element.att_per + "</td>";
                    out += "</tr>";
                }
            }
            out += "</table></div>";
            out += "<br><a href='./index.html' class='btn btn-block btn-outline-primary mb-3'>Check more attendance</a>"
            $("#output_area").html(out);
        },
        beforeSend: function () {
            isLoading = true;
            $("#form_sb_btn").attr('disabled', 'disabled');
            $("#form_sb_btn").html("Fetching...<br>Might take some time!!!");
        }
    });
}


function toggleFullScreen() {
    console.log("Toggling...");
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}