export interface FilterLocation {
    id: string; 
    name: string;
  }

export interface Agent{
    id: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
  };