import React from "react";

export const ShareIcons = () => {

    const onClickMail = () => {
        //TODO: figure out - Type 'string' is not assignable to type 'Location'
        /*
        const url = window.location.href;
                window.location = 'mailto:?subject=Look at this great pet!&amp;body=Look at this great pet on Save%20A%20Rescue:%0D%0A%0D%0AName: Chevy%0D%0ABreed: Basenji / Australian Kelpie / Mixed (short coat)%0D%0A%0D%0A' + encodeURIComponent(url);
         */
    }

    const onClickShare = (s: string) => () => {
        window.open(
            `https://toolkit.rescuegroups.org/j/3/share?a=5610439&amp;k=1112&amp;i=0&amp;s=${s}`,
            'sharer',
            'toolbar=0,status=0,width=580,height=325'
        );
    }

    return (
        <>
            <div className="rgtkPetShareIcon rgtkPetShareFacebook" id="rgtkPetShareFacebook_0"
                 onClick={onClickShare('f')}/>

            <div className="rgtkPetShareIcon rgtkPetShareTwitter" id="rgtkPetShareTwitter_0"
                 onClick={onClickShare('t')}/>

            <div className="rgtkPetShareIcon rgtkPetShareGooglePlus" id="rgtkPetShareGooglePlus_0"
                 onClick={onClickShare('g')}/>

            <div className="rgtkPetShareIcon rgtkPetShareEmail" id="rgtkPetShareEmail_0" onClick={onClickMail}/>

            <div className="rgtkPetPrint" id="rgtkPetPrint_0" onClick={() => window.print()}>
                <span aria-hidden="true" data-icon=""/>
            </div>
        </>
    )
}


export const InfoBox = () => {
    return (

        <div className="rgtkPetInfoBox" id="rgtkPetInfoBox_0">

            <ShareIcons/>

            <hr className="rgtkClearBoth"/>

            <div className="rgtkPetFieldStatus" id="rgtkPetFieldStatus_0">Available for Adoption</div>

            <div className="rgtkPetFieldRescueID" id="rgtkPetFieldRescueID_0">Pet ID # 114</div>

            <div className="rgtkPetFieldLocation" id="rgtkPetFieldLocation_0">Houston, TX <br/>3 miles away</div>

            <div className="rgtkPetOrgInfoBox" id="rgtkPetOrgInfoBox_0">

                <div className="rgtkPetBoxTitle" id="rgtkPetBoxTitle_0">Organization Contact Info:</div>

                <div className="rgtkPetOrgInfo rgtkPetInfoIndented" id="rgtkPetOrgInfo_0">

                    <div className="rgtkPetFieldOrgName" id="rgtkPetFieldOrgName_0">Scout's Honor Rescue</div>

                    <div className="rgtkPetFieldOrgAddress" id="rgtkPetFieldOrgAddress_0">1302 Waugh Drive, #245
                    </div>

                    <div className="rgtkPetFieldOrgCitystatezip" id="rgtkPetFieldOrgCitystatezip_0">Houston, TX
                        77019
                    </div>


                    <div className="rgtkPetFieldOrgEmail" id="rgtkPetFieldOrgEmail_0"><a
                        href="mailto:info@scoutshonor.org">info@scoutshonor.org</a></div>

                    <div className="rgtkPetFieldOrgUrl" id="rgtkPetFieldOrgUrl_0"><a
                        href="http://www.scoutshonor.org" target="_blank">http://www.scoutshonor.org</a></div>


                </div>
            </div>
        </div>
    );
}
