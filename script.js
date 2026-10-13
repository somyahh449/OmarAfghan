// =====================================
// OMAR AFGHAN - CAR SHOWROOM
// Search, View More and Car Details
// =====================================


// 1. CAR INFORMATION
// Prices are US starting MSRP references, not Herat prices.

const carInformation = {
    "Lexus LX": {
        category: "Luxury SUV",
        engine: "3.4L twin-turbo V6",
        drive: "Full-time 4WD",
        seats: "Up to 7",
        price: "From $108,050 USD",
        priceNote: "2026 US starting MSRP reference for Lexus LX 600 Premium. Local price depends on model, year, condition, taxes and import costs.",
        description: "A flagship luxury SUV combining strong performance, a refined interior and full-time four-wheel drive."
    },

    "Toyota Land Cruiser": {
        category: "Premium SUV",
        engine: "2.4L turbo hybrid",
        drive: "Full-time 4WD",
        seats: "5",
        price: "From $57,200 USD",
        priceNote: "2026 US starting MSRP reference. This is not a confirmed price for a vehicle in Afghanistan.",
        description: "A capable SUV designed for demanding roads, with a turbo-hybrid powertrain and advanced off-road systems."
    },

    "Mercedes-Benz": {
        category: "Luxury vehicle",
        engine: "Depends on model",
        drive: "Depends on model",
        seats: "Depends on model",
        price: "Contact for price",
        priceNote: "Mercedes-Benz has many models. The exact model, year and trim are needed for a reliable price.",
        description: "Mercedes-Benz offers luxury sedans and SUVs with premium interiors, modern technology and a range of powertrains."
    },

    "Range Rover": {
        category: "Luxury SUV",
        engine: "Depends on model",
        drive: "Model dependent",
        seats: "Model dependent",
        price: "Contact for price",
        priceNote: "Range Rover pricing varies by model year, trim, engine and market.",
        description: "A luxury SUV family known for a comfortable cabin, distinctive design and all-terrain capability."
    },

    "BMW X7": {
        category: "Luxury SUV",
        engine: "3.0L turbo inline-six (xDrive40i)",
        drive: "All-wheel drive",
        seats: "Up to 7",
        price: "From $87,500 USD",
        priceNote: "US starting MSRP reference for the 2026 BMW X7 xDrive40i. Not a confirmed local or used-car price.",
        description: "A spacious three-row luxury SUV combining turbocharged performance, technology and a premium interior."
    },

    "Rolls Royce": {
        category: "Ultra-luxury vehicle",
        engine: "Depends on model",
        drive: "Depends on model",
        seats: "Depends on model",
        price: "Contact for price",
        priceNote: "The exact model, such as Cullinan or Ghost, and its year are required for an accurate price.",
        description: "Rolls-Royce vehicles focus on handcrafted luxury, quiet comfort and distinctive design."
    }
};


// 2. FIND EXISTING HTML ELEMENTS

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const viewMoreButton = document.getElementById("viewMoreButton");
const carsGrid = document.getElementById("carsGrid");

const carCards = document.querySelectorAll(".car-card");
const moreCars = document.querySelectorAll(".more-car");
const detailButtons = document.querySelectorAll(".details-button");

const carModal = document.getElementById("carModal");
const closeCarModal = document.getElementById("closeCarModal");


// 3. VIEW MORE

let allCarsVisible = false;

function showAllCars() {
    allCarsVisible = true;

    moreCars.forEach(function (car) {
        car.style.display = "block";
    });

    viewMoreButton.textContent = "Show Less";
}

function showFeaturedCars() {
    allCarsVisible = false;

    moreCars.forEach(function (car) {
        car.style.display = matches ?"block":"none";
    });

    viewMoreButton.textContent = "View More";
}

viewMoreButton.addEventListener("click", function () {
    if (allCarsVisible) {
        showFeaturedCars();
    } else {
        showAllCars();
    }
});
// 4. SEARCH CARS

function searchCars() {
    const searchText = searchInput.value.trim().toLowerCase();

    // An empty search restores the normal collection.
    if (searchText === "") {
        carCards.forEach(function (car) {
            car.style.display = "";
        });

        showFeaturedCars();
        return;
    }

    // Reveal all cards while searching, including extra cars.
    moreCars.forEach(function (car) {
        car.style.display = "block";
    });

    let matchFound = false;

    carCards.forEach(function (car) {
        // const carName = car.querySelector("h3").textContent.toLowerCase();
        const carName = car.querySelector("h3").textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
        const carDescription = car.textContent.toLowerCase();

        // const matches =
        //     carName.includes(searchText) ||
        //     carDescription.includes(searchText);
        const cleanSearch = searchText.replace(/[^a-z0-9]/g, "");

const matches =
    carName.includes(cleanSearch) ||
    carDescription.includes(searchText);

        car.style.display = matches ? "" : "none";

        if (matches) {
            matchFound = true;
        }
    });

    viewMoreButton.style.display = "none";

    // Add a helpful message if no car matches.
    let noResults = document.getElementById("noCarResults");

    if (!noResults) {
        noResults = document.createElement("p");
        noResults.id = "noCarResults";
        noResults.style.cssText =
            "grid-column:1/-1;text-align:center;color:#d8ad55;padding:25px;";
        carsGrid.appendChild(noResults);
    }

    noResults.textContent = matchFound
        ? ""
        : "No matching cars found. Try Lexus, BMW, Toyota or Mercedes.";

    noResults.style.display = matchFound ? "none" : "block";
}

searchButton.addEventListener("click", searchCars);

// Pressing Enter runs the same search.
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchCars();
    }
});

// Restore all cars and the View More button when the search is cleared.
searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
        const noResults = document.getElementById("noCarResults");

        if (noResults) {
            noResults.style.display = "none";
        }

        viewMoreButton.style.display = "";
        carCards.forEach(function (car) {
            car.style.display = "";
        });

        showFeaturedCars();
    }
});


// 5. OPEN CAR DETAILS

function openCarDetails(carName) {
    const info = carInformation[carName];

    if (!info) {
        alert("Car information is not available yet.");
        return;
    }

    document.getElementById("modalCarName").textContent = carName;
    document.getElementById("modalCarDescription").textContent = info.description;
    document.getElementById("modalCategory").textContent = info.category;
    document.getElementById("modalEngine").textContent = info.engine;
    document.getElementById("modalDrive").textContent = info.drive;
    document.getElementById("modalSeats").textContent = info.seats;
    document.getElementById("modalPrice").textContent = info.price;
    document.getElementById("modalPriceNote").textContent = info.priceNote;

    carModal.classList.add("is-open");
    carModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeCarModal.focus();
}

detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const carName = button.getAttribute("data-car");
        openCarDetails(carName);
    });
});


// 6. CLOSE THE DETAILS WINDOW

function closeDetails() {
    carModal.classList.remove("is-open");
    carModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

closeCarModal.addEventListener("click", closeDetails);

// Close when clicking the dark background.
carModal.addEventListener("click", function (event) {
    if (event.target === carModal) {
        closeDetails();
    }
});

// Close with the Escape key.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && carModal.classList.contains("is-open")) {
        closeDetails();
    }
});
// Close the popup before following the contact link.
document.getElementById("modalContact").addEventListener("click", function () {
    closeDetails();
});