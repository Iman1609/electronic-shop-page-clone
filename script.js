document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
  
    // Elements
    const headerCart = document.getElementById("header-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlayBg = document.getElementById("cart-overlay-bg");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartSubtotalElem = document.getElementById("cart-subtotal");
  
    // Function to open cart sidebar
    function openCart() {
      cartSidebar.classList.add("open");
      cartOverlayBg.style.display = "block";
    }
  
    // Function to close cart sidebar
    function closeCart() {
      cartSidebar.classList.remove("open");
      cartOverlayBg.style.display = "none";
    }
  
    // Update cart display (list, count, and subtotal)
    function updateCartDisplay() {

      cartCount.innerText = cart.length;
      cartItemsList.innerHTML = "";
      let subtotal = 0;
      // Append each cart item
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "align-items-center"
        );
        li.innerHTML = `
          <span>${item.title} - ${item.price}</span>
          <button class="btn btn-sm btn-danger remove-item" data-index="${index}">&times;</button>
        `;
        cartItemsList.appendChild(li);
  
        // Update subtotal by parsing the price
        let priceNum = parseFloat(item.price.replace('$', ''));
        if (!isNaN(priceNum)) {
          subtotal += priceNum;
        }
      });
  
      // Update subtotal display (format with 2 decimal places)
      if (cartSubtotalElem) {
        cartSubtotalElem.innerText = "$" + subtotal.toFixed(2);
      }
  
      // Attach event listeners for remove buttons
      document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.addEventListener("click", function () {
          const idx = this.getAttribute("data-index");
          cart.splice(idx, 1);
          updateCartDisplay();
        });
      });
    }
  
    // When clicking the header cart icon, open the cart sidebar
    headerCart.addEventListener("click", function (e) {
      e.preventDefault();
      openCart();
    });
  
    
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlayBg.addEventListener("click", closeCart);
  
    document.querySelectorAll(".product-card .cart-overlay").forEach((overlay) => {
      overlay.addEventListener("click", function (e) {
        e.stopPropagation(); 
        const title =
          this.getAttribute("data-title") ||
          this.parentElement.querySelector(".card-title").innerText;
        const price =
          this.getAttribute("data-price") ||
          this.parentElement.querySelector(".price").innerText;

        // Create product object
        const product = { title, price };
        cart.push(product);
        updateCartDisplay();
        openCart();
      });
    });
  });
  