import _ from "lodash";
import { apiUrls, endpoints } from "./configPanel/config.endpoints";
import { namedRoutes } from "./configPanel/config.namedRoutes";
import { userInterface } from "./configPanel/config.userInterface";
import {
    pageStyle,
    style,
    appLogoStyle,
    boxStyle
} from "./configPanel/config.loginpage";
import {
    colors,
    appStyle,
    buttonStyle,
    secondaryButtonStyle,
    headerStyle,
    textStyle,
    textInputStyle,
    navbarStyle,
    footerStyle
} from "./configPanel/config.design";

let fonts = _.union(
    ["icomoon"]
);

export const AppConfig = {
    language: "en",
    googleAPIkey: "", // My key: AIzaSyBQdIL2W7U0c49P-Zrqo0yhFyZ4XpFWCSg . Okay to use for testing, not for client deployments
    secretKey: "p20o20e13",
    axiosEnabled: true, // if false, then please set change request headers on each request in devise_token_auth.rb file as it won't work.
    clientApp: userInterface.clientApp,
    authentication: userInterface.authentication,
    registration: userInterface.registration,
    languageSelection: userInterface.languageSelection,
    searchEnabled: userInterface.searchEnabled,
    ttsEnabled: userInterface.ttsEnabled,
    startOnHome: userInterface.startOnHome,
    ilt: userInterface.ilt,
    social: userInterface.social,
    completionThreshold: 80,
    isMobile: window.isCordova ? window.isCordova : false,
    apiUrls: apiUrls,
    endpoints: endpoints,
    auth: {
        routes: namedRoutes,
        maxSessions: 100,
        omniauth: []
    },
    notifications: {
        notificationFetchTimeGap: 0, //In Minutes
        notificatioCountFetchTimeGap: 0 //In Minutes
    },
    fonts: {
        custom: {
            families: fonts,
            urls: _.map(fonts.slice(0, -1), function(elm, index) {
                return "assets/fonts/" + elm + ".css";
            })
        }
    },
    colors: colors,
    appStyle: {
        ...appStyle,
        fontFamily: [fonts[1], fonts[3]]
    },
    buttonStyle: {
        ...buttonStyle,
        fontFamily: [fonts[2], fonts[3]]
    },
    secondaryButtonStyle: secondaryButtonStyle,
    headerStyle: {
        ...headerStyle,
        fontFamily: [fonts[2], fonts[3]]
    },
    textStyle: {
        ...textStyle,
        fontFamily: [fonts[1], fonts[3]]
    },
    textInputStyle: textInputStyle,
    navbar: {
        logoAlign: navbarStyle.logoAlign,
        icons: navbarStyle.logoAlign === "left" ? "right" : "left",
        height: userInterface.subNavBar ? 90 : 60,
        landscapeActive: navbarStyle.landscapeActive,
        hasSubNavBar: userInterface.subNavBar,
        sublogoAlign: navbarStyle.sublogoAlign,
        sublogoText: navbarStyle.sublogoText,
        avatar: navbarStyle.avatar
    },
    footer: {
        isThere: userInterface.footer.isThere,
        text: userInterface.footer.text,
        hasLogo: userInterface.footer.hasLogo,
        logoAlign: footerStyle.logoAlign
    },
    pageStyle: {
        ...pageStyle
    },
    style: {
        ...style
    },
    appLogoStyle: {
        ...appLogoStyle
    },
    boxStyle: {
        ...boxStyle
    }
};
// export { AppConfig };
