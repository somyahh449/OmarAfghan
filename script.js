
/* =====================================
   OMAR AFGHAN - CAR SHOWROOM
   Search, View More and Car Details
   Plain JavaScript + JSON Data
===================================== */


/* 1. CAR DATA */

let carInformation = [];
let carDataLoaded = false;

async function loadCarData() {
    try {
        const response = await fetch("./data/cars.json");

        if (!response.ok) {
            throw new Error(
                "Failed to load cars.json: " + response.status
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("cars.json must contain an array.");
        }

        carInformation = data;
        carDataLoaded = true;

        console.log("Car data loaded successfully:", carInformation);

    } catch (error) {
        console.error("Error loading car data:", error);
    }
}

loadCarData();


/* 2. HTML ELEMENTS */

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const viewMoreButton = document.getElementById("viewMoreButton");
const carsGrid = document.getElementById("carsGrid");

const carCards = document.querySelectorAll(".car-card");
const moreCars = document.querySelectorAll(".more-car");
const detailButtons = document.querySelectorAll(".details-button");

const carModal = document.getElementById("carModal");
const closeCarModal = document.getElementById("closeCarModal");

let allCarsVisible = false;


/* 3. VIEW MORE / SHOW LESS */

// Display all additional cars
function showAllCars() {
    allCarsVisible = true;

    moreCars.forEach(function (car) {
        car.style.display = "block";
    });

    viewMoreButton.textContent = "Show Less";
}

// Display only the featured cars
function showFeaturedCars() {
    allCarsVisible = false;

    moreCars.forEach(function (car) {
        car.style.display = "none";
    });

    viewMoreButton.textContent = "View More";
}

// View More button
viewMoreButton.addEventListener("click", function () {
    if (allCarsVisible) {
        showFeaturedCars();
    } else {
        showAllCars();
    }
});


/* 4. SEARCH HELPERS */

// Ignore spaces, hyphens and punctuation
function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

// Create the no-results message
function getNoResultsElement() {
    let noResults = document.getElementById("noCarResults");

    if (!noResults) {
        noResults = document.createElement("p");
        noResults.id = "noCarResults";

        noResults.style.cssText = `
            grid-column: 1 / -1;
            width: 100%;
            text-align: center;
            color: #d8ad55;
            padding: 25px;
        `;

        carsGrid.appendChild(noResults);
    }

    return noResults;
}


/* 5. SEARCH CARS */

function searchCars() {
    const searchText = searchInput.value.trim();
    const cleanSearch = normalizeText(searchText);
    const noResults = getNoResultsElement();

    // Restore the original collection when search is empty
    if (cleanSearch === "") {
        noResults.style.display = "none";
        viewMoreButton.style.display = "";

        carCards.forEach(function (car) {
            car.style.display = "";
        });

        showFeaturedCars();
        return;
    }

    let matchFound = false;

    carCards.forEach(function (card) {
        const heading = card.querySelector("h3");

        const carName = heading
            ? heading.textContent.trim()
            : "";

        // Find matching data in cars.json
        const carInfo = carInformation.find(function (item) {
            return normalizeText(item.name) === normalizeText(carName);
        });

        // Search card text and all relevant JSON fields
        const searchableParts = [
            carName,
            card.textContent
        ];

        if (carInfo) {
            searchableParts.push(
                carInfo.name,
                carInfo.category,
                carInfo.engine,
                carInfo.drive,
                carInfo.seats,
                carInfo.price,
                carInfo.description
            );

            if (Array.isArray(carInfo.keywords)) {
                searchableParts.push(...carInfo.keywords);
            }
        }

        const searchableText = normalizeText(
            searchableParts.join(" ")
        );

        const matches = searchableText.includes(cleanSearch);

        // Explicitly display matching cards, including more-car cards
        card.style.display = matches ? "block" : "none";

        if (matches) {
            matchFound = true;
        }
    });

    // Hide View More while displaying search results
    viewMoreButton.style.display = "none";

    // Show or hide the no-results message
    if (matchFound) {
        noResults.style.display = "none";
        noResults.textContent = "";
    } else {
        noResults.textContent =
            "No matching cars found. Try Lexus, BMW, Toyota or Mercedes.";

        noResults.style.display = "block";
    }
}


// Search button click
searchButton.addEventListener("click", searchCars);

// Press Enter to search
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchCars();
    }
});

// Restore featured cars when the input is cleared
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


/* 6. OPEN CAR DETAILS */

function openCarDetails(carName) {
    const info = carInformation.find(function (car) {
        return normalizeText(car.name) === normalizeText(carName);
    });

    if (!info) {
        alert(
            carDataLoaded
                ? "Car information is not available yet."
                : "Car data is still loading. Please try again."
        );

        return;
    }

    document.getElementById("modalCarName").textContent =
        info.name;

    document.getElementById("modalCarDescription").textContent =
        info.description || "Contact us for more information.";

    document.getElementById("modalCategory").textContent =
        info.category || "Not specified";

    document.getElementById("modalEngine").textContent =
        info.engine || "Not specified";

    document.getElementById("modalDrive").textContent =
        info.drive || "Not specified";

    document.getElementById("modalSeats").textContent =
        info.seats || "Not specified";

    document.getElementById("modalPrice").textContent =
        info.price || "Contact for price";

    document.getElementById("modalPriceNote").textContent =
        info.priceNote || "";

    carModal.classList.add("is-open");

    carModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeCarModal.focus();
}


// Connect every View Details button
detailButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const carName = button.getAttribute("data-car");

        openCarDetails(carName);
    });
});


/* 7. CLOSE CAR DETAILS */

function closeDetails() {
    carModal.classList.remove("is-open");

    carModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// Close button
closeCarModal.addEventListener("click", closeDetails);

// Close by clicking the dark background
carModal.addEventListener("click", function (event) {
    if (event.target === carModal) {
        closeDetails();
    }
});

// Close with Escape
document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        carModal.classList.contains("is-open")
    ) {
        closeDetails();
    }
});

// Close the popup before navigating to Contact
document.getElementById("modalContact").addEventListener(
    "click",
    function () {
        closeDetails();
    }
);


/* 8. INITIAL DISPLAY */

// Start with only the three featured cars
showFeaturedCars();
