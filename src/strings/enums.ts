type Values<T> = T extends (infer E)[] ? E : never;

export const activityLevelValues = ["Not Active", "Slightly Active", "Moderately Active", "Highly Active"] as const;
export type ActivityLevel = Values<typeof activityLevelValues>

export const adultSexesOkValues = ["All", "Men Only", "Women Only"] as const;
export type AdultSexesOk = Values<typeof adultSexesOkValues>

export const ageGroupValues = ["Baby", "Young", "Adult", "Senior"] as const;
export type AgeGroup = Values<typeof ageGroupValues>

export const coatLengthValues = ["Short", "Medium", "Long"] as const;
export type CoatLength = Values<typeof coatLengthValues>

export const earTypeValues = ["Cropped", "Droopy", "Erect", "Long", "Missing", "Notched", "Rose", "Semi-erect", "Tipped", "Natural/Uncropped"] as const;
export type EarType = Values<typeof earTypeValues>

export const energyLevelValues = ["Low", "Moderate", "High"] as const;
export type EnergyLevel = Values<typeof energyLevelValues>

export const exerciseNeedsValues = ["Not required", "Low", "Moderate", "High"] as const;
export type ExerciseNeeds = Values<typeof exerciseNeedsValues>

export const eyeColorValues = ["Black", "Blue", "Blue-brown", "Brown", "Copper", "Gold", "Gray", "Green", "Hazelnut", "Mixed", "Pink", "Yellow"] as const;
export type EyeColor = Values<typeof eyeColorValues>

export const fenceNeedsValues = ["Not required", "Any type", "3 foot", "6 foot"] as const;
export type FenceNeeds = Values<typeof fenceNeedsValues>

export const groomingNeedsValues = ["Not Required", "Low", "Moderate", "High"] as const;
export type GroomingNeeds = Values<typeof groomingNeedsValues>

export const indoorOutdoorValues = ["Indoor Only", "Indoor/Outdoor", "Outdoor Only"] as const;
export type IndoorOutdoor = Values<typeof indoorOutdoorValues>

export const isAdoptionPendingValues = ["1", ""] as const;
export type IsAdoptionPending = Values<typeof isAdoptionPendingValues>

export const newPeopleReactionValues = ["Aggressive", "Protective", "Cautious", "Friendly"] as const;
export type NewPeopleReaction = Values<typeof newPeopleReactionValues>

export const obedienceTrainingValues = ["Needs Training", "Has basic training", "well trained"] as const;
export type ObedienceTraining = Values<typeof obedienceTrainingValues>

export const ownerExperienceValues = ["None", "Species", "Breed"] as const;
export type OwnerExperience = Values<typeof ownerExperienceValues>

export const sexValues = ["Male", "Female"] as const;
export type Sex = Values<typeof sexValues>

export const sheddingLevelValues = ["None", "Moderate", "High"] as const;
export type SheddingLevel = Values<typeof sheddingLevelValues>

export const sizeGroupValues = ["Small", "Medium", "Large", "X-Large"] as const;
export type SizeGroup = Values<typeof sizeGroupValues>

export const sizeUOMValues = ["Centimeters", "Hands", "Inches", "Kilograms", "Ounces", "Pounds"] as const;
export type SizeUOM = Values<typeof sizeUOMValues>

export const tailTypeValues = ["Bare", "Bob", "Curled", "Docked", "Kinked", "Long", "Missing", "Short"] as const;
export type TailType = Values<typeof tailTypeValues>

export const vocalLevelValues = ["Quiet", "Some", "Lots"] as const;
export type VocalLevel = Values<typeof vocalLevelValues>
