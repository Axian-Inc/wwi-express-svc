import express from "express";
import SalesOrdersRepo from "./database/sales.repo";
import SalesService from "./services/sales.service";
import PurchasingService from "./services/purchasing.service";
import WarehouseService from "./services/warehouse.service";
import ApplicationService from "./services/application.service";
import ApplicationRouter from "./routers/application.router";
import { IRouter } from "./routers/router.interface";
import { hostname } from "os";

class App {
  private _port: any;
  private _hostname: string;
  public app: express.Application;

  constructor(port: any, hostname: string, routers: IRouter[]) {
    this._port = port;
    this._hostname = hostname;
    this.app = express();
    this.setupCORS();
    this.setupRoutes(routers);
  }

  private setupCORS() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Method", "GET,POST,OPTIONS");
      if ('OPTIONS' === req.method) {
        res.status(200).send("OK");
      } else {
        next();
      }
    });
  }

  private setupRoutes(routers: IRouter[]) {
    routers.forEach(r => {
      this.app.use('/', r.router);
    })
  }

  public async listen() {
    const routeMap = `<html>
    ROUTES<br />
    <a href='/application/people' >top 10 people: "/application/people"</a><br />
    <a href='/purchasing/po' >top 10 purchaseOrders: "/purchasing/po"</a><br />
    <a href='/sales/order' >top 10 salesOrders: "/sales/order"</a><br />
    <a href='/warehouse/stockItem' >top 10 stockItems: "/warehouse/stockItem"</a><br />
    Served from: ${hostname}
    </html>`;

    const appRouter = new ApplicationRouter();
    this.app.use('/', appRouter.router);
    // Regular routes
    this.app.get('/', async (req, res) => res.send( `<html><pre>${routeMap}</pre></html>`));

    // 404s
    this.app.use((req, res) => {
      res.status(404).send("These are not the droids you're looking for...");
    });

    // tslint:disable-next-line:no-console
    this.app.listen(this._port, () => {
      console.log( `server started at http://localhost:${ this._port }` );
    });
  }
}

export default App;