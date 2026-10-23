
document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ========================================
       1. Smooth navigation
    ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            let target;

            try {
                target = document.querySelector(href);
            } catch {
                return;
            }

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            if (window.location.hash !== href) {
                history.replaceState(null, "", href);
            }
        });
    });

    /* ========================================
       2. Scroll reveal
       Use one reveal system only
    ======================================== */
    const revealSelectors = [
        ".about-text",
        ".skill-card",
        ".project-card",
        ".experience-card",
        ".contact-section",
        ".certification-card",
        ".certificate-card"
    ];

    const revealElements = document.querySelectorAll(
        revealSelectors.join(", ")
    );

    // Remove old reveal classes to avoid conflicts.
    revealElements.forEach((element) => {
        element.classList.remove("reveal", "active");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("js-reveal", "is-visible");
        });
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("js-reveal");
            revealObserver.observe(element);
        });
    }

    /* ========================================
       3. Active navigation link
    ======================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${sectionId}`;

                        link.classList.toggle("active", isActive);

                        if (isActive) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    /* ========================================
       4. Mouse glow for cards
    ======================================== */
    const glowCards = document.querySelectorAll(
        ".skill-card, .project-card"
    );

    const canHover =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (canHover) {
        glowCards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
            });
        });
    }

    /* ========================================
       5. Automatic footer year
    ======================================== */
    const footerYear = document.querySelector("[data-year]");

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    } else {
        const footerText = document.querySelector("footer p");

        if (footerText) {
            footerText.textContent = footerText.textContent.replace(
                /\b(?:©\s*)?20\d{2}\b/,
                String(new Date().getFullYear())
            );
        }
    }
});
