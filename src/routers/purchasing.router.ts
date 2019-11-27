import { Router, Request, Response } from 'express';
import { IRouter } from './router.interface';
import PurchasingService from '../services/purchasing.service';

class PurchasingRouter implements IRouter {
    public router = Router();
    private path = '/purchasing';
    private svc = new PurchasingService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/po/:id`, this.getPerson);
        this.router.get(`${this.path}/po`, this.getPeople);
    }

    private getPeople = async (request: Request, response: Response) => {
        const res = await this.svc.getPurchaseOrders(10);
        response.send(res);
    }

    private getPerson = async (request: Request, response: Response) => {
        const res = await this.svc.getPurchaseOrder(+request.params.id);
        response.send(res);
    }
}
export default PurchasingRouter;