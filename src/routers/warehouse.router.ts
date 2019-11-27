import { Router, Request, Response } from 'express';
import { IRouter } from './router.interface';
import WarehouseService from '../services/warehouse.service';

class WarehouseRouter implements IRouter {
    public router = Router();
    private path = '/warehouse';
    private svc = new WarehouseService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/stockItem/:id`, this.getPerson);
        this.router.get(`${this.path}/stockItem`, this.getPeople);
    }

    private getPeople = async (request: Request, response: Response) => {
        const res = await this.svc.getStockItems();
        response.send(res);
    }

    private getPerson = async (request: Request, response: Response) => {
        const res = await this.svc.getStockItem(+request.params.id);
        response.send(res);
    }
}
export default WarehouseRouter;