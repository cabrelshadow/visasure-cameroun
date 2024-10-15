import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class VisaRequest extends Model {
  public id!: number;
  public type!: number;
  public reason!: string;
  public travelDate!: Date;
  public email!: string;
  public phoneNumber!: string;
  public friendlyNumberCountry!: string;
  public firstName!: string;
  public lastName!: string;
  public passportExpiry!: Date;
  public isMinor!: boolean;
  public passportPhoto!: { fileName: string };
  public flightTicket!: { fileName: string };;
  public vaccinationCard!: { fileName: string };;
  public parentalAuthorization!: { fileName: string };;  // Optionnel si non mineur
}

VisaRequest.init({
  type: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  travelDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  friendlyNumberCountry: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passportExpiry: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isMinor: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  passportPhoto: {
    type: DataTypes.JSON,
    allowNull: false
  },
  flightTicket: {
    type: DataTypes.JSON,
    allowNull: false
  },
  vaccinationCard: {
    type: DataTypes.JSON,
    allowNull: false
  },
  parentalAuthorization: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'VisaRequest'
});

export default VisaRequest;
