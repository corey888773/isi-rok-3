document.addEventListener('DOMContentLoaded', function() {
    var showHidePasswordLinks = document.querySelectorAll('.show_hide_password a');

    showHidePasswordLinks.forEach(function(link) {
        var timeoutId;
        
        link.addEventListener('mousedown', function(event) {
            event.preventDefault();

            timeoutId = setTimeout(function() {
                var showHidePassword = event.target.closest('.show_hide_password');
                var passwordInput = showHidePassword.querySelector('input');
                var passwordIcon = showHidePassword.querySelector('i');

                passwordInput.setAttribute('type', 'text');
                passwordIcon.classList.add('fa-eye-slash');
                passwordIcon.classList.remove('fa-eye');
            }, 0);
        });

        link.addEventListener('mouseup', function(event) {
            clearTimeout(timeoutId);

            var showHidePassword = event.target.closest('.show_hide_password');
            var passwordInput = showHidePassword.querySelector('input');
            var passwordIcon = showHidePassword.querySelector('i');

            passwordInput.setAttribute('type', 'password');
            passwordIcon.classList.remove('fa-eye-slash');
            passwordIcon.classList.add('fa-eye');
        });
    });
});

document.getElementsByClassName('new-password')[0].addEventListener('input', (event) => {
    const password = event.target.value;
    const strength = 0;

    if (password.length >= 8) strength++;
});

function addOrReplaceClassIfExists(element, oldClass, newClass) {
    if (element.classList.contains(oldClass)) {
        element.classList.replace(oldClass, newClass);
    } else {
        element.classList.add(newClass);
    }
}


let validPassword = false;
document.getElementsByClassName('new-password')[0].addEventListener('input', (event) => {
    const newPassword = event.target.value;
    validPassword = true;

    if (newPassword.length >= 8) {
        document.querySelector('.item1 i').className = 'fas fa-check';
        addOrReplaceClassIfExists(document.querySelector('.item1'), 'btn-outline-danger', 'btn-outline-success');
    }
    else{
        validPassword = false;
        document.querySelector('.item1 i').className = 'fas fa-times';
        addOrReplaceClassIfExists(document.querySelector('.item1'), 'btn-outline-success', 'btn-outline-danger');
    }

    if (/[^A-Za-z0-9]/.test(newPassword)) {
        document.querySelector('.item2 i').className = 'fas fa-check';
        addOrReplaceClassIfExists(document.querySelector('.item2'), 'btn-outline-danger', 'btn-outline-success');
    }
    else
    {
        validPassword = false;
        document.querySelector('.item2 i').className = 'fas fa-times';
        addOrReplaceClassIfExists(document.querySelector('.item2'), 'btn-outline-success', 'btn-outline-danger');
    }

    if (/[A-Z]/.test(newPassword)) {
        console.log('hello')
        document.querySelector('.item3 i').className = 'fas fa-check';
        addOrReplaceClassIfExists(document.querySelector('.item3'), 'btn-outline-danger', 'btn-outline-success');
    }
    else
    {
        validPassword = false;
        document.querySelector('.item3 i').className = 'fas fa-times';
        addOrReplaceClassIfExists(document.querySelector('.item3'), 'btn-outline-success', 'btn-outline-danger');
    }

    if (/\d/.test(newPassword)) {
        document.querySelector('.item4 i').className = 'fas fa-check';
        addOrReplaceClassIfExists(document.querySelector('.item4'), 'btn-outline-danger', 'btn-outline-success');
    }
    else
    {
        validPassword = false;
        document.querySelector('.item4 i').className = 'fas fa-times';
        addOrReplaceClassIfExists(document.querySelector('.item4'), 'btn-outline-success', 'btn-outline-danger');
    }
});

document.getElementsByClassName('repeat-password')[0].addEventListener('keydown', (event) => {
    const newPassword = document.getElementsByClassName('new-password')[0].value;
    if (event.key === 'Enter') {
        const repeatPassword = event.target.value;

        if (!validPassword) {
            document.getElementById('password-match-error').textContent = 'Password does not meet requirements';
            document.getElementById('password-match-error').style.color = 'red';
            return;
        }

        if (newPassword !== repeatPassword) {
            document.getElementById('password-match-error').textContent = 'Passwords do not match';
            document.getElementById('password-match-error').style.color = 'red';
            return;
        }
        document.getElementById('password-match-error').textContent = '';
    }
});