import WarehouseRepo from "../database/warehouse.repo";

class WarehouseService {
  private _repo: WarehouseRepo;
  constructor() {
    this._repo = new WarehouseRepo();
  }

  async getStockItems() {
    return this._repo.getStockItems();
  }

  async getStockItem(id: number) {
    return this._repo.getStockItem(id);
  }
}

export default WarehouseService;