var list = document.getElementById('usecasesList');
var image = document.getElementById('usecaseImage');

if (list !== null && image !== null) {
    var buttons = list.getElementsByClassName('usecase-button');

    function closeAllRows() {
        var rows = list.getElementsByClassName('usecase-row');
        var i = 0;

        while (i < rows.length) {
            rows[i].classList.remove('usecase-row-active');
            i = i + 1;
        }

        i = 0;

        while (i < buttons.length) {
            buttons[i].setAttribute('aria-expanded', 'false');
            i = i + 1;
        }
    }

    function openRow(button) {
        var row = button.parentElement;
        row.classList.add('usecase-row-active');
        button.setAttribute('aria-expanded', 'true');

        var newSrc = button.getAttribute('data-image');
        if (newSrc !== null) {
            image.src = newSrc;
            image.alt = button.textContent + ' image';
        }
    }

    var i = 0;

    while (i < buttons.length) {
        buttons[i].addEventListener('click', function () {
            closeAllRows();
            openRow(this);
        });

        i = i + 1;
    }

    closeAllRows();

    if (buttons.length > 0) {
        openRow(buttons[0]);
    }
}
