// ================= VIEW MORE =================

const viewMoreButton =
    document.getElementById("viewMoreButton");

const moreCars =
    document.querySelectorAll(".more-car");


viewMoreButton.addEventListener("click", function () {

    moreCars.forEach(function (car) {

        car.style.display = "block";

    });

    viewMoreButton.style.display = "none";

});



// ================= SEARCH =================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const cars =
    document.querySelectorAll(".car-card");


searchButton.addEventListener("click", function () {

    const searchText =
        searchInput.value.toLowerCase();


    cars.forEach(function (car) {

        const carName =
            car.querySelector("h3").textContent.toLowerCase();


        if (carName.includes(searchText)) {

            car.style.display = "block";

        } else {

            car.style.display = "none";

        }

    });

});



// ================= VIEW DETAILS =================

const detailButtons =
    document.querySelectorAll(".details-button");


detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const carName =
            button.getAttribute("data-car");

        alert(
            "You selected: " + carName +
            "\n\nMore information will be available soon."
        );

    });

});