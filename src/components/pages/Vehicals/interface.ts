export interface VehicleData {
  id: string;
  name: string;
  details: {
    currency: string;
    price: number;
    color: string;
    brand: string;
    manufactureYear: string;
    image: string;
    description: string;
  };
}
