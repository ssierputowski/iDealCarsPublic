export interface Schedule {
  employeeId: string;
  schedule: {
    weekOf: String,
    sunday: {
      timeIn: String,
      timeOut: String
    },
    monday: {
      timeIn: String,
      timeOut: String
    },
    tuesday: {
      timeIn: String,
      timeOut: String
    },
    wednesday: {
      timeIn: String,
      timeOut: String
    },
    thursday: {
      timeIn: String,
      timeOut: String
    },
    friday: {
      timeIn: String,
      timeOut: String
    },
    saturday: {
      timeIn: String,
      timeOut: String
    }
  };
}
