const botPromise = import('https://openfpcdn.io/botd/v1').then((Botd) =>
    Botd.load()
);
// Get the bot detection result when you need it.

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
botPromise
    .then((bot) => {
        bot.detect()
        console.log(bot)

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
        jsonData.process = bot.components.process.value;
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
        jsonData.bot = jsonData.bot.bot

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