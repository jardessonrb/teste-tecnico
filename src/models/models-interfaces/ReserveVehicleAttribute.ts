interface ReserveVehicleAttribute{
  id: string;
  valueReserve: number;
  clientId: string;
  vehicleId: string;
  emploeeId: string;
  reserveExpiration: Date;
  status: string
  createdAt: Date;
  updatedAt: Date;
}

export default ReserveVehicleAttribute;
