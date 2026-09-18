// ======================================================
// SAKE SAKEER A - PORTFOLIO JAVASCRIPT
// AWS CLOUD & DEVOPS PORTFOLIO
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // SMOOTH NAVIGATION
    // ==================================================

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // ==================================================
    // SCROLL REVEAL
    // ==================================================

    const revealElements = document.querySelectorAll(
        ".about-text, " +
        ".skill-card, " +
        ".project-card, " +
        ".experience-card, " +
        ".contact-section"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal", "active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    // ==================================================
    // ACTIVE NAVIGATION
    // ==================================================

    const sections = document.querySelectorAll("section[id]");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.25
        }
    );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    // ==================================================
    // CARD MOUSE GLOW
    // ==================================================

    const cards = document.querySelectorAll(
        ".skill-card, .project-card"
    );

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

        });

    });


    // ==================================================
    // FOOTER YEAR
    // ==================================================

    const footerText = document.querySelector("footer p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} Sake Sakeer A. AWS Cloud & DevOps Portfolio.`;

    }

});