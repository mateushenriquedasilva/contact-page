import { Request, Response } from "express";
import { validationResult } from "express-validator";
import contactModel from "../../models/contact-model";

class ContactController {
  public async findAllContactsController(
    req: Request,
    res: Response
  ) {
    try {
      const contact = await contactModel.findAllContactsModel();

      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async findContactController(
    req: Request,
    res: Response
  ) {
    try {
      const conatct = req.params.contact;
      
      const contact = await contactModel.findContactModel(conatct);

      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async createContactController(
    req: Request,
    res: Response
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contactCreated =  {
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_mobile: req.body.contact_mobile,
        contact_phone: req.body.contact_phone,
        contact_is_favorite: req.body.contact_is_favorite,
        contact_is_active: req.body.contact_is_active,
        contact_created_at: Date.now(),
      };
     
      const contact = await contactModel.createContactModel(contactCreated);

      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async updatedContactController(
    req: Request,
    res: Response
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contactCreated =  {
        contact_id: req.body.contact_id,
        contact_name: req.body.contact_name,
        contact_email: req.body.contact_email,
        contact_mobile: req.body.contact_mobile,
        contact_phone: req.body.contact_phone,
        contact_is_favorite: req.body.contact_is_favorite,
        contact_is_active: req.body.contact_is_active,
      };
     
      const contact = await contactModel.updatedContactModel(contactCreated);

      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public async contactFavorite(
    req: Request,
    res: Response
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contactFavorite =  {
        contact_id: req.body.contact_id,
        contact_is_favorite: req.body.contact_is_favorite,
      };

      console.log(contactFavorite);
      
     
      const contact = await contactModel.contactFavoriteModel(contactFavorite);

      res.status(201).json(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ContactController();


