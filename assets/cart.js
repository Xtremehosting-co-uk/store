<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart Example</title>
    <style>
        /* Add your styles for the cart here */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 10px;
            text-align: left;
        }

        button {
            cursor: pointer;
        }
    </style>
</head>
<body>

<div id="cartcontent"></div>

<script>
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.catalog = {
            // Replace with your actual catalog data
            'itemId1': { name: 'Item 1', description: 'Description 1', price: 10.99 },
            'itemId2': { name: 'Item 2', description: 'Description 2', price: 19.99 },
            // Add more items as needed
        };

        this.setupEventListeners();
        this.drawCart();
    }

    loadCart() {
        if (typeof Storage !== "undefined" && localStorage.cart) {
            return JSON.parse(localStorage.cart);
        } else {
            return {};
        }
    }

    updateLocalStorage() {
        localStorage.cart = JSON.stringify(this.cart);
    }

    addItem(itemId) {
        if (this.catalog[itemId]) {
            this.cart[itemId] = (this.cart[itemId] || 0) + 1;
            this.updateLocalStorage();
            this.drawCart();
        }
    }

    subtractItem(itemId) {
        if (this.cart[itemId] > 0) {
            this.cart[itemId]--;
            if (this.cart[itemId] === 0) {
                this.removeItem(itemId);
            } else {
                this.updateLocalStorage();
                this.drawCart();
            }
        }
    }

    removeItem(itemId) {
        delete this.cart[itemId];
        this.updateLocalStorage();
        this.drawCart();
    }

    drawCart() {
        const cartContent = document.getElementById("cartcontent");

        if (Object.keys(this.cart).length === 0) {
            cartContent.innerHTML = "<h2>Cart is empty</h2>";
        } else {
            let cartHtml = `<table><tr><th>Item</th><th>Description</th><th>Qty.</th><th>Actions</th><th>Price</th></tr>`;
            let total = 0;

            for (const itemId in this.cart) {
                const item = this.catalog[itemId];
                const quantity = this.cart[itemId];

                cartHtml += `<tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${quantity}</td>
                    <td>
                        <button onclick="shoppingCart.addItem('${itemId}')">+</button>
                        <button onclick="shoppingCart.subtractItem('${itemId}')">-</button>
                        <button onclick="shoppingCart.removeItem('${itemId}')">🗑</button>
                    </td>
                    <td>${(item.price * quantity).toFixed(2)}</td>
                </tr>`;

                total += item.price * quantity;
            }

            cartHtml += `<tr><td colspan="4">TOTAL</td><td>${total.toFixed(2)}</td></tr>`;
            cartHtml += `</table><button onclick="window.location='/checkout'"><h4>Proceed to Checkout</h4></button>`;

            cartContent.innerHTML = cartHtml;
        }
    }

    setupEventListeners() {
        // Add event listeners for your UI elements
        // Example: document.getElementById('addButton').addEventListener('click', () => this.addItem('itemId'));
    }

const shoppingCart = new ShoppingCart();
</script>

</body>
</html>
