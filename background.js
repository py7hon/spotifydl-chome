chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startDownload") {
        // Get the active tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0 || !tabs[0].url) {
                console.error("No active tab or URL found. Tab details:", tabs);
                
                // Log the tab object properties for easier debugging
                if (tabs.length > 0) {
                    console.log("Tab properties: ", {
                        id: tabs[0].id,
                        status: tabs[0].status,
                        url: tabs[0].url, // This should now have a value
                        title: tabs[0].title
                    });
                }
                return;
            }

            const currentTab = tabs[0];
            const spotifyUrl = currentTab.url;

            // Log the current URL to check if it's correct
            console.log("Current tab URL:", spotifyUrl);

            // Check if the URL is a valid Spotify track URL
            if (spotifyUrl.startsWith("https://open.spotify.com/track/")) {
                console.log("Valid Spotify track URL:", spotifyUrl);

                // Call the API with the current Spotify track URL
                fetch(`https://spodl.sazumi.moe/dl?url=${encodeURIComponent(spotifyUrl)}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log("API response:", data);

                        if (data.metadata && data.metadata.success) {
                            const downloadUrl = `https://spodl.sazumi.moe${data.downloadLink}`;
                            const filename = data.fileName;

                            // Log the download URL and filename
                            console.log("Download URL:", downloadUrl);
                            console.log("Filename:", filename);

                            // Trigger the download
                            chrome.downloads.download({
                                url: downloadUrl,
                                filename: filename
                            }, (downloadId) => {
                                if (chrome.runtime.lastError) {
                                    console.error("Download error:", chrome.runtime.lastError);
                                } else {
                                    console.log("Download started, ID:", downloadId);
                                }
                            });
                        } else {
                            console.error("API did not return a valid response:", data);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching download URL:", error);
                    });
            } else {
                console.error("Not a valid Spotify track URL:", spotifyUrl);
            }
        });
    }
});
