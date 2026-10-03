export class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        renderProductDetails(this.product);
        document.querySelector("#addToCart").addEventListener("click", () => addProductToCart(this.product));
    }
}

function addProductToCart(product) {
    const cart = localStorage.getItem("so-cart");
    const cartItems = cart ? JSON.parse(cart) : [];
    cartItems.push(product);
    localStorage.setItem("so-cart", JSON.stringify(cartItems));

    window.dispatchEvent(new Event("cartUpdated"));
}

function renderProductDetails(product) {
    const h3 = document.querySelector("h3");
    const h2 = document.querySelector("h2");
    const price = document.querySelector(".product-card__price");
    const color = document.querySelector(".product__color");
    const description = document.querySelector(".product__description");
    const img = document.querySelector("#productImage");

    h3.textContent = product.Brand["Name"];
    h2.textContent = product.NameWithoutBrand;
    price.textContent = `$${product.FinalPrice}`;
    color.textContent = product.Colors[0].ColorName;
    description.innerHTML = product.DescriptionHtmlSimple;
    img.setAttribute("src", product.Image);
    img.setAttribute("alt", product.Name);
}