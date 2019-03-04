export interface Customer {
 // customerId: string;
  firstName: string;
  lastName: string;
  /*vehicleInfo: [
    {
      vehicleYear: number,
      vehicleMake: string,
      vehicleModel: string,
      vehicleColor: string,
      vehicleId: string,
      vehicleDetails: string,
      vehicleImage: string
    }
  ]; */
  phoneNumber: string;
  emailAddress: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  /* serviceRecords: [
    {
      servicePerformed: string,
      serviceDate: string,
      dateReturned: string,
      mechanic: string,
      serviceNotes: string[],
      servicePrice: number,
      paymentReceived: boolean
    }
  ]; */
}
