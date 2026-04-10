const menuData = {
    burgers: [
        { name: "Double Wheeler", desc: "Two 100g Beef Patties", price: "650" },
        { name: "Zinga Burger", desc: "Cheesy beef 200g, bacon & white sauce", price: "800" },
        { name: "Trailer Burger", desc: "One 100g beef patty", price: "550" },
        { name: "Power House Burger", desc: "Beef 100g, steak 100g & chicken 100g", price: "850" },
        { name: "Bad Boy Burger", desc: "Beef 100g, Bacon & White sauce (Avo Splash)", price: "750" },
        { name: "Forget Me Not", desc: "Grilled chicken 200g & pineapple", price: "850" },
        { name: "Cuckoo Trailer", desc: "One 100g grilled chicken patty", price: "650" },
        { name: "Three Wheeler", desc: "Three 100g beef patties", price: "750" },
        { name: "Trailer Steak", desc: "One 100g rump steak", price: "700" },
        { name: "Paneer Trailer", desc: "100g grilled veggie patty", price: "500" }
    ],
    grills: [
        { name: "Flame Grilled Spatchcock", desc: "Served with a portion of fries", price: "500" },
        { name: "English Fish & Chips", desc: "Served with garlic sauce and fries", price: "750" },
        { name: "Sirloin Steak", desc: "Prime steak from the grill", price: "950" },
        { name: "Tenderloin", desc: "Prime steak from the grill", price: "950" },
        { name: "Rump Steak", desc: "Prime steak from the grill", price: "900" },
        { name: "Chicken Wrap", desc: "Served with a scoop of fries", price: "400" },
        { name: "Beef Wrap", desc: "Served with a scoop of fries", price: "400" },
        { name: "8pcs Wings", desc: "BBQ, Buffalo, Sweet & Sticky, or Hot & Sour", price: "600" }
    ],
    sides: [
        { name: "Loaded Fries", desc: "Topped with everything good", price: "550" },
        { name: "Sloppy Fries", desc: "Messy and delicious", price: "400" },
        { name: "Masala Fries", desc: "Spicy aromatic blend", price: "250" },
        { name: "Garlic Fries", desc: "Fresh garlic herb butter", price: "200" },
        { name: "Sausage", desc: "Single beef sausage", price: "50" },
        { name: "Beef Samosa", desc: "Crispy and savory", price: "50" },
        { name: "Chicken Nuggets", desc: "Served with a scoop of fries", price: "300" },
        { name: "Onion Rings", desc: "Crunchy battered rings", price: "150" }
    ],
    drinks: [
        { name: "Trailer Mojito", desc: "Our secret house special", price: "350" },
        { name: "Strawberry Mojito", desc: "Refreshing fruit mix", price: "350" },
        { name: "Dawa", desc: "Honey, lemon, ginger & cinnamon", price: "150" },
        { name: "Kenyan Chai", desc: "Freshly brewed tea", price: "100" },
        { name: "Masala Chai", desc: "Spiced Kenyan tea", price: "150" },
        { name: "Pineapple Mint Juice", desc: "Freshly squeezed", price: "200" },
        { name: "Mango Juice", desc: "Seasonal fresh mango", price: "150" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Food Trailer Script Initializing...");

    // 1. Menu Initialization (Highest Priority)
    const menuContainer = document.getElementById('menu-container');
    const menuTabs = document.querySelectorAll('.menu-tab');

    function populateMenu(category) {
        if (!menuContainer) {
            console.error("Menu container not found!");
            return;
        }

        try {
            menuContainer.innerHTML = '';
            const items = menuData[category];
            
            if (!items) {
                console.error(`Category ${category} not found`);
                return;
            }

            items.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'menu-item';
                itemEl.innerHTML = `
                    <div class="menu-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.desc}</p>
                    </div>
                    <div class="menu-item-bottom">
                        <span class="item-price">Ksh ${item.price}</span>
                    </div>
                `;
                menuContainer.appendChild(itemEl);
            });
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } catch (err) {
            console.error("Error populating menu:", err);
        }
    }

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                menuTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                populateMenu(tab.dataset.category);
            });
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Mobile Menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 4. Open Status
    const openStatus = document.getElementById('open-status');
    if (openStatus) {
        try {
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const nairobiTime = new Date(utc + (3600000 * 3));
            const hour = nairobiTime.getHours();
            
            if (hour >= 11 && hour < 21) {
                openStatus.textContent = 'OPEN NOW';
                openStatus.className = 'status-badge open';
            } else {
                openStatus.textContent = 'CLOSED';
                openStatus.className = 'status-badge closed';
            }
        } catch (err) {
            console.error("Error checking open status:", err);
        }
    }

    // Initial load
    populateMenu('burgers');
});
