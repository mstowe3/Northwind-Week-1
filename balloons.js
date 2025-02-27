document.addEventListener("DOMContentLoaded", function () {
  // Animate.css attention seekers
  const attentionSeekers = ["animate__bounce", "animate__flash", "animate__pulse", "animate__rubberBand", "animate__shakeX", "animate__shakeY", "animate__headShake", "animate__swing", "animate__tada", "animate__wobble", "animate__jello", "animate__heartBeat"];
  const randomAnimation = attentionSeekers[Math.floor(Math.random() * attentionSeekers.length)];
  const greeting = document.querySelector(".greeting");
  greeting.classList.add(randomAnimation);

  // Initialize date picker
  const elem = document.getElementById('dob');
  const datepicker = new Datepicker(elem, {
    autohide: true,
    format: 'MM-dd'
  });

  // Uncheck all boxes by default (Firefox)
  const checkboxes = document.querySelectorAll('.form-check-input');
  checkboxes.forEach(c => c.checked = false);

  // Toast for no balloons selected
  document.getElementById("submit").addEventListener("click", function () {
    const noneSelected = Array.from(checkboxes).every(checkbox => !checkbox.checked);
    if (noneSelected) {
      const toastDiv = document.createElement("div");
      toastDiv.className = "toast show";
      toastDiv.role = "alert";
      toastDiv.innerHTML = `
        <div class="toast-header">
          <strong class="me-auto">Warning</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
          Please select at least one balloon!
        </div>
      `;
      document.body.appendChild(toastDiv);
      setTimeout(() => toastDiv.classList.remove("show"), 3000); // Hide after 3 seconds
    }
  });

  // Check/Uncheck all balloons
  const checkAllBtn = document.createElement("button");
  checkAllBtn.textContent = "Check/Uncheck All";
  checkAllBtn.className = "btn btn-outline-secondary mt-3";
  document.getElementById("checkbox-card").appendChild(checkAllBtn);

  checkAllBtn.addEventListener("click", function () {
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => checkbox.checked = !allChecked);
    
    // Trigger the change event manually to update images visibility and animations
    checkboxes.forEach(checkbox => checkbox.dispatchEvent(new Event('change')));
  });

  // Event listener for check/uncheck with animations
  document.getElementById('checkbox-card').addEventListener('change', function (e) {
    if (e.target.classList.contains('form-check-input')) {
      const elem = document.getElementById(e.target.id + 'Img');
      elem.style.visibility = "visible";
      elem.classList.remove("animate__animated", "animate__bounceInDown", "animate__bounceOutUp");
      e.target.checked ?
        elem.classList.add("animate__animated", "animate__bounceInDown") :
        elem.classList.add("animate__animated", "animate__bounceOutUp");
    }
  });

  // Hover effect to change h1 color
  const labels = document.querySelectorAll(".form-check-label");
  labels.forEach(label => {
    const color = label.textContent.split(' ')[0].toLowerCase(); // Extract color from label text
    label.addEventListener("mouseover", function () {
      greeting.style.color = color;
    });
    label.addEventListener("mouseout", function () {
      greeting.style.color = "slategray";
    });
  });
});
