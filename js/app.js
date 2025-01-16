const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * Helper Function: Check if section is in viewport
 */
const isInViewport = (section) => {
  const rect = section.getBoundingClientRect();
  return rect.top >= 0 && rect.top < window.innerHeight / 2;
};

/**
 * Main Functions
 */

// Build the navigation menu dynamically
const buildNav = () => {
  sections.forEach((section) => {
    const sectionId = section.getAttribute('id');
    const sectionName = section.getAttribute('data-nav');

    const navItem = document.createElement('li');
    navItem.innerHTML = `<a class="menu__link" href="#${sectionId}">${sectionName}</a>`;
    navbarList.appendChild(navItem);
  });
};

// Add 'active' class to the section in the viewport
const setActiveSection = () => {
  sections.forEach((section) => {
    const navLinks = document.querySelectorAll('.menu__link');
    const linkedNav = [...navLinks].find((link) => link.getAttribute('href') === `#${section.id}`);

    if (isInViewport(section)) {
      section.classList.add('your-active-class');
      if (linkedNav) linkedNav.classList.add('active-link');
    } else {
      section.classList.remove('your-active-class');
      if (linkedNav) linkedNav.classList.remove('active-link');
    }
  });
};

// Scroll to section smoothly when a navigation link is clicked
const scrollToSection = (event) => {
  event.preventDefault();
  if (event.target.tagName === 'A') {
    const targetId = event.target.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Events
 */

// Build the navigation menu
document.addEventListener('DOMContentLoaded', buildNav);

// Add event listener for scrolling to handle active section
window.addEventListener('scroll', setActiveSection);

// Add event listener for click events on the navbar
navbarList.addEventListener('click', scrollToSection);
