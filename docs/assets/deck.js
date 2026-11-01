// @ts-check
/** @type {HTMLElement} Container that holds every card. */
const deck = document.querySelector("#page-deck");

/** @type {HTMLElement[]} All cards, in document order. */
const slides = [...deck.querySelectorAll(".page-slide")];

/** @type {HTMLElement} Text that shows the position of the front card. */
const counter = document.querySelector("#page-counter");

/** @type {HTMLElement} Bar that holds the counter and the help button. */
const controls = document.querySelector("#page-deck-controls");

/** @type {number} Index of the card in the center. */
let current = 0;

/** @type {number | undefined} Timer that reveals the help button after a quiet period. */
let idleTimer;

/** @type {number | undefined} Timer that ends the wheel lock. */
let wheelUnlockTimer;

/** @type {boolean} True while a wheel gesture is ignored, so one gesture moves one card. */
let wheelLocked = false;

/**
 * Hide the help button and start the quiet timer again.
 * The button appears after seven seconds without any input.
 * @returns {void}
 */
function resetIdleHint() {
    controls.dataset.idle = "false";
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        controls.dataset.idle = "true";
    }, 7000);
}

/**
 * Move a card to the center and arrange the other cards around it.
 * The index wraps around, so the cards form a loop.
 * @param {number} index Index of the card to bring forward.
 * @param {boolean} [updateHash=true] Whether to write the card id into the address bar.
 * @returns {void}
 */
function showSlide(index, updateHash = true) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
        const offset = (slideIndex - current + slides.length) % slides.length;
        const position = ["active", "next", "next-2", "previous-2", "previous"][offset] ?? "hidden";
        const isActive = slideIndex === current;
        slide.dataset.position = position;
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.inert = position === "hidden";
    });
    counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    if (updateHash) history.replaceState(null, "", `#${slides[current].id}`);
}

// A click or focus on a card behind the front one brings it to the center.
slides.forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
        if (index === current) return;
        event.preventDefault();
        resetIdleHint();
        showSlide(index);
    });
    slide.addEventListener("focus", () => {
        if (index !== current) showSlide(index);
    }, true);
});

// In-page links open the matching card instead of scrolling.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href").slice(1);
        const targetIndex = slides.findIndex((slide) => slide.id === targetId);
        if (targetIndex < 0) return;
        event.preventDefault();
        resetIdleHint();
        showSlide(targetIndex);
    });
});
/**
 * Wheel input moves between cards.
 * A tall front card scrolls first, and only then does the wheel change cards.
 * @param {WheelEvent} event
 */
deck.addEventListener("wheel", (event) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 20) return;
    resetIdleHint();
    const activeSlide = slides[current];
    const canScrollSlide = activeSlide.scrollHeight > activeSlide.clientHeight
        && (delta > 0
            ? activeSlide.scrollTop + activeSlide.clientHeight < activeSlide.scrollHeight
            : activeSlide.scrollTop > 0);
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) && canScrollSlide) return;
    event.preventDefault();
    if (wheelLocked) return;
    wheelLocked = true;
    showSlide(current + (delta > 0 ? 1 : -1));
    clearTimeout(wheelUnlockTimer);
    wheelUnlockTimer = setTimeout(() => {
        wheelLocked = false;
    }, 700);
}, { passive: false });
/**
 * The left and right arrow keys move one card back or forward.
 * @param {KeyboardEvent} event
 */
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(current - 1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(current + 1);
    }
});
/**
 * Any key except Tab counts as input and resets the quiet timer.
 * @param {KeyboardEvent} event
 */
document.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") resetIdleHint();
});

// Start on the card named by the address bar, or on the first card.
const initialSlide = slides.findIndex((slide) => slide.id === decodeURIComponent(location.hash.slice(1)));
showSlide(initialSlide < 0 ? 0 : initialSlide, false);
resetIdleHint();
