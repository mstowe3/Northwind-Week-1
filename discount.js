document.addEventListener('DOMContentLoaded', function() {
    // Initialize the toast without autohide
    var toastEl = document.getElementById('liveToast');
    var toast = new bootstrap.Toast(toastEl, { autohide: false });

    // Function to update and show the toast
    function showToast(product, code) {
      document.getElementById('product').textContent = product;
      document.querySelector('#liveToast .toast-body').textContent = 'Discount Code: ' + code;
      toast.show();
    }

    // Handle discount link clicks
    var discountLinks = document.querySelectorAll('a.discount');
    discountLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var product = this.getAttribute('data-product');
        var code = this.getAttribute('data-code');
        showToast(product, code);
      });
    });

    // Close the toast when the Escape key is pressed
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        toast.hide();
      }
    });
  });