window.addEventListener('load', () => {
    // This script will only be injected on open.spotify.com

    // Inject the new <li> element into the context menu on Spotify
    const newElement = document.createElement('li');
    newElement.setAttribute('role', 'presentation');
    newElement.classList.add('rQ6LXqVlEOGZdGIG0LgP');

    newElement.innerHTML = `
        <button class="mWj8N7D_OlsbDgtQx5GW" aria-disabled="false" role="menuitem" tabindex="-1">
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 bmPLlI">
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
            </svg>
            <span dir="auto" class="Type__TypeElement-sc-goli3j-0 dOtTDl ellipsis-one-line htqz7Vb8mLJvGKTi1vrs">Download</span>
        </button>
    `;

    // Add click event listener for the download button
    newElement.querySelector('button').addEventListener('click', () => {
        // Send a message to the background script to start the download
        chrome.runtime.sendMessage({ action: "startDownload" });
    });

    // Locate the context menu and append the new <li> element
    const interval = setInterval(() => {
        const menu = document.querySelector('#context-menu ul[role="menu"]');
        if (menu) {
            menu.appendChild(newElement);
            clearInterval(interval);  // Stop checking once we have added the element
        }
    }, 1000);
});
