import { Router, Request, Response } from 'express';
import ApplicationService from '../services/application.service';
import { IRouter } from './router.interface';

class ApplicationRouter implements IRouter {
    public router = Router();
    private path = '/application';
    private svc = new ApplicationService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/people/:id`, this.getPerson);
        this.router.get(`${this.path}/people`, this.getPeople);
    }

    private getPeople = async (request: Request, response: Response) => {
        const res = await this.svc.getPeople(10);
        response.send(res);
    }

    private getPerson = async (request: Request, response: Response) => {
        const res = await this.svc.getPerson(+request.params.id);
        response.send(res);
    }
}
export default ApplicationRouter;