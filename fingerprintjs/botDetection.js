const botPromise = import('https://openfpcdn.io/botd/v1').then((Botd) =>
    Botd.load()
);


function showPopup() {
    document.getElementById("modelShowButton").click()
    document.getElementById("botFeedback").style.visibility = "hidden";
}

function updateContent() {
    document.getElementById("bot").innerText = jsonData.bot ? "You are a bot" : "You are a human";
    document.getElementById("android").innerText = jsonData.android;
    document.getElementById("appVersion").innerText = jsonData.appVersion;
    document.getElementById("browserEngineKind").innerText = jsonData.browserEngineKind;
    document.getElementById("browserKind").innerText = jsonData.browserKind;
    document.getElementById("distinctiveProps").innerText = jsonData.distinctiveProps.join(', ');
    document.getElementById("documentElementKeys").innerText = jsonData.documentElementKeys.join(', ');
    document.getElementById("documentFocus").innerText = jsonData.documentFocus;
    document.getElementById("evalLength").innerText = jsonData.evalLength;
    document.getElementById("functionBind").innerText = jsonData.functionBind;
    document.getElementById("languages").innerText = jsonData.languages.join(', ');
    document.getElementById("mimeTypesConsistent").innerText = jsonData.mimeTypesConsistent;
    document.getElementById("notificationPermissions").innerText = jsonData.notificationPermissions;
    document.getElementById("pluginsArray").innerText = jsonData.pluginsArray;
    document.getElementById("pluginsLength").innerText = jsonData.pluginsLength;
    document.getElementById("productSub").innerText = jsonData.productSub;
    document.getElementById("process").innerText = jsonData.process;
    document.getElementById("rtt").innerText = jsonData.rtt;
    document.getElementById("userAgent").innerText = jsonData.userAgent;
    document.getElementById("webDriver").innerText = jsonData.webDriver;
    document.getElementById("webGlVendor").innerText = jsonData.webGlVendor;
    document.getElementById("webGlRenderer").innerText = jsonData.webGlRenderer;
    document.getElementById("windowExternal").innerText = jsonData.windowExternal;
    document.getElementById("innerHeight").innerText = jsonData.innerHeight;
    document.getElementById("innerWidth").innerText = jsonData.innerWidth;
    document.getElementById("outerHeight").innerText = jsonData.outerHeight;
    document.getElementById("outerWidth").innerText = jsonData.outerWidth;
}

let jsonData = {
    bot: false,
    android: false,
    appVersion: "",
    browserEngineKind: "",
    browserKind: "",
    distinctiveProps: [],
    documentElementKeys: [],
    documentFocus: false,
    evalLength: 0,
    functionBind: "",
    languages: [],
    mimeTypesConsistent: false,
    notificationPermissions: false,
    pluginsArray: false,
    pluginsLength: 0,
    productSub: 0,
    process: 0,
    rtt: 0,
    userAgent: "",
    webDriver: false,
    webGlVendor: "",
    webGlRenderer: "",
    windowExternal: "",
    innerHeight: 0,
    innerWidth: 0,
    outerHeight: 0,
    outerWidth: 0
}

async function fetchGeneratorData() {
    const response = await fetch('https://raw.githubusercontent.com/apify/fingerprint-generator/master/src/data_files/fingerprint-network-definition.json')
    return response.json();
}

function performAction() {
    // Get the button and loading element
    const button = document.getElementById('actionButton');
    const loadingElement = document.getElementById('loadingElement');

    // Disable the button
    button.disabled = true;

    // Show the loading element
    loadingElement.classList.remove('hidden');

    // Simulate a time-consuming task (replace this with your actual function)
    setTimeout(() => {
        // Enable the button
        button.disabled = false;

        // Hide the loading element
        loadingElement.classList.add('hidden');
    }, 2000); // Replace 2000 with the time your function takes in milliseconds
}

function userClicked() {
    botPromise
    .then((bot) => {
        const data = fetchGeneratorData()
        
        data.then(data => {

            jsonData.android = bot.components.android.value
            jsonData.appVersion = bot.components.appVersion.value
            jsonData.browserEngineKind = bot.components.browserEngineKind.value;
            jsonData.browserKind = bot.components.browserKind.value;
            jsonData.distinctiveProps = JSON.stringify(bot.components.distinctiveProps.value).split(",");
            jsonData.documentElementKeys = bot.components.documentElementKeys.value;
            jsonData.documentFocus = bot.components.documentFocus.value;
            jsonData.evalLength = bot.components.evalLength.value;
            jsonData.functionBind = bot.components.functionBind.value;
            jsonData.languages = bot.components.languages.value;
            jsonData.mimeTypesConsistent = bot.components.mimeTypesConsistent.value;
            jsonData.notificationPermissions = bot.components.notificationPermissions.value;
            jsonData.pluginsArray = bot.components.pluginsArray.value;
            jsonData.pluginsLength = bot.components.pluginsLength.value;
            jsonData.process = 0;
            jsonData.productSub = bot.components.productSub.value;
            jsonData.rtt = bot.components.rtt.value;
            jsonData.userAgent = bot.components.userAgent.value;
            jsonData.webDriver = bot.components.webDriver.value;
            jsonData.webGlVendor = bot.components.webGL.value.vendor;
            jsonData.webGlRenderer = bot.components.webGL.value.renderer;
            jsonData.windowExternal = bot.components.windowExternal.value;
            jsonData.innerHeight = bot.components.windowSize.value.innerHeight;
            jsonData.innerWidth = bot.components.windowSize.value.innerWidth;
            jsonData.outerHeight = bot.components.windowSize.value.outerHeight;
            jsonData.outerWidth = bot.components.windowSize.value.outerWidth;
            jsonData.bot = bot.detect().bot

            updateContent();
            document.getElementById("modelShowButton").click()
            document.getElementById("botFeedback").style.visibility = "visible";

            console.log("JSON", jsonData)
            const apiEndpoint = "https://fingerprint-server-czzzoqqzqa-ey.a.run.app/api/bot-data";

            let headers;
            headers = {
                "Content-Type": "application/json",
            };

            // Make the POST request
            fetch(apiEndpoint, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(jsonData),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
                .then((data) => {
                    console.log("POST request successful!");
                    console.log("Response:", data);
                })
                .catch((error) => {
                    console.error("POST request failed:", error);
                });
        })
    })
}