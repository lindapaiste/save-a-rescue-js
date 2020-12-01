import {
    ActivityLevel,
    AdultSexesOk,
    AgeGroup,
    CoatLength,
    EarType,
    EnergyLevel,
    ExerciseNeeds,
    EyeColor,
    FenceNeeds,
    GroomingNeeds,
    IndoorOutdoor,
    NewPeopleReaction,
    ObedienceTraining,
    OwnerExperience,
    Sex,
    SheddingLevel,
    SizeGroup,
    TailType,
    VocalLevel
} from "../strings/enums";

type date = string;
type int = number;
type postalcode = number | string;
type phone = string | number;
type decimal = number;
type url = string;
type province = string;
type email = string;
type OrgType = "Shelter" | string;  //TODO: is an enum - get values
type StatusType = "Available" | string; //TODO: enum

/**
 * note: docs said small/large/original are strings, but postman examples show an object
 * is is ever just a string?
 */
export interface AnimalPicture {
    /**
     *  The datetime the picture was created.
     */
    created: date;
    /**
     *  The URL to a large sized variant of the image.
     */
    large: MediaFile;
    /**
     *  The picture order, where 1 is the first picture the organization wants to show to the public.
     */
    order: int;
    /**
     *  The URL to the original image.
     */
    original: MediaFile;
    /**
     *  The URL to a small sized variant (thumbnail) of the image.
     */
    small: MediaFile;
    /**
     *  The datetime the picture was last updated.
     */
    updated: date;
}

export interface MediaFile {
    /**
     * size in bytes
     */
    filesize: number;
    /**
     * pixel width
     */
    resolutionX: number;
    /**
     * pixel height
     */
    resolutionY: number;
    /**
     * file URL
     */
    url: string;
}

export interface AnimalVideo {
    url: string;
    videoId: string;
    urlThumbnail: string;
    created: date;
    updated: date;
}

