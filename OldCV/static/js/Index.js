//Handling the animation of navigation bar elements
window.addEventListener('load', () => {
    if (window.innerWidth <= 992) {
        document.body.classList.remove('loading');
    } else {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 2400)
    }
});

//Using observer to add specific classes to the nav bar if it is not in the view when scrolling aka intersecting.
document.addEventListener("DOMContentLoaded", () => {
    const targetDiv = document.querySelector("#topHeader");
    const navbar = document.querySelector("#navbar");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    navbar.classList.add("bg-dark", "bg-gradient", "bg-gradient", "bg-opacity-75", "rounded");
                } else {
                    navbar.classList.remove("bg-dark", "bg-gradient", "bg-gradient", "bg-opacity-75", "rounded");
                }
            });
        },
        {
            root: null,
            threshold: 0,
        }
    );
    observer.observe(targetDiv);
});

(function () {
    emailjs.init({
        publicKey: "W-80eOT153ZyvEuYF",
    });
})();

window.onload = function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        emailjs.sendForm('service_y2to2bx', 'template_uo2rc1a', this)
            .then(() => {
                alert('Your message was sent successfully!');
                const submitButton = document.querySelector('button[type="submit"]');
                submitButton.textContent = 'Success';
                submitButton.style.backgroundColor = 'green';
                this.reset();
            }, (error) => {
                alert('There was an error sending your message. Please try again.');
                const submitButton = document.querySelector('button[type="submit"]');
                submitButton.textContent = 'Try Again';
                submitButton.style.backgroundColor = 'red';
            });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSelector = this.getAttribute('data-target');
            const targetElement = targetSelector === 'body' ? document.documentElement : document.querySelector(targetSelector);

            if (targetSelector) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error(`Target element not found: ${targetSelector}`);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('1').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
