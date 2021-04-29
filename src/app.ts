import express from "express";
import SalesOrdersRepo from "./database/sales.repo";
import SalesService from "./services/sales.service";
import PurchasingService from "./services/purchasing.service";
import WarehouseService from "./services/warehouse.service";
import ApplicationService from "./services/application.service";
import ApplicationRouter from "./routers/application.router";
import { IRouter } from "./routers/router.interface";

const APP_VERSION = process.env.APP_VERSION
const BRANCH = process.env.BRANCH
const ENV_NAME = process.env.ENV_NAME

class App {
  private _port: any;
  public app: express.Application;

  constructor(port: any, routers: IRouter[]) {
    this._port = port;
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
    is this thing on  3456 esr?
    <iframe src="https://giphy.com/embed/ytTYwIlbD1FBu" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br />
    <iframe src="https://giphy.com/embed/a0Lgc1JvbfS4o" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br />
    <iframe src="https://giphy.com/embed/Swx36wwSsU49HAnIhC" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br />
    <iframe src="https://giphy.com/embed/3o72FcJmLzIdYJdmDe" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br />
    <iframe src="https://giphy.com/embed/1dagNhv8Oqu6l8U3ZK" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><br />
    
    <div class='footer'><strong>Version:</strong>\"${APP_VERSION}\" Branch:\"${BRANCH}\" Environment:\"${ENV_NAME}\"</div>
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