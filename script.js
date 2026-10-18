(function () {
  var form = document.getElementById("booking-form");
  var errorEl = document.getElementById("form-error");
  if (!form) return;

  var PHONE = "07720 175330";
  var EMAIL = "mansellsvaleting@outlook.com";
  var WA_NUMBER = "447720175330";

  function values() {
    return {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      vehicle: form.vehicle.value.trim(),
      service: form.service.value,
      date: form.date.value,
      notes: form.notes.value.trim(),
    };
  }

  function isValid(v) {
    return (
      v.name &&
      v.phone &&
      /\S+@\S+\.\S+/.test(v.email) &&
      v.vehicle &&
      v.service &&
      v.date
    );
  }

  function message(v) {
    var text =
      "Booking request - Mansell's Valeting\n" +
      "Name: " + v.name + "\n" +
      "Phone: " + v.phone + "\n" +
      "Email: " + v.email + "\n" +
      "Vehicle: " + v.vehicle + "\n" +
      "Service: " + v.service + "\n" +
      "Preferred date: " + v.date;
    if (v.notes) text += "\nNotes: " + v.notes;
    return text;
  }

  function submit(channel) {
    var v = values();
    if (!isValid(v)) {
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;
    var url =
      channel === "wa"
        ? "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message(v))
        : "mailto:" + EMAIL + "?subject=Valet%20booking%20request&body=" + encodeURIComponent(message(v));
    window.open(url, "_blank");
  }

  document.getElementById("send-whatsapp").addEventListener("click", function () {
    submit("wa");
  });

  document.getElementById("send-email").addEventListener("click", function () {
    submit("mail");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
})();
