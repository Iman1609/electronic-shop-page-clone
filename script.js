document.addEventListener("DOMContentLoaded", function () {
    // Array to store cart items
    let cart = [];
  
    // Elements
    const headerCart = document.getElementById("header-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlayBg = document.getElementById("cart-overlay-bg");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
  
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
  
    // Update cart display (list and count)
    function updateCartDisplay() {
      // Update count
      cartCount.innerText = cart.length;
      // Clear list
      cartItemsList.innerHTML = "";
      // Append each cart item
      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.innerHTML = `
          <span>${item.title} - ${item.price}</span>
          <button class="btn btn-sm btn-danger remove-item" data-index="${index}">&times;</button>
        `;
        cartItemsList.appendChild(li);
      });
  
      // Attach event listeners for remove buttons
      document.querySelectorAll(".remove-item").forEach(btn => {
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
  
    // Close cart when clicking the close button or the overlay background
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlayBg.addEventListener("click", closeCart);
  
    // Attach event listener to every product card's cart overlay icon
    document.querySelectorAll(".product-card .cart-overlay").forEach(overlay => {
      overlay.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent any parent handlers
        // Use data attributes if set; otherwise, get from DOM
        const title = this.getAttribute("data-title") || this.parentElement.querySelector(".card-title").innerText;
        const price = this.getAttribute("data-price") || this.parentElement.querySelector(".price").innerText;
        // Create product object
        const product = { title, price };
        // Add to cart
        cart.push(product);
        // Update display
        updateCartDisplay();
        // Optionally, open the cart sidebar after adding
        openCart();
      });
    });
  });
  