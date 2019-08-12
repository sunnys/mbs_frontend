import _ from "lodash";
import { getAppConfig } from "config/client.config";

export const portraitLock = () => {
    if (getAppConfig().isMobile) {
        // let locOrientation =
        //   window.screen.lockOrientation ||
        //   window.screen.mozLockOrientation ||
        //   window.screen.msLockOrientation ||
        //   window.screen.orientation.lock;
        // locOrientation("portrait");
    }
};

export const resolveImage = (srcImg, imgLibrary) => {
    if (
        srcImg === undefined ||
        srcImg === null ||
        srcImg === "" ||
        srcImg === " "
    )
        return getAppConfig().apiUrls.assetLib + "/images/configurable/missing.jpg";
    else {
        let img = Array.isArray(srcImg)
            ? srcImg[0]
            : typeof srcImg === "object"
                ? srcImg["image"]
                : srcImg;
        let libraryImg = _.find(imgLibrary, { id: img });

        return img.indexOf("data:") !== -1 ||
            img.indexOf("assets/images/") !== -1
            ? img
            : img.indexOf(".jpg") !== -1 ||
              img.indexOf(".JPG") !== -1 ||
              img.indexOf(".jpeg") !== -1 ||
              img.indexOf(".JPEG") !== -1 ||
              img.indexOf(".gif") !== -1 ||
              img.indexOf(".GIF") !== -1 ||
              img.indexOf(".png") !== -1 ||
              img.indexOf(".PNG") !== -1 ||
              img.indexOf(".svg") !== -1
                ? getAppConfig().apiUrls.assetUrl + img
                : libraryImg !== undefined
                    ? libraryImg.image
                    : getAppConfig().apiUrls.assetLib + "/images/defaults/loading.gif";
    }
};

export const includeScript = (path, cb) => {
    var node = document.createElement("script"),
        okHandler,
        errHandler;
    node.src = path;
    okHandler = function() {
        this.removeEventListener("load", okHandler);
        this.removeEventListener("error", errHandler);
        cb();
    };
    errHandler = function(error) {
        this.removeEventListener("load", okHandler);
        this.removeEventListener("error", errHandler);
        cb("Error loading script: " + path);
    };
    node.addEventListener("load", okHandler);
    node.addEventListener("error", errHandler);
    document.body.appendChild(node);
};

