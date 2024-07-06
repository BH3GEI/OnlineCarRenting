$(document).ready(function() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotalPrice();
    }

    function updateTotalPrice() {
        var totalPrice = 0;
        $('#cartTableBody').find('tr').each(function() {
            var price = parseFloat($(this).find('.price-per-day').text());

            var startDate = new Date($(this).find('.start-date').val());
            var endDate = new Date($(this).find('.end-date').val());

            var timeDiff = endDate - startDate;
            var days = Math.ceil(timeDiff / (1000 * 3600 * 24)); // convert timeDiff to days

            var quantity = parseInt($(this).find('.quantity').val());

            // Validate the data before adding to the total
            if (!isNaN(days) && days > 0 && !isNaN(price) && !isNaN(quantity)) {
                totalPrice += price * days * quantity;
            } else {
                console.error('Invalid data for calculation', {
                    startDate: $(this).find('.start-date').val(),
                    endDate: $(this).find('.end-date').val(),
                    days,
                    price,
                    quantity
                });
            }
        });
        $('#totalPrice').text("$" + totalPrice.toFixed(2));
    }

    $('#cartTableBody').on('change', '.days, .quantity', function() {
        updateTotalPrice();
    });

    $('#cartTableBody').on('change', '.start-date, .end-date, .quantity', function() {
        updateTotalPrice();
    });

    $('#carTable').on('click', '.addToCartButton', function() {
        var row = $(this).closest('tr');
        var brand = row.find('td:nth-child(3)').text().trim();
        var model = row.find('td:nth-child(4)').text().trim();
        var year = row.find('td:nth-child(5)').text().trim();
        var price = parseFloat(row.find('td:nth-child(9)').text().trim());
        var car = { brand: brand, model: model, year: year, price: price };
        cart.push(car);
        updateCart();
        var animation = $('<div>')
            .addClass('cart-animation')
            .text('Car added to reservation successfully.');
        $('#cartAnimation').append(animation);

        setTimeout(function() {
            animation.remove();
        }, 1500);
    });

    $('#cartTableBody').on('click', '.removeFromCartButton', function() {
        var index = $(this).data('index');

        cart.splice(index, 1);

        updateCart();

        $(this).closest('tr').remove();

        var totalPrice = 0;
        $.each(cart, function(index, item) {
            totalPrice += parseFloat(item.price);
        });

        localStorage.setItem('totalPrice', totalPrice);

        $('#totalPrice').text(totalPrice.toFixed(2));
    });

    if (window.location.pathname.endsWith('viewCart.html')) {
        var cartTableBody = $('#cartTableBody');
        var totalPrice = 0;
        cartTableBody.empty();
        $.each(cart, function(index, item) {
            var row = $('<tr>');
            row.append($('<td>').html('<img src="./assets/' + item.model + '.jpg" alt="Car Thumbnail" class="car-thumbnail">'));
            row.append($('<td>').text(item.brand));
            row.append($('<td>').text(item.model));
            row.append($('<td>').text(item.year));
            row.append($('<td>').addClass('price-per-day').text(item.price.toFixed(2)));
            row.append($('<td>').html('<input type="date" class="start-date">'));
            row.append($('<td>').html('<input type="date" class="end-date">'));
            row.append($('<td>').html('<input type="number" class="quantity" value="1" min="1">'));
            row.append($('<td>').html('<button class="removeFromCartButton">Remove</button>').data('index', index));
            cartTableBody.append(row);
            totalPrice += parseFloat(item.price);
        });
        updateTotalPrice();
        localStorage.setItem('totalPrice', totalPrice);
        $('#totalPrice').text("$" + totalPrice.toFixed(2));
        if (cart.length === 0) {
            $("#checkoutButton").addClass("disabled");
            $("#checkoutButton").prop("disabled", true);
            $("#checkoutButton").css("background-color", "#ccc");
            $("#checkoutButton").css("cursor", "not-allowed");
        }
    }
});