export interface Animal {
    /**
     *  Activity Level
     Values: Not Active, Slightly Active, Moderately Active, Highly Active
     */
    activityLevel: ActivityLevel;
    /**
     *  Adopted Date
     */
    adoptedDate: date;
    /**
     *  Adoption fee
     */
    adoptionFeeString: string;
    /**
     *  Good with adults
     Values: All, Men Only, Women Only
     */
    adultSexesOk: AdultSexesOk;
    /**
     *  General age
     Values: Baby, Young Adult, Senior
     */
    ageGroup: AgeGroup;
    /**
     *  Age (years/months)
     */
    ageString: string;
    /**
     *  Available Date
     */
    availableDate: date;
    /**
     *  Birth date
     */
    birthDate: date;
    /**
     *  Primary Breed
     */
    breedPrimary: string;
    /**
     *  Primary Breed Id
     */
    breedPrimaryId: int;
    /**
     *  Secondary Breed
     */
    breedSecondary: string;
    /**
     *  Secondary Breed Id
     */
    breedSecondaryId: int;
    /**
     *  Breed
     */
    breedString: string;
    /**
     *  Coat Length
     Values: Short, Medium, Long
     */
    coatLength: CoatLength;
    /**
     *  Color details
     */
    colorDetails: string;
    /**
     *  Created date
     */
    createdDate: date;
    /**
     *  Description
     */
    descriptionHtml: string;
    /**
     *  Description (no HTML)
     */
    descriptionText: string;
    /**
     *  Distinguishing marks
     */
    distinguishingMarks: string;
    /**
     *  Distance from postal code
     */
    distance?: decimal;
    /**
     *  Ear type
     Values: Cropped, Droopy, Erect, Long, Missing, Notched, Rose, Semi-erect, Tipped, Natural/Uncropped
     */
    earType: EarType;
    /**
     *  Energy level
     Values: Low, Moderate, High
     */
    energyLevel: EnergyLevel;
    /**
     *  Exercise needs
     Values: Not required, Low, Moderate, High
     */
    exerciseNeeds: ExerciseNeeds;
    /**
     *  Eye color
     Values: Black, Blue, Blue-brown, Brown, Copper, Gold, Gray, Green, Hazelnut, Mixed, Pink, Yellow
     */
    eyeColor: EyeColor;
    /**
     *  Requires home with fence
     Values: Not required, Any type, 3 foot, 6 foot
     */
    fenceNeeds: FenceNeeds;
    /**
     *  Found date
     */
    foundDate: date;
    /**
     *  Found zip/postal code
     */
    foundPostalcode: postalcode;
    /**
     *  Grooming needs
     Values: Not Required, Low, Moderate, High
     */
    groomingNeeds: GroomingNeeds;
    /**
     *  Reason not housetrained
     */
    housetrainedReasonNot: string;
    /**
     *  Indoor/Outdoor
     Values: Indoor Only, Indoor/Outdoor, Outdoor Only
     */
    indoorOutdoor: IndoorOutdoor;
    /**
     *  Adoption pending
     Values: , 1,
     */
    isAdoptionPending: string;
    /**
     *  Altered
     */
    isAltered: boolean;
    /**
     *  Exact Birth date
     */
    isBirthDateExact: boolean;
    /**
     *  Mixed breed
     */
    isBreedMixed: boolean;
    /**
     *  OK with cats
     */
    isCatsOk: boolean;
    /**
     *  Courtesy Listing
     */
    isCourtesyListing: boolean;
    /**
     *  Current on vaccations
     */
    isCurrentVaccinations: boolean;
    /**
     *  Declawed
     */
    isDeclawed: boolean;
    /**
     *  OK with dogs
     */
    isDogsOk: boolean;
    /**
     *  Farm Animals OK
     */
    isFarmAnimalsOk: boolean;
    /**
     *  Found
     */
    isFound: boolean;
    /**
     *  Housetrained
     */
    isHousetrained: boolean;
    /**
     *  Good with kids
     */
    isKidsOk: boolean;
    /**
     *  Microchipped
     */
    isMicrochipped: boolean;
    /**
     *  Needs a Foster
     */
    isNeedingFoster: boolean;
    /**
     *  Seniors OK
     */
    isSeniorsOk: boolean;
    /**
     *  Has special needs
     */
    isSpecialNeeds: boolean;
    /**
     *  Allow sponsorship
     */
    isSponsorable: boolean;
    /**
     *  Requires a yard
     */
    isYardRequired: boolean;
    /**
     *  Euthanasia date
     */
    killDate: string;
    /**
     *  Euthanasia reason
     */
    killReason: string;
    /**
     *  Name
     */
    name: string;
    /**
     *  Reaction to new people
     Values: Cautious, Friendly, Protective, Aggressive
     */
    newPeopleReaction: NewPeopleReaction;
    /**
     *  Obedience training
     Values: Needs training, Has basic training, well trained
     */
    obedienceTraining: ObedienceTraining;
    /**
     *  Owner experience needed
     Values: None, Species, Breed
     */
    ownerExperience: OwnerExperience;
    /**
     *  Number of pictures
     */
    pictureCount: int;
    /**
     *  Thumbnail URL
     */
    pictureThumbnailUrl: string;
    /**
     *
     */
    priority: string | number;
    /**
     *  Qualities
     */
    qualities: string;
    /**
     *  Rescue ID
     */
    rescueId: string;
    /**
     *  Search
     */
    searchString: string;
    /**
     *  Sex
     Values: Male, Female
     */
    sex: Sex;
    /**
     *  Shedding amount
     Values: None, Moderate, High
     */
    sheddingLevel: SheddingLevel;
    /**
     *  Current size
     */
    sizeCurrent: string;
    /**
     *  Size Potential
     Values: Small, Medium, Large, X-Large
     */
    sizeGroup: SizeGroup;
    /**
     *  Potential size
     */
    sizePotential: string;
    /**
     *  Size unit of measurement
     Values: Centimeters, Hands, Inches, Kilograms, Ounces, Pounds
     */
    sizeUOM: string;
    /**
     *  Slug
     */
    slug: string;
    /**
     *  Special needs description
     */
    specialNeedsDetails: string;
    /**
     *  Sponsors
     */
    sponsors: string;
    /**
     *  Sponsorship details
     */
    sponsorshipDetails: string;
    /**
     *  Sponsorship minimum
     */
    sponsorshipMinimum: string;
    /**
     *  Summary
     */
    summary: string;
    /**
     *  Tail type
     Values: Bare, Bob, Curled, Docked, Kinked, Long, Missing, Short
     */
    tailType: TailType;
    /**
     *  Tracker image Url
     */
    trackerimageUrl: string;
    /**
     *  Last updated
     */
    updatedDate: date;
    /**
     *  Webpage
     */
    url: string;
    /**
     *  Number of videos
     */
    videoCount: int;
    /**
     *  Number of Video URLs
     */
    videoUrlCount: int;
    /**
     *  Likes to vocalize
     Values: Quiet, Some, Lots
     */
    vocalLevel: VocalLevel;
}

export interface Breed {
    /**
     *  Name
     */
    name: string;
}

export interface Contact {
    /**
     *  Email
     */
    email: string;
    /**
     *  First name
     */
    firstname: string;
    /**
     *  Full name
     */
    fullname: string;
    /**
     *  Last name
     */
    lastname: string;
    /**
     *  Name
     */
    name: string;
    /**
     *  Cell Phone
     */
    phoneCell: phone;
    /**
     *  Home Phone
     */
    phoneHome: phone;
    /**
     *  Salutation
     */
    salutation: string;
}

export interface Location {
    /**
     *  City
     */
    city: string;
    /**
     *  City, state
     */
    citystate: string;
    /**
     *  Coordinates
     */
    coordinates: string;
    /**
     *  Country
     */
    country: string;
    /**
     *  Latitude
     */
    lat: decimal;
    /**
     *  Longitude
     */
    lon: decimal;
    /**
     *  Name
     */
    name: string;
    /**
     *  Phone
     */
    phone: phone;
    /**
     *  Phone extension
     */
    phoneExt: string;
    /**
     *  Postal Code
     */
    postalcode: postalcode;
    /**
     *  Postal Code Plus 4
     */
    postalcodePlus4: string;
    /**
     *  State
     */
    state: province;
    /**
     *  Street
     */
    street: string;
    /**
     *  Url
     */
    url: url;
}

export interface Organization {
    /**
     *  About
     */
    about: string;
    /**
     *  Adoption Process
     */
    adoptionProcess: string;
    /**
     *  Adoption Url
     */
    adoptionUrl: url;
    /**
     *  City
     */
    city: string;
    /**
     *  City, State
     */
    citystate: string;
    /**
     *  Coordinates
     */
    coordinates: string;
    /**
     *  Country
     */
    country: string;
    /**
     *  Distance from postal code
     */
    distance: decimal;
    /**
     *  Donation Url
     */
    donationUrl: url;
    /**
     *  Email
     */
    email: email;
    /**
     *  Facebook Url
     */
    facebookUrl: url;
    /**
     *  Fax
     */
    fax: phone;
    /**
     *  Common Adoption Application Accepted
     */
    isCommonapplicationAccepted: boolean;
    /**
     *  Latitude
     */
    lat: decimal;
    /**
     *  Longitude
     */
    lon: decimal;
    /**
     *  Meet Pets
     */
    meetPets: string;
    /**
     *  Name
     */
    name: string;
    /**
     *  Phone
     */
    phone: phone;
    /**
     *  Postal Code
     */
    postalcode: postalcode;
    /**
     *  Postal Code Plus 4
     */
    postalcodePlus4: string;
    /**
     *  Areas Served
     */
    serveAreas: string;
    /**
     *  Services
     */
    services: string;
    /**
     *  Sponsorship Url
     */
    sponsorshipUrl: url;
    /**
     *  State
     */
    state: province;
    /**
     *  Street
     */
    street: string;
    /**
     *  Type
     */
    type: OrgType;
    /**
     *  Url
     */
    url: url
}

export interface Species {
    /**
     *  Plural word
     */
    plural: string;
    /**
     *  Singular
     */
    singular: string;
    /**
     *  Plural young word
     */
    youngPlural: string;
    /**
     *  Singular young word
     */
    youngSingular: string
}

export interface Color {
    name: string;
}

export interface Status {
    name: StatusType;
    description: string;
}

interface HasName {
    name: string;
}

/**
 * purpose here is to associate key name with object type
 */
export interface EntityAttributes {
    animals: Animal;
    breeds: Breed;
    colors: Color;
    patterns: HasName;
    species: Species;
    statuses: Status;
    fosters: any; //TODO - from animal includes
    locations: Location;
    orgs: Organization;
    pictures: AnimalPicture;
    videourls: AnimalVideo;
    videos: any; //TODO - what is this?  hosted video?
    //missing key for contact - might be fosters?
}

export type EntityType = keyof EntityAttributes;

export interface EntityIdentifier<T extends EntityType = EntityType> {
    type: T;
    id: string;
}
