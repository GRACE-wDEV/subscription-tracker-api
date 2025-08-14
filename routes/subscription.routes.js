import { Router } from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subcriptionRouter = Router();

subcriptionRouter.get('/', (req, res)=>{res.send({title:`GET all subscriptions`})})

subcriptionRouter.get('/:id', (req, res)=>{res.send({title:`GET subscription details`})})

subcriptionRouter.post('/', authorize, createSubscription);

subcriptionRouter.put('/:id', (req, res)=>{res.send({title:`UPDATE subscription`})})

subcriptionRouter.delete('/:id', (req, res)=>{res.send({title:`DELETE subscription`})})

subcriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subcriptionRouter.put('/:id/cancel', (req, res)=>{res.send({title:`CANCEL subscription`})})

subcriptionRouter.get('/upcoming-renewals', (req, res)=>{res.send({title:`GET upcoming renewals`})})

export default subcriptionRouter;