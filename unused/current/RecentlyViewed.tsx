import React from "react";

//dummy placeholder
const toolkitFocusPet_0 = (n: number, id: number, label: string) => {
    console.log(`clicked pet #${id}`);
}

export const RecentlyViewed = () => {
    return (
        <div className="rgtkPetRecent" id="rgtkPetRecent_0">

            <div className="rgtkPetRecentHeader" id="rgtkPetRecentHeader_0">
                Pets you recently viewed
            </div>


            <div title="Cowboy, Domestic Short Hair (short coat)"
                 className="rgtkPetRecentBox rgtkPetRecentPetPic rgtkPetRecentPetPicActual rgtkPetRecentPetPic1"
                 id="rgtkPetRecentPetPic1_0"
                 data-_style="background-image:url(https://s3.amazonaws.com/filestore.rescuegroups.org/2235/pictures/animals/14831/14831398/72547522_100x120.jpg);"
                 onClick={() => toolkitFocusPet_0(0, 14831398, '')}>
            </div>


            <div title="JJ and TJ, Tortoiseshell / Mixed"
                 className="rgtkPetRecentBox rgtkPetRecentPetPic rgtkPetRecentPetPicActual rgtkPetRecentPetPic2"
                 id="rgtkPetRecentPetPic2_0"
                 data-_style="background-image:url(https://s3.amazonaws.com/filestore.rescuegroups.org/2426/pictures/animals/16095/16095279/74594488_100x132.jpg);"
                 onClick={() => toolkitFocusPet_0(0, 16095279, '')}>
            </div>

        </div>

    )
}
