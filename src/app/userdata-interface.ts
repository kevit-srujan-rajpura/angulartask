export interface Userdata{
    id:number;
    name: string;
    dateOfBirth: Date;
    email: string;
    phone: number;
    education?: {
      institutename: string;
      degree: string;
      percentage: number;
      hobby?: {
        Reading: boolean;
        Traveling: boolean;
        Sports: boolean;
        Music: boolean;
        Dancing: boolean;
        Playing: boolean;
        Coding: boolean;
        Cooking: boolean;
      };
    };
    gender?: string;
    addressess?: { addedAddress: string }[];
}

export interface Address {
  addedAddress: string;

}
