function setupNav(){
    var menuButton = document.getElementById('nav-toggle');
    var menu = document.getElementById('nav-menu');

    if (menuButton && menu){
        menuButton.addEventListener('click',function(){
            menu.classList.toggle('is-open');
        });

    }
    var currentPage =window.location.pathname.split('/').pop() || 'index.html';
    var navLink = document.querySelectorAll('nav-link');

    navLink.forEach(function(link){
        if (link.getAttribute('href')===currentPage){
            link.classList.add('nav__link--active')
        }
    });
    var navbar = document.querySelector('nav');
    if (navbar){
        window.addEventListener('scroll', function(){
            if (window.scrollY>10){
                navbar.classList.add('is-scrolled');
            }else{
                navbar.classList.remove('is-scrolled')
            }
        });
    }
}
//Pet profile

function setupPetProfile(){
    var section = document.getElementsByClassName('pet-profile-section');
    if (!section) return;

    var form =document.getElementById('pet-profile-form');
    var list = document.getElementById('pet-profile-list');
    var addButton = document.getElementById('add-pet-button');
    var cancelButton = document.getElementById('pet-form-cancel');
    var formBox = document.getElementById('pet-form-wrapper');

    var editingId =null;

    function loadPets(){
        return JSON.parse(localStorage.getItem('pawcare_pets') || "[]");
    }
    function savePets(pets){
        localStorage.setItem('pawcare_pets', JSON.stringify(pets));
    }

    function showPets(){
        var pets = loadPets();
        if (!list) return;
        if (pets.length===0){
            list.innerHTML= '<p>No pets added. Click "Add Pet"  to get started </p>'
            return;
        }
        innerHTML = pets.map(function(pet){
            return(
                '<div class="pet-card" data-id=" ' + pet.id+ '">'+
                "<h3>"+ pet.name+ "</h3>" +
                "<p>"+pet.species +(pet.breed? "."+pet.breed : "")+ (pet.age? "."+pet.age+"years" : "")+  "</p>"+
                (pet.notes? "<p>"+pet.notes+"</p>":"")+ 
                '<button onclick="editPet(\'' + pet.id+ '\')">Edit</button>' +
                '<button onclick=deletePet(\''+pet.id+ '\')">Remove</button>'+
                "</div>"
            );
        }).join("");
    }
    if (addButton){
        addButton.addEventListener('click',function(){
            editingId=null;
            if (form) form.reset();
            if (formBox) formBox.classList.toggle("is-hidden");
        });
    }
    if (cancelButton){
        cancelButton.addEventListener('click',function(){
            if (formBox) formBox.classList.add('is-hidden');
            if (form) form.reset();
            editingId=null;
        });
        if (form){
            form.addEventListener('submit',function(e){
                e.preventDefault();

                var name = form.element["name"].value.trim();
                if (!name){
                    alert("please enter a pet name.");
                    return;
                }
                var pets = loadPets();
                if (editingId){
                    var idx = pets.findIndex(function(p){
                        return p.id===editingId;
                    });
                    if (idx !==-1){
                        pets[idx].name = name;
                        pets[idx].species = form.element["species"].value;
                        pets[idx].breed = form.element["breed"].value.trim();
                        pets[idx].age = form.element["age"].value.trim();
                        pets[idx].notes = form.element["notes"].value.trim();
                    }
                    showToast(name+" 's profile has been updated.");
                }else{
                    pets.push({
                        id : "pets_ " + Date.now(),
                        name : name,
                        species : form.element["species"].value,
                        breed : form.element["breed"].value.trim(),
                        age : form.element["age"].value.trim(),
                        notes : form.element["notes"].value.trim()

                    });
                    showToast(name+"added");
                }
                savePets(pets);
                form.reset();
                editingId=null;
                if (formBox) formBox.classList.add('is-hidden');
                showPets();
            });
        }
        window.editPet=function(id){
            var pet = loadPets().find(function(p){
                return p.id===id
            });
            if (!pet || form) return ;
            editingId=id;
            form.element["name"].value = pet.name;
            form.element["species"].value = pet.species;
            form.element["breed"].value = pet.breed;
            form.element["age"].value = pet.age;
            form.element["notes"].value = pet.notes;
            if (formBox) formBox.classList.remove('is-hidden');
        };
        window.deletePet = function(id){
            if (!confirm("Remove this pet?")) return;
            var pets = loadPets().filter(function(p){
                return p.id==id;
            });
            savePets(pets);
            showPets();
            showToast("Pet removed");
        }
        showToast();
    }
}