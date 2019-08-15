// Import from NPM
// -------------------------------------
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Image, Icon } from "semantic-ui-react";
import { hashHistory } from "react-router";

// Import Actions and Helpers
// -------------------------------------
import AnalyticsAction from "./redux/Analytics.action.react";
import { Loading } from "globals/Loading.react";

// Import from Config
// -------------------------------------
import { getAppConfig } from "config/client.config";

// Import Components
// -------------------------------------
import Analytics from "./pages/Analytics.react";

/**
 * The AnalyticsContainer is the top level component connected to the redux store.
 */
export class AnalyticsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userCollege: "",
            userDesc: "",
            userData: {},
            fetchComplete: false
        };
    }

    componentDidMount() {
        if (this.props.params.id === "0")
            this.setState({
                username: _.find(this.props.questions, { questionId: "A1" })
                    .response,
                userCollege: _.find(this.props.questions, {
                    questionId: "A2"
                }).response,
                userDesc: _.find(this.props.questions, { questionId: "A3" })
                    .response,
                fetchComplete: true
            });
        else
            this.props.actions.getUserData(this.props.params.id).then(data => {
                this.setState({
                    userData: data,
                    username: data.user.name,
                    userCollege: data.user.email,
                    userDesc: data.user.nickname,
                    fetchComplete: true
                });
            });
    }

    downloadReportPage = name => {
        this.setState({ syncing: true }, () => {
            let reportPageView = document.querySelector(".reportPage");
            html2canvas(reportPageView, { useCORS: true }).then(canvas => {
                let imgData = canvas.toDataURL("image/png");
                var pdf = new jsPDF("p", "mm", "a4", true);
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, "PNG", 0, 0, width, height, "", "SLOW");
                pdf.save((name + ".pdf").replace(/ /g, "_").toLowerCase());
                this.setState({ syncing: false });
            });
        });
    };

    nameToHex = name => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        let hexColor = "#";
        for (let i = 0; i < 3; i++) {
            let value = (hash >> (i * 8)) & 0xff;
            hexColor += ("00" + value.toString(16)).substr(-2);
        }
        return hexColor;
    };

    fixColor = name => {
        let hexColor = this.nameToHex(name);
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        let color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
        if (color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 186) {
            var R = parseInt(hexColor.substring(1, 3), 16);
            var G = parseInt(hexColor.substring(3, 5), 16);
            var B = parseInt(hexColor.substring(5, 7), 16);

            R = parseInt((R * 60) / 100, 0);
            G = parseInt((G * 60) / 100, 0);
            B = parseInt((B * 60) / 100, 0);

            R = R < 255 ? R : 255;
            G = G < 255 ? G : 255;
            B = B < 255 ? B : 255;

            var RR =
                R.toString(16).length === 1
                    ? "0" + R.toString(16)
                    : R.toString(16);
            var GG =
                G.toString(16).length === 1
                    ? "0" + G.toString(16)
                    : G.toString(16);
            var BB =
                B.toString(16).length === 1
                    ? "0" + B.toString(16)
                    : B.toString(16);

            return "#" + RR + GG + BB;
        } else {
            return hexColor;
        }
    };

    getAvatar = (name, size) => {
        return (
            <svg height={size} width={size}>
                <rect
                    fill={this.fixColor(name)}
                    x="0"
                    y="0"
                    height={size}
                    width={size}
                />
                <text
                    fill={"#ffffff"}
                    fontSize={size / 2}
                    textAnchor="middle"
                    x={size * 0.5}
                    y={size * 0.67}
                >
                    {_.upperCase(name.split(" ")[0][0])}
                    {_.upperCase(
                        name.split(" ").length === 1
                            ? _.upperCase(name.split(" ")[0][1])
                            : name.split(" ")[1][0]
                    )}
                </text>
            </svg>
        );
    };

    goBack = () => hashHistory.push("/analytics");

    render() {
        let isPortrait = window.innerHeight > window.innerWidth;
        let mainPanel = {
            width: isPortrait ? "calc(100% - 50px)" : "calc(100%)",
            height: "100%",
            marginLeft: isPortrait ? "50px" : "auto",
            paddingTop: "8px"
        };

        let pageStyle = {
            container: {
                position: "relative",
                width: "800px",
                height: "1100px",
                margin: "20px auto",
                background: "#f5f5f5",
                boxShadow: "1px 1px 1px 1px #ccc"
            },
            tabber: {
                position: "absolute",
                left: "0",
                top: "10px",
                transformOrigin: "0px 0px",
                transform: "rotate(90deg)"
            },
            bannerSection: {
                width: "100%",
                height: "0",
                paddingBottom: "12.5%",
                position: "relative"
            }
        };
        let bannerStyle = {
            image: {
                width: "100%"
            },
            overlay: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "0",
                paddingBottom: "12.5%",
                background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)",
                opacity: "0.5"
            },
            profileImage: {
                position: "absolute",
                left: "40px",
                bottom: "-100px",
                width: "160px",
                height: "160px",
                background: "#ffffff",
                boxShadow: "1px 1px 1px 1px #666666"
            },
            profileName: {
                position: "absolute",
                left: "220px",
                bottom: "-100px",
                zIndex: "9999",
                width: "400px"
            },
            userName: {
                padding: 0,
                margin: 0
            },
            pageTitle: {
                position: "absolute",
                right: "15%",
                top: "28%",
                transform: "translate(0,-50%)",
                color: "#ffffff",
                lineHeight: "0.9",
                textAlign: "right"
            },
            actionMenu: {
                position: "absolute",
                right: "40px",
                bottom: "-80px",
                zIndex: "9999"
            },
            logo: {
                width: "25%",
                height: "100%",
                background: "#454545",
                position: "absolute",
                top: "0",
                right: "0"
            },
            logoImage: {
                width: "80%",
                margin: "10%"
            }
        };

        if (!this.state.fetchComplete) return <Loading />;
        else
            return (
                <div className="full-height isRelative">
                    <div style={mainPanel}>
                        <div style={pageStyle.container} className="reportPage">
                            <div style={pageStyle.bannerSection}>
                                <Image
                                    src={
                                        "assets/images/reportBanners/" +
                                        this.nameToHex(this.state.username)[1] +
                                        ".jpg"
                                    }
                                    style={bannerStyle.image}
                                />
                                <div style={bannerStyle.overlay} />
                                <div style={bannerStyle.profileImage}>
                                    {this.getAvatar(this.state.username, 160)}
                                </div>
                                <div style={bannerStyle.profileName}>
                                    <h1 style={bannerStyle.userName}>
                                        {this.state.username}
                                    </h1>
                                    <h3 style={bannerStyle.userName}>
                                        {this.state.userCollege}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize:
                                                this.state.userDesc.length > 30
                                                    ? "0.8em"
                                                    : "1em"
                                        }}
                                    >
                                        {this.state.userDesc}
                                    </p>
                                </div>
                                {!this.state.syncing && (
                                    <div style={bannerStyle.actionMenu}>
                                        <Icon
                                            link
                                            circular
                                            inverted
                                            name={"chevron left"}
                                            size="big"
                                            onClick={this.goBack}
                                        />
                                        <Icon
                                            link
                                            circular
                                            inverted
                                            name={"print"}
                                            size="big"
                                            onClick={() =>
                                                this.downloadReportPage(
                                                    "learner_analytics_" +
                                                        this.state.username.replace(
                                                            " ",
                                                            "_"
                                                        )
                                                )
                                            }
                                        />
                                    </div>
                                )}
                                <div style={bannerStyle.logo}>
                                    <Image
                                        src="assets/images/configurable/logo.png"
                                        style={bannerStyle.logoImage}
                                    />
                                </div>
                            </div>
                            <Analytics
                                {...this.props}
                                questionList={
                                    this.props.params.id === "0"
                                        ? this.props.questions
                                        : this.state.userData.user_data
                                              .questions
                                }
                                competencyMap={
                                    this.props.params.id === "0"
                                        ? this.props.simParams.competencyMap
                                        : this.state.userData.user_data
                                              .simParams.competencyMap
                                }
                                downloadReportPage={this.downloadReportPage}
                                mailReportPage={this.mailReportPage}
                                getAvatar={this.getAvatar}
                                nameToHex={this.nameToHex}
                                syncing={this.state.syncing}
                            />
                        </div>
                    </div>
                </div>
            );
    }
}

const mapStateToProps = /* istanbul ignore next - redux function */ state => {
    return {
        auth: state.auth,
        questions: state.questions,
        simParams: state.simParams,
        opsRecords: state.opsRecords
    };
};

const mapDispatchToProps = /* istanbul ignore next - redux function */ dispatch => {
    return {
        actions: {
            getUserList: () => {
                return dispatch(AnalyticsAction.getUserList());
            },
            getUserData: id => {
                return dispatch(AnalyticsAction.getUserData(id));
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalyticsContainer);
