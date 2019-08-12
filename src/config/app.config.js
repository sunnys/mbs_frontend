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
} from "./configPanel/config.design";

let fonts = _.union(
    ["icomoon"]
);

export const AppConfig = {
    language: "en",
    secretKey: "p20o20e13",
    axiosEnabled: true, // if false, then please set change request headers on each request in devise_token_auth.rb file as it won't work.
    clientApp: userInterface.clientApp,
    authentication: userInterface.authentication,
    registration: userInterface.registration,
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
