export interface RescueOrg {
    slug: string;
    title: string;
    id: number;
    location: {
        address: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        lat: number;
        lon: number;
    }
    phone: string | null;
    email: string | null;
    website: string | null;
    twitter: string | null;
    facebook: string | null;
    isVerified: boolean;
}
