import { Router } from "express";
import contactsController from "../controllers/contacts-controller";
import contactValidator from "./validators/contacts-validators";
const router = Router();

// default router
router.get('/contacts', contactsController.findAllContactsController);
router.get('/contact/:contact*', contactsController.findContactController);
router.post('/contact', contactValidator.createContactValidator, contactsController.createContactController);
router.put('/contact', contactValidator.updatedContactValidator, contactsController.updatedContactController);
router.put('/contact_favorite', contactValidator.contactFavoriteValidator, contactsController.contactFavorite);

export default router;