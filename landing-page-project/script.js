window.addEventListener('scroll', function() {
    // Select the header element
    const header = document.getElementById('main-header');
    
    // Check the scroll position
    // If window's vertical scroll is greater than 50px, add the 'scrolled' class.
    // Otherwise, remove it.
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});