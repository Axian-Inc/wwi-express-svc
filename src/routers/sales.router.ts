import { Router, Request, Response } from 'express';
import { IRouter } from './router.interface';
import SalesService from '../services/sales.service';

class SalesRouter implements IRouter {
    public router = Router();
    private path = '/sales';
    private svc = new SalesService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/order/:id`, this.getPerson);
        this.router.get(`${this.path}/order`, this.getPeople);
    }

    private getPeople = async (request: Request, response: Response) => {
        const res = await this.svc.getSalesOrders(10);
        response.send(res);
    }

    private getPerson = async (request: Request, response: Response) => {
        const res = await this.svc.getSalesOrder(+request.params.id);
        response.send(res);
    }
}
export default SalesRouter;