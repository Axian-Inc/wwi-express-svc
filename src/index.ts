import App from "./app";
import ApplicationRouter from "./routers/application.router";
import PurchasingRouter from "./routers/purchasing.router";
import SalesRouter from "./routers/sales.router";
import WarehouseRouter from "./routers/warehouse.router";

const app = new App(process.env.PORT || 8082, [
  new ApplicationRouter(),
  new PurchasingRouter(),
  new SalesRouter(),
  new WarehouseRouter
]);

// start the Express server
app.listen();

process.on('SIGINT', () => {
    process.exit(0);
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});