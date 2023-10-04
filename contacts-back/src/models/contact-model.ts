import { Op } from "sequelize";
import Contact from "./contact";

class ContactModel {
  public async createContactModel(contactCreate: any) {
    try {
      // find existe
      const contact = await Contact.findOne({
        where: {
          contact_mobile: contactCreate.contact_mobile,
        },
      });

      if (contact) {
        return { error: "This contact already exists", code: "already_exists" };
      }

      const newContact = await Contact.create(contactCreate);
      return newContact;
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  }

  public async updatedContactModel(updatedContact: any) {
    try {
      // find existe
      const contact = await Contact.findOne({
        where: {
          contact_mobile: updatedContact.contact_mobile,
        },
      });

      console.log(contact?.dataValues.contact_id);
      console.log(updatedContact);
      

      if (contact?.dataValues.contact_id !== Number(updatedContact.contact_id)) {
        return { error: "This contact already exists", code: "already_exists" };
      }

      const contactUpdated = await Contact.update(
        {
          contact_name: updatedContact.contact_name,
          contact_email: updatedContact.contact_email,
          contact_mobile: updatedContact.contact_mobile,
          contact_phone: updatedContact.contact_phone,
          contact_is_favorite: updatedContact.contact_is_favorite,
          contact_is_active: updatedContact.contact_is_active,
        },
        {
          where: {
            contact_id: updatedContact.contact_id,
          },
        }
      );
      return contactUpdated;
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  }

  public async contactFavoriteModel(contactFavorite: any) {
    try {
      // find existe
      const contact = await Contact.findOne({
        where: {
          contact_id: contactFavorite.contact_id,
        },
      });

      if (!contact) {
        return { error: "This contact not exists", code: "not_exists" };
      }

      const contactIsFavorite = await Contact.update(
        { contact_is_favorite: contactFavorite.contact_is_favorite },
        {
          where: {
            contact_id: contactFavorite.contact_id,
          },
        }
      );

      return contactIsFavorite;
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  }

  public async findAllContactsModel() {
    try {
      const contacts = await Contact.findAll({
        order: [["contact_name", "ASC"]],
      });
      return contacts;
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  }

  public async findContactModel(contact: string) {

    const contactId = parseInt(contact, 10);

    let whereCondition = {
      [Op.or]: [
        { contact_id: contact },
        { contact_name: contact },
        { contact_email: contact },
        { contact_mobile: contact },
        { contact_phone: contact },
      ],
    }

    if (isNaN(Number(contact))) {
      whereCondition = {
        [Op.or]: [
          { contact_name: contact },
          { contact_email: contact },
          { contact_mobile: contact },
          { contact_phone: contact },
        ],
      }
    }

    try {
      const contacts = await Contact.findOne({
        where: whereCondition,
      });

      return contacts;
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    }
  }
}

export default new ContactModel();
