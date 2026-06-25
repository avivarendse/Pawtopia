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
// Contact form

function setupContactForm(){
    var messageField = document.getElementById("contact-form");
    if (!form) return;

    var messageField = document.getElementById("contact-message");
    var counter = document.getElementById("contact=message-count");
    if (messageField && counter){
        messageField.addEventListener("input",function(){
            var left = 1000- messageField.value.length;
            counter.textContent=left+"charecters remaining";
        });
    }
    form.addEventListener("submit",function(e){
        e.preventDefault();
        var valid =true;

        form.querySelectorAll(".field-error").forEach(function(el){el.remove();});
        form.querySelector(".is-invalid").forEach(function(el){el.classList.remove();});

        function showError(field,message){
            field.classList.add("is-invalid");
            var err = document.createElement("span")
            err.className="field-error";
            err.textContent=message;
            field.parentNode.appendChild(err);
            valid=false;
        }
        var nameField = document.getElementById("contact-name");
        if (nameField && nameField.value.trim().length<2){
            showError(nameField,"Please enter your name (at least 2 charecters)");
        }
        var emailField = document.getElementById("contact-email");
        if (emailField){
             var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailField.value.trim());
        }
        var msgField = document.getElementById("contact-message");
        if (msgField && msgField.value.trim().length<10){
            showError(msgField,"message must be at least 10 charecters.");
        }
        if (!valid)
            var submitBtn=form.querySelector("[type='submit']");
        submitBtn.disabled=true;
        submitBtn.textContent="sending...";

        setTimeout(function(){
            form.reset();
            showToast("message sent! We will get back to you within 24 hours" );
            submitBtn.disabled=false;
            submitBtn.textContent="send message";

            var successMsg=document.getElementById("contact-success");
            if (successMsg) successMsg.classList.remove("is-hidden");
        },900);
    });
}
//service booking

var SERVICES = [
    {id : "grooming",name:"Grooming",price:"350"},
    {id: "boarding",name:"Boarding",price:"250"},
    {id:"daycare",name:"Daycare",price:"180"},
    {id : "walking",name:"Dog walking",price:"150"},
    {id: "vet",name:"Vet Check",price:"1120"},
    {id: "training",name:"Training",price:"500"}
];

function setupBooking(){
    var modal = document.getElementById("booking-modal");
    var closeBtn = document.getElementById("booking-modal-close");
    var form = document.getElementById("booking-form");

    if (!modal) return;

    document.addEventListener('click',function(e){
        var btn =e.target.closest("[data-service-id]");
        if (!btn) return;
        var svc=SERVICES.find(function(s){
            return s.id===btn.dataset.serviceId;
        });
        if (!svc) return;

        document.getElementById("booking-modal-title") && (document.getElementById("booking-modal-title").textContent="Book"+svc.name);
        document.getElementById("booking-modal-price") && (document.getElementById("booking-modal-price").textContent="R"+svc.price+" per session");
        document.getElementById("booking-modal-id") && (document.getElementById("booking-modal-id").value=svc.id);

        modal.removeAttribute("hiden");
    });
    function closeModal(){
        modal.setAttribute("hidden","");
        if (form)
            form.reset();
    }
    if (closeBtn)
        closeBtn.addEventListener('click',closeModal);
    modal.addEventListener('click',function(e){
        if (e.target===modal)
            closeModal();
    });
    document.addEventListener("keydown",function(e){
        if (e.key==="Escape")
            closeModal();
    });
    if (form){
        form.addEventListener("submit",function(e){
            e.preventDefault();

            var petName = form.element["booking-pet-name"] && form.element["booking-pet-name"].value.trim();
        })
    }
}
//Payment form
function setupPayment(){
    var form = document.getElementById("payment-form");
    var cardNumber = document.getElementById("card-number");
    var cardExpiry  = document.getElementById("card-expiry");
    var cardCvv = document.getElementById("card-cvv");
    if (!form) return;

    if (cardNumber){
        cardNumber.addEventListener("input",function(){
            var digits = cardNumber.value.replace(/\D/g,"").slice(0,16);
            cardNumber.value = digits.match(/.{1,4}/g)? digits.match(/.{1,4}/g).join(" "):digits;
        });
    }
    if (cardExpiry){
        cardExpiry.addEventListener("input",function(){
            var digits = cardExpiry.value.replace(/\D/g,"").slice(0,4);
            if (digits.length>=3){
                cardExpiry.value = digits.slice(0,2) + "/" + digits.slice(2);
            }else{
                cardExpiry.value = digits;
            }
        });
    }
    if (cardCvv){
        cardCvv.addEventListener("input",function(){
            cardCvv.value=cardCvv.value.replace(/\D/g,"").slice(0,4);
        });
    }
    form.addEventListener("submit",function(e){
        e.preventDefault();

        var number = (cardNumber&&cardNumber.value.replace(/\s/g,""))||"";
        var expiry = (cardExpiry && cardExpiry.value) || "";
        var cvv = (cardCvv && cardCvv.value) ||"";
        var errors=[];

        if (!/^\d{13,19}$/.test(number))   errors.push("Enter a valid card number.");
        if (!/^\d{2}\/\d{2}$/.test(expiry)) errors.push("Expiry must be MM/YY.");
        if (!/^\d{3,4}$/.test(cvv))         errors.push("Enter a 3 or 4 digit CVV.");
         if (!errors.length){
            var digits = number.split("").reverse().map(Number);
            var sum = digits.reduce(function(total,digit,index){
                if (index % 2!==0){ digit*=2;
                    if (digit>9)
                        digit-=9;
                }
                return total + digit;
            },0);
            if (sum % 10 !==0) errors.push("Card number is not valid.")
         }
        if (errors.length){
            alert(errors.join("\n"));
            return;
        }

        var btn = form.querySelector("[type='submit']");
        btn.disabled = true;
        btn.textContent="Processing..."

        setTimeout(function(){
            var amount = form.dataset.amount ? "R" + parseFloat(form.dataset.amount).toFixed: "payment";
            form.reset();
            btn.disabled = false;
            btn.textContent="pay now."
            addFeedItem("Payment confirmed: " + amount  + ". card eding " + number.slice(-4));
            showToast("Payment Succesful!");
        },1200);

    });
}

