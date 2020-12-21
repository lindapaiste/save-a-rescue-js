import {sliderBool, SpWpCarouselJson} from "../../clientWp/objects/each/SpWpCarouselSchema";
import {useWpEntity} from "../../connected/useWpEntity";
import React, {useEffect} from "react";
import {MySlider} from "../../elements/slider/MySlider";
import {isDefined, typedKeys} from "@lindapaiste/ts-helpers";
import {WpMediaEmbedded} from "../../clientWp/objects/each/MediaSchema";
import {Settings} from "@ant-design/react-slick";

type SpWpSizes = keyof SpWpCarouselJson['shortcode_options']['wpcp_number_of_columns'];
type BreakPoints = Record<Exclude<SpWpSizes, 'lg_desktop'>, number>;
//could use my own breakpoints, but I am taking the ones from the Wp Carousel plugin
const BREAKPOINT_VALUES: Record<Exclude<SpWpSizes, 'lg_desktop'>, number> = {
    desktop: 1200,
    laptop: 980,
    tablet: 736,
    mobile: 480,
}
const mapSettings = (opt: SpWpCarouselJson['shortcode_options'], breakpoints: BreakPoints = BREAKPOINT_VALUES): Settings => {

    const arrows = opt.wpcp_navigation !== "hide";

    return {
        autoplay: sliderBool(opt.wpcp_carousel_auto_play),
        autoplaySpeed: parseInt(opt.carousel_auto_play_speed.all),
        speed: parseInt(opt.standard_carousel_scroll_speed.all),
        pauseOnHover: sliderBool(opt.carousel_pause_on_hover),
        infinite: sliderBool(opt.carousel_infinite),
        arrows,
        swipe: sliderBool(opt.slider_swipe),
        draggable: sliderBool(opt.slider_draggable),
        swipeToSlide: sliderBool(opt.carousel_swipetoslide),
        //note: ANY settings can be overwritten in breakpoint, but only doing slidesToShow here
        //could use my own breakpoints, but I am taking the ones from the Wp Carousel plugin
        slidesToShow: parseInt(opt.wpcp_number_of_columns.lg_desktop),
        responsive: typedKeys(breakpoints).map(device => ({
            breakpoint: breakpoints?.[device],
            settings: {
                slidesToShow: parseInt(opt.wpcp_number_of_columns[device]),
                arrows: device === "mobile" && opt.wpcp_navigation === "hide_mobile" ? false : arrows,
            }
        }))
    }
}
export const WpCarouselSlider = ({id, breakpoints}: { id: number | string, breakpoints?: BreakPoints }) => {
    const {object, load} = useWpEntity('sp_wp_carousel', id);

    useEffect(() => {
        load();
    }, [load]);

    if (object) {

        const mediaIds = object.upload_options.wpcp_gallery_ids;

        const opt = object.shortcode_options;

        const settings = mapSettings(opt, breakpoints);

        return (
            <MySlider {...settings}>
                {mediaIds.map(id => object?._embedded?.["wp:featuredmedia"]?.find(m => m.id === id))
                    .filter(isDefined)
                    .map(media => (
                        <RenderSlide
                            {...media}
                            size={object?.shortcode_options.wpcp_image_sizes}
                        />
                    ))
                }
            </MySlider>
        )
        //TODO: get images from redux instead of json
    } else return null;
}
//TODO: border color and width from settings
export const RenderSlide = ({caption, alt_text, media_details, size}: WpMediaEmbedded & { size: string }) => {
    const sized = media_details.sizes[size] ?? media_details.sizes.full;
    return (
        <div className="spwp-slide">
            {sized &&
            <img
                src={sized.source_url}
                alt={alt_text}
                width={sized.width}
                height={sized.height}
            />
            }
        </div>
    )
}
