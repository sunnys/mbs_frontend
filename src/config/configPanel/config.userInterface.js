export const userInterface = {
    clientApp: true,
    languageSelection: true,
    searchEnabled: true,
    ttsEnabled: false,
    startOnHome: true,
    subNavBar: false,
    authentication: {
        type: "email",
        label: "Email address",
        help: "Please enter your email address",
        defaultEmail: "guest@app.quodeck.com",
        defaultPassword: "P@ssw0rd"
    },
    registration: {
        allowed: false,
        subtle: false,
        restricted: false,
        allowedDomains: []
    },
    footer: {
        isThere: false,
        text: "QuoDeck Tech PLC",
        hasLogo: true
    },
    singleCourse: {
        isEnabled: false,
        id: "",
        showMenu: true
    },
    ilt: {
        enabled: false
    },
    social: {
        enabled: false
    }
};
