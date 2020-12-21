type SpWpBool = "1" | "0" | "";

type SpWpShowOrHide = "show" | "hide" | "hide_mobile";

interface BreakpointData<T = string> {
    all: T;
}

/**
 * not everything is included here
 */
export interface SpWpCarouselJson {
    upload_options: {
        wpcp_gallery_ids: number[];
    },
    shortcode_options: {
        section_title: string;
        section_title_margin_bottom: BreakpointData;
        wpcp_number_of_columns: {
            //numbers but as strings
            lg_desktop: string;
            desktop: string;
            laptop: string;
            tablet: string;
            mobile: string;
        },
        wpcp_preloader: SpWpBool;
        wpcp_carousel_auto_play: SpWpBool;
        carousel_auto_play_speed: BreakpointData;
        standard_carousel_scroll_speed: BreakpointData;
        carousel_pause_on_hover: SpWpBool;
        carousel_infinite: SpWpBool;
        wpcp_navigation: SpWpShowOrHide;
        wpcp_pagination: SpWpShowOrHide;
        slider_swipe: SpWpBool;
        slider_draggable: SpWpBool;
        carousel_swipetoslide: SpWpBool;
        wpcp_post_detail_position: "bottom"; //other options pro only
        wpcp_slide_border: {
            all: string; //number
            style: string; //valid CSS
            color: string;
        },
        wpcp_slide_background: string;
        wpcp_post_title: SpWpBool;
        wpcp_post_content_show: SpWpBool;
        wpcp_post_content_type: "excerpt" | "content" | "content_with_limit"; //only excerpt without pro
        wpcp_post_date_show: SpWpBool;
        wpcp_post_author_show: SpWpBool;
        show_image: SpWpBool;
        wpcp_image_sizes: string; //any registered Wp media size
    }
}

export const sliderBool = (value: SpWpBool): boolean => value === "1";
