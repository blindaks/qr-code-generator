$(document).ready(function () {
  $("#urlForm").on("submit", function (e) {
    e.preventDefault();

    var urlInput = $("#urlInput").val();

    if (urlInput) {
      $.ajax({
        type: "POST",
        url: "/generate",
        contentType: "application/json",
        data: JSON.stringify({ url: urlInput }),
        success: function (data) {
          if (data.qrCodeDataUrl) {
            $("#qrcode").html(
              '<img src="' + data.qrCodeDataUrl + '" alt="QR Code"/>'
            );
            $("#downloadLink").attr("href", data.qrCodeDataUrl);
            $("#result").text("QR code generated successfully!");
          } else {
            $("#result").text("Error generating QR code.");
          }
        },
        error: function () {
          $("#result").text("Error generating QR code.");
        },
      });
    } else {
      $("#result").text("Please enter a URL.");
    }
  });
});
