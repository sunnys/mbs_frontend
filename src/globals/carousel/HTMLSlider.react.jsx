import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "semantic-ui-react";

class HTMLSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index:
                this.props.initialSlide === undefined
                    ? 0
                    : this.props.initialSlide
        };
    }

    static propTypes = {
        sliderItems: PropTypes.array,
        initialSlide: PropTypes.number,
        active: PropTypes.number,
        autoPlay: PropTypes.bool,
        arrows: PropTypes.bool,
        infinite: PropTypes.bool,
        asNavFor: PropTypes.string,
        callback: PropTypes.func,
        arrowBtns: PropTypes.bool
    };

    static defaultProps = {
        sliderItems: ["Slide 1", "Slide 2", "Slide 3"],
        initialSlide: 0,
        active: 0,
        autoPlay: true,
        infinite: false,
        dots: false,
        arrows: false,
        asNavFor: null,
        callback: null,
        arrowBtns: false
    };

    handleCallback = index => {
        this.setState({ index: index }, () => {
            if (this.props.callback) this.props.callback(index);
        });
    };

    handleClick = index => {
        if (this.props.changeImg) this.props.changeImg(index);
    };

    next = () => {
        this.slider.slickNext();
    };
    previous = () => {
        this.slider.slickPrev();
    };

    render() {
        let settings = {
            dots: this.props.dots,
            speed: 500,
            initialSlide: this.props.initialSlide,
            slidesToShow: this.props.slidesToShow || 1,
            slidesToScroll: this.props.slidesToScroll || 1,
            centerMode: false,
            arrows: this.props.arrows,
            autoplay: this.props.autoPlay,
            asNavFor: this.props.asNavFor || null,
            className: "imageCarousel",
            infinite: this.props.infinite,
            afterChange: this.handleCallback
        };
        let sliderItemStyle = {
            width: "100%",
            height: "100%"
        };
        let activeSliderItemStyle = {
            ...sliderItemStyle
        };
        let carouselStyle = {
            width: "100%",
            height: "100%"
        };

        return (
            <div style={carouselStyle}>
                <Slider
                    ref={c => (this.slider = c)}
                    {...settings}
                    style={carouselStyle}
                >
                    {this.props.sliderItems.map((content, index) => {
                        return (
                            <div
                                key={"slider-" + index}
                                onClick={() => {
                                    this.handleClick(index);
                                }}
                                style={
                                    this.props.active === index
                                        ? activeSliderItemStyle
                                        : sliderItemStyle
                                }
                            >
                                {content}
                            </div>
                        );
                    })}
                </Slider>
                <br />
                {this.props.arrowBtns && (
                    <div>
                        <Button
                            content="Prev"
                            icon="chevron left"
                            labelPosition="left"
                            secondary
                            onClick={this.previous}
                            disabled={this.state.index === 0}
                        />
                        <Button
                            content="Next"
                            icon="chevron right"
                            labelPosition="right"
                            secondary
                            style={{ float: "right" }}
                            onClick={this.next}
                            disabled={
                                this.state.index ===
                                this.props.sliderItems.length - 1
                            }
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default HTMLSlider;
