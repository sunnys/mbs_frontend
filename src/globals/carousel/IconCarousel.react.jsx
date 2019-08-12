import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class IconCarousel extends React.Component {
    static propTypes = {
        carouselItems: PropTypes.array,
        offlineMode: PropTypes.bool,
        initialSlide: PropTypes.number,
        autoPlay: PropTypes.bool,
        arrows: PropTypes.bool,
        infinite: PropTypes.bool,
        asNavFor: PropTypes.string,
        callback: PropTypes.func,
        changeImg: PropTypes.func
    };

    static defaultProps = {
        carouselItems: [
            "assets/images/defaults/default-carousel-1.jpg",
            "assets/images/defaults/default-carousel-2.jpg",
            "assets/images/defaults/default-carousel-3.jpg"
        ],
        offlineMode: false,
        initialSlide: 0,
        autoPlay: true,
        infinite: true,
        arrows: false,
        asNavFor: null,
        callback: null,
        changeImg: null
    };

    handleCallback = index => {
        if (this.props.callback) this.props.callback(index);
    };

    handleClick = index => {
        if (this.props.changeImg) this.props.changeImg(index);
    };

    render() {
        let settings = {
            dots: false,
            speed: 500,
            initialSlide: this.props.initialSlide,
            slidesToShow: this.props.slidesToShow || 1,
            slidesToScroll: this.props.slidesToScroll || 1,
            centerMode: false,
            arrows: this.props.arrows,
            infinite:
                this.props.carouselItems.length > 1
                    ? this.props.infinite
                    : false,
            autoplay: this.props.autoPlay,
            asNavFor: this.props.asNavFor || null,
            className: "imageCarousel",
            afterChange: this.handleCallback
        };
        let cropperStyle = {
            width: "80%",
            height: "100%",
            borderRadius: "50%",
            marginLeft: "10%",
            overflow: "hidden",
            border: "5px solid black"
        };
        let carouselImgStyle = {
            width: "133.33%",
            marginLeft: "-16.67%"
        };

        return (
            <div style={{ background: "transparent", width: "100%" }}>
                <Slider ref="slider" {...settings}>
                    {this.props.carouselItems.map((img, index) => {
                        return (
                            <div key={"carousel-" + index}>
                                <div style={cropperStyle}>
                                    <img
                                        src={img}
                                        onClick={() => {
                                            this.handleClick(index);
                                        }}
                                        alt="carousel"
                                        style={carouselImgStyle}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </div>
        );
    }
}
