// Function to toggle the dropdown visibility
function toggleDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.classList.toggle("show");

    // Toggle active class on dropbtn for styling
    const dropbtn = document.querySelector('.navbar .dropdown .dropbtn');
    dropbtn.classList.toggle('active');

    // Prevent event from bubbling up to window.onclick immediately
    event.stopPropagation();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    // Check if the click target is NOT the dropdown button or its arrow
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn span')) {
        // Get all dropdown content elements
        const dropdowns = document.getElementsByClassName("dropdown-content");
        
        // Loop through them and close any that are open
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                // Remove active class from the corresponding dropbtn
                document.querySelector('.navbar .dropdown .dropbtn').classList.remove('active');
            }
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    // Selecionar todos os links que começam com #
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Evita o comportamento padrão
            e.preventDefault();

            // Obtém o destino da âncora
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const yOffset = -80; // Ajusta se quiser compensar a navbar fixa
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// New functionality for video switching
function switchVideoBasedOnScreenSize() {
    const videoElement = document.getElementById('video-background');
    const desktopSource = document.getElementById('desktop-video-source');
    const mobileSource = document.getElementById('mobile-video-source');
    const mobileVideoSrc = mobileSource.getAttribute('data-src'); // Get the src from data-src

    // Define the breakpoint for mobile (e.g., 768px, matching your CSS media queries)
    const mobileBreakpoint = 768; // Adjust this value if your mobile breakpoint is different

    if (window.innerWidth <= mobileBreakpoint) {
        // If in mobile mode, ensure mobile video is loaded
        if (videoElement.src !== mobileVideoSrc) {
            videoElement.src = mobileVideoSrc;
            videoElement.load(); // Reload the video to apply the new source
            videoElement.play(); // Play the video
        }
        desktopSource.setAttribute('media', 'none'); // Disable desktop video source
        mobileSource.removeAttribute('media'); // Enable mobile video source
    } else {
        // If in desktop mode, ensure desktop video is loaded
        if (videoElement.src !== desktopSource.src) {
            videoElement.src = desktopSource.src;
            videoElement.load(); // Reload the video to apply the new source
            videoElement.play(); // Play the video
        }
        desktopSource.removeAttribute('media'); // Enable desktop video source
        mobileSource.setAttribute('media', 'none'); // Disable mobile video source
    }
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', switchVideoBasedOnScreenSize);

// Call the function on window resize
window.addEventListener('resize', switchVideoBasedOnScreenSize);