document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const contactsList = document.getElementById('contacts');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const number = document.getElementById('number').value.trim();

        if (!/^[A-Z][a-z]+([- ][A-Z][a-z]+)+$/.test(name)) {
            alert('Proszę podać zarówno imię, jak i nazwisko. Nazwisko może być dwuczłonowe.');
            return;
        }

        const phoneRegex = /^\+?(\d[\s-]?){8,11}\d$/;
        if (!phoneRegex.test(number.replace(/\s+/g, ''))) {
            alert('Numer telefonu jest nieprawidłowy.');
            return;
        }

        addContact(name, number);
    });

    function addContact(name, number) {
        const li = document.createElement('li');
    
        const contactInfoDiv = document.createElement('div');
        contactInfoDiv.classList.add('container');

        const nameP = document.createElement('h6');
        nameP.classList.add('mb-1')

        const numberP = document.createElement('p');
        numberP.classList.add('mb-0')
    
        nameP.textContent = name;
        numberP.textContent = number;
    
        contactInfoDiv.appendChild(nameP);
        contactInfoDiv.appendChild(numberP);
    
        li.appendChild(contactInfoDiv);
    
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<img src="bin.png" alt="Usuń">';
        deleteBtn.onclick = function() {
            contactsList.removeChild(li);
        };
    
        li.appendChild(deleteBtn);
        contactsList.appendChild(li);
    
        document.getElementById('name').value = '';
        document.getElementById('number').value = '';
    }
    
});

