$.ajax({
    url: "cars.json",
    dataType: "json",
    success: function(data) {
        var carTable = $("#carTable tbody");
        var allCars = data.cars;
        $.each(allCars, function(index, car) {
            var row = $("<tr>");
            row.append(
                $("<td>").html(
                    '<img src="./assets/' + car.model + '.jpg" class="car-img">'
                )
            );
            row.append($("<td>").text(car.brand));
            row.append($("<td>").text(car.category));
            row.append($("<td>").text(car.model));
            row.append($("<td>").text(car.model_year));
            row.append($("<td>").text(car.mileage));
            row.append($("<td>").text(car.fuel_type));
            row.append($("<td>").text(car.seats));
            row.append($("<td>").text(car.price_per_day));
            row.append(
                $("<td>").text(car.availability ? "Available" : "Not Available")
            );
            row.append($("<td>").text(car.in_stock));
            row.append($("<td>").text(car.description));

            var addToCartButton = $("<button class='addToCartButton'>Rent</button>");
            if (!car.availability) {
                addToCartButton.prop("disabled", true);
                addToCartButton.css("background-color", "#ccc");
                addToCartButton.css("cursor", "not-allowed");
            }

            row.append($("<td>").append(addToCartButton));
            carTable.append(row);
        });
    }
});

$(document).ready(function() {
    $('#search').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('#carTable tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

$('#search').on('focus', function() {
    showSuggestions($(this).val().toLowerCase());
});

$('#search').on('blur', function() {
    setTimeout(function() {
        $('#suggestions').hide();
    }, 100);
});

var recentSearches = ["Toyota", "Kia", "Hyundai"];

$(document).ready(function() {
    $('#search').on('input', function() {
        var value = $(this).val().toLowerCase();
        showSuggestions(value);
        $('#carTable tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    }).on('focus', function() {
        showSuggestions($(this).val().toLowerCase());
    });

    function showSuggestions(value) {
        $('#suggestions').empty().hide();

        recentSearches.forEach(function(keyword) {
            if (!value || keyword.toLowerCase().includes(value)) {
                $('<div>').text(keyword).appendTo('#suggestions').click(function() {
                    $('#search').val($(this).text()).keyup();
                });
            }
        });

        if ($('#suggestions').children().length > 0) {
            $('#suggestions').show();
        } else {
            $('#suggestions').hide();
        }
    }
});

$(document).ready(function() {
    $('#floatingMenuButton').click(function() {
        $('#categoryList').toggle();
    });

    $('.category-item').click(function() {
        var selectedCategory = $(this).text();
        $('#categoryList').hide();

        $('#carTable tbody tr').filter(function() {
            $(this).toggle($(this).find('td').eq(2).text() === selectedCategory);
        });
    });
});