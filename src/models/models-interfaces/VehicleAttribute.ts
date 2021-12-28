interface VehicleAttribute {
  id: string;
  brand: string;
  model: string;
  year: number;
  kilometer: number;
  color: string;
  chassis: string;
  purchasePrice: number;
  salePrice: number;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default VehicleAttribute;
