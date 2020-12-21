import { Feature, Point, Units } from "@turf/helpers";

declare module "@turf/distance" {

    function distance(from:  Feature<Point> | Point | number[], to:  Feature<Point> | Point | number[], options?: {units?: Units}): number;

    exports.default = distance;
}
