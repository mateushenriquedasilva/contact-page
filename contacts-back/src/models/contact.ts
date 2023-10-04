import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

class Contact extends Model {
  public contact_id!: number;
  public contact_name!: string;
  public contact_email!: string;
  public contact_mobile!: string;
  public contact_phone!: string;
  public contact_is_favorite!: boolean;
  public contact_is_active!: boolean;
  public contact_created_at!: Date;
}

Contact.init(
  {
    contact_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contact_name: {
      type: DataTypes.STRING(100),
    },
    contact_email: {
      type: DataTypes.STRING(255),
    },
    contact_mobile: {
      type: DataTypes.STRING(14),
    },
    contact_phone: {
      type: DataTypes.STRING(14),
    },
    contact_is_favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contact_is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contact_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    sequelize,
    modelName: 'contacts',
    timestamps: false, // Se você não deseja usar os campos padrão de data/hora do Sequelize
  }
);

export default Contact;