//Home page
function  setupHome(){
    document.querySelectorAll("[data-count]").forEach(function(el){
        var target = parseInt(el.dataset.count,10);
        var started = false;

        var observer = new IntersectionObserver(function(entries){
            if (!entries[0].isIntersecting || started) return;
            started = true;
            observer.disconnect();

            var start = null;
            var duration = 1400;

            function step(timestamp){
                if(!start) start = timestamp;
                var progress = Math.round(progress*target).toLocaleString();
                if (progress<1) requestAnimationFrame(step);

            }
            requestAnimationFrame(step);
        },{threshold:0.5});
        observer.observe(el);
    });
    document.querySelectorAll("[data-reveal]").forEach(function(el){
        var observer = new IntersectionObserver(function (entries){
            if (entries[0].isIntersecting){
                el.classList.add("is-revealed");
                observer.disconnect();
            }
        },{threshold: 0.15});
        observer.observe(el);
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
    
}

// About page
function setupAboutTabs() {
  var tabList = document.querySelector('[role="tablist"]');
  if (!tabList) return;
 
  var tabs   = Array.from(tabList.querySelectorAll('[role="tab"]'));
  var panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
 
  function showTab(tab) {
    
    tabs.forEach(function (t)   { t.setAttribute("aria-selected", "false"); });
    panels.forEach(function (p) { p.setAttribute("hidden", ""); });
 
    
    tab.setAttribute("aria-selected", "true");
    var panel = document.getElementById(tab.getAttribute("aria-controls"));
    if (panel) panel.removeAttribute("hidden");
  }
 
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { showTab(tab); });
  });
 
  if (tabs.length) showTab(tabs[0]); 
}

function showToast(message) {
  var old = document.getElementById("pawcare-toast");
  if (old) old.remove();
 
  var toast       = document.createElement("div");
  toast.id        = "pawcare-toast";
  toast.className = "pawcare-toast";
  toast.textContent = message;
  document.body.appendChild(toast);
 
  
  setTimeout(function () { toast.classList.add("is-visible"); }, 10);
 

  setTimeout(function () {
    toast.classList.remove("is-visible");
    setTimeout(function () { toast.remove(); }, 400);
  }, 3500);
}

document.addEventListener("DOMContentLoaded", function () {
//
  setupNavigation();
  setupPetProfiles();
  setupContactForm();
  setupBooking();
  setupPayment();
  //
  setupHomePage();
  setupAboutTabs();
});
 
// PET PERSONA SWITCHER

// 1. Grab our elements from the HTML
const btnDog = document.getElementById('btn-dog');
const btnCat = document.getElementById('btn-cat');
const heroImage = document.getElementById('hero-image');
const heroText = document.getElementById('hero-text');

// 2. Define what changes for dogs
btnDog.addEventListener('click', () => {
  btnDog.classList.add('active');
  btnCat.classList.remove('active');
  
  // Change image and text for dogs
  heroImage.src = 'images/78320481007905843.jpg'; // 
  heroText.textContent = 'Professional, loving daycare for dogs. Tail-wagging playtime, belly rubs, grooming, and cozy boarding.';
});

// 3. Define what changes for cats
btnCat.addEventListener('click', () => {
  btnCat.classList.add('active');
  btnDog.classList.remove('active');
  
  // Change image and text for cats
  heroImage.src = 'images/When you finally meet your twin and neither of you….jpg'; 
  heroText.textContent = 'Premier, peaceful luxury care for cats. Scratching posts, catnip playtime, premium grooming, and quiet suites.';
});


// PAW-PRINT TRAIL ANIMATION

// Listen for mouse movement anywhere on the screen
window.addEventListener('mousemove', (e) => {
  // Limit how many paws generate so the screen doesn't lag (1 in 8 chance per movement)
  if (Math.random() > 0.15) return;

  // Create a temporary paw element
  const paw = document.createElement('span');
  paw.classList.add('paw-trail');
  paw.textContent = '🐾';

  // Position it exactly where the cursor is
  paw.style.left = e.pageX + 'px';
  paw.style.top = e.pageY + 'px';

  // Add it to the website
  document.body.appendChild(paw);

  // Automatically delete it after 1 second when the animation ends
  setTimeout(() => {
    paw.remove();
  }, 1000);
});
