(function () {
  const { hostname, pathname } = window.location;

  if (!hostname.includes("e-bebek.com") || pathname !== "/") {
    console.log("wrong page");
    return;
  }

  const PRODUCTS_KEY = "insider_products";
  const FAVORITES_KEY = "insider_favorites";
  const API_URL =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

  function getProductsFromStorage() {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : null;
  }

  function saveProductsToStorage(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }

  function getFavoritesFromStorage() {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  function toggleFavorite(productId) {
    let favorites = getFavoritesFromStorage();
    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
    } else {
      favorites.push(productId);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return favorites;
  }

  async function fetchProducts() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API isteği başarısız");
      const products = await response.json();
      saveProductsToStorage(products);
      return products;
    } catch (err) {
      console.error("Ürünler alınamadı:", err);
      return [];
    }
  }

  async function loadProducts() {
    let products = getProductsFromStorage();
    if (!products) {
      console.log("API'den veri çekiliyor...");
      products = await fetchProducts();
    } else {
      console.log("LocalStorage'dan ürünler yüklendi ✅");
    }
    return products;
  }

  function createCSS() {
    const css = `
      .custom-carousel-container {
        max-width: 1200px;
        margin: 30px auto;
        padding: 15px 50px;
        border-radius: 16px;
        position: relative;
        box-sizing: border-box;
      }
      .custom-carousel-title {
        font-family: "Quicksand-SemiBold", sans-serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
        color: #2b2f33;
        margin: 0 4px 8px 4px;
      }
      .custom-carousel {
        display: flex;
        gap: 12px;
        padding: 12px 40px 20px 15px;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .custom-carousel::-webkit-scrollbar {
        display: none;
      }
      .custom-card {
        flex: 0 0;
        min-width: 20%;
        max-width: 20%;
        border: 1px solid #e6e6e6;
        border-radius: 12px;
        padding: 12px;
        background: #fff;
        position: relative;
        scroll-snap-align: start;
        padding-bottom: 80px;
        transition: border 0.2s ease, transform 0.2s ease;
        cursor: pointer;
      }
      .custom-card:hover {
        border-color: #bbb;
      }
      .custom-img {
        width: 100%;
        height: 140px;
        object-fit: contain;
        border-radius: 8px;
      }
      .custom-name {
        font: 400 12px/1.45 "Quicksand-Medium", sans-serif;
        margin: 8px 0;
        color: #2b2f33;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: calc(1.45em * 2);
      }
      .custom-name strong {
        font-weight: 600;
      }
      .custom-price {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        font-family: "Quicksand-SemiBold", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: #2b2f33;
        display: flex;
        flex-direction: column;
        gap: 4px;
        line-height: 1.2;
      }
      .custom-price del {
        margin-bottom: 0;
        text-decoration: none;
        color: #999;
        line-height: 1.1;
        display: inline-flex;
        align-items: center;
      }
      .custom-price-current {
        font-size: 18px;
        font-weight: 700;
        color: #2b2f33;
      }
      .custom-price-original {
        font-size: 12px;
        font-weight: 500;
      }
      .custom-price-discount {
        display: inline-block;
        background: #00a365;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 16px;
        margin-left: 6px;
        vertical-align: middle;
      }
      .custom-heart {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        background: url("data:image/svg+xml;utf8,<svg fill='none' stroke='%23aaa' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>") no-repeat center/contain;
        transition: background 0.3s;
      }
      .custom-heart.active {
        background: url("data:image/svg+xml;utf8,<svg fill='%23e65100' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>") no-repeat center/contain;
      }
      .custom-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 16px 16px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        z-index: 100;
      }
      .custom-arrow-left {
        left: 3px;
        background-image: url('https://cdn06.e-bebek.com/assets/toys/svg/arrow-left.svg');
      }
      .custom-arrow-right {
        right: 10px;
        background-image: url('https://cdn06.e-bebek.com/assets/toys/svg/arrow-right.svg');
      }
      .most-seller-badge {
        position: absolute;
        top: 8px;
        left: 8px;
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        z-index: 5;
      }
      .most-seller-badge i {
        width: 40px;
        height: 40px;
        display: block;
        background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/most-seller-product.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .inner-btn {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(176, 176, 176, 0.01) 0 6px 2px 0,
                    rgba(176, 176, 176, 0.08) 0 2px 9px 0,
                    rgba(176, 176, 176, 0.14) 0 2px 4px 0,
                    rgba(176, 176, 176, 0.24) 0 0 1px 0,
                    rgba(176, 176, 176, 0.28) 0 0 1px 0;
        cursor: pointer;
        z-index: 10;
        transition: background-color 0.2s;
      }
      .inner-btn i {
        width: 14px;
        height: 14px;
        aspect-ratio: 1 / 1;
        display: block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        font-size: 11px;
        font-weight: 700;
        color: rgb(0,145,213);
        font-family: 'Quicksand-SemiBold';
        transition: all 0.2s;
      }
      .inner-btn i.toys-icon-plus-blue {
        background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/plus-blue.svg");
      }
      .inner-btn i.toys-icon-plus-white {
        background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/plus-white.svg");
        display: none;
      }
      .inner-btn:hover {
        background-color: rgb(0,145,213);
      }
      .inner-btn:hover i.toys-icon-plus-blue {
        display: none;
      }
      .inner-btn:hover i.toys-icon-plus-white {
        display: block;
      }
      @media (max-width: 768px) {
        .custom-arrow-left {
          left: 5px;
        }
        .custom-arrow-right {
          right: 5px;
        }
        .custom-carousel-container {
          padding: 15px 30px;
        }
      }
      @media (max-width: 1480px) {
        .custom-card {
          min-width: 273px;
          min-height: 343px;
        }
      }
      @media (max-width: 1280px) {
        .custom-card {
          min-width: 297px;
          min-height: 343px;
        }
      }
      @media (max-width: 991px) {
        .custom-card {
          min-width: 334.88px;
          min-height: 362px;
        }
      }
      @media (max-width: 768px) {
        .custom-card {
          min-width: calc(50% - 8px);
        }
      }
      @media (max-width: 567px) {
        .custom-card {
          max-height: 329px;
        }
      }
      @media (max-width: 480px) {
        .custom-name {
          font-size: 20px;
        }
      }
    `;
    const style = document.createElement("style");
    style.className = "custom-carousel-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createCarouselContainer() {
    const container = document.createElement("div");
    container.className = "custom-carousel-container";

    const title = document.createElement("h2");
    title.className = "custom-carousel-title";
    title.textContent = "Beğenebileceğinizi düşündüklerimiz";
    container.appendChild(title);

    const carousel = document.createElement("div");
    carousel.className = "custom-carousel";
    container.appendChild(carousel);

    const leftArrow = document.createElement("button");
    leftArrow.className = "custom-arrow custom-arrow-left";
    container.appendChild(leftArrow);

    const rightArrow = document.createElement("button");
    rightArrow.className = "custom-arrow custom-arrow-right";
    container.appendChild(rightArrow);

    const heroBanner = document.querySelector(".hero.banner");
    if (heroBanner && heroBanner.parentNode) {
      heroBanner.parentNode.insertBefore(container, heroBanner.nextSibling);
    } else {
      document.body.appendChild(container);
    }

    return { container, carousel, leftArrow, rightArrow };
  }

  function renderProducts(products, carousel) {
    const favorites = getFavoritesFromStorage();
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "custom-card";

      const mostSellerBadge = document.createElement("span");
      mostSellerBadge.className = "most-seller-badge";
      mostSellerBadge.innerHTML = '<i class="toys-icon toys-icon-most-seller-product"></i>';
      card.appendChild(mostSellerBadge);

      const img = document.createElement("img");
      img.className = "custom-img";
      img.src = product.img;
      img.alt = product.name;
      card.appendChild(img);

      const name = document.createElement("p");
      name.className = "custom-name";
      name.innerHTML = `<strong>${product.brand}</strong> - ${product.name}`;
      card.appendChild(name);

      const price = document.createElement("div");
      price.className = "custom-price";

      const priceFormatted = product.price.toFixed(2).replace(".", ",");

      if (product.price < product.original_price) {
        const originalFormatted = product.original_price.toFixed(2).replace(".", ",");
        const discountPercent = Math.round((1 - product.price / product.original_price) * 100);

        price.innerHTML = `
          <div>
            <del class="custom-price-original">${originalFormatted} TL</del>
            <span class="custom-price-discount">%${discountPercent}</span>
          </div>
          <div>
            <span class="custom-price-current">${priceFormatted} TL</span>
          </div>
        `;
      } else {
        price.innerHTML = `<span class="custom-price-current">${priceFormatted} TL</span>`;
      }

      card.appendChild(price);

      const heart = document.createElement("span");
      heart.className = "custom-heart" + (favorites.includes(product.id) ? " active" : "");
      card.appendChild(heart);

      const innerBtn = document.createElement("div");
      innerBtn.className = "inner-btn";
      innerBtn.innerHTML = `
        <i class="toys-icon toys-icon-plus-blue add-icon"></i>
        <i class="toys-icon toys-icon-plus-white add-icon hovered"></i>
      `;
      card.appendChild(innerBtn);

      card.addEventListener("click", (e) => {
        if (e.target.classList.contains("custom-heart")) {
          toggleFavorite(product.id);
          heart.classList.toggle("active", getFavoritesFromStorage().includes(product.id));
        } else if (!e.target.closest(".inner-btn") && !e.target.closest(".most-seller-badge")) {
          window.open(product.url, "_blank");
        }
      });

      carousel.appendChild(card);
    });
  }

  function setupCarouselControls(carousel, leftArrow, rightArrow) {
    leftArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: -250, behavior: "smooth" });
    });
    rightArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: 250, behavior: "smooth" });
    });
  }

  (async function init() {
    const products = await loadProducts();
    if (!products.length) return;

    createCSS();

    const { container, carousel, leftArrow, rightArrow } = createCarouselContainer();

    renderProducts(products, carousel);

    setupCarouselControls(carousel, leftArrow, rightArrow);
  })();
})();