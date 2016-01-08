namespace app {
  export interface IControlInventory {
    gridOptions: ag.grid.GridOptions;
  }

  class InventoryController implements IControlInventory {
    public gridOptions: ag.grid.GridOptions;
    constructor($timeout: ng.ITimeoutService) {
      var gridOptions: ag.grid.GridOptions = {
        columnDefs: [
          { headerName: "Make", field: "make" },
          { headerName: "Model", field: "model" },
          { headerName: "Price", field: "price" }
        ],
        rowData: [
          { make: "Toyota", model: "Celica", price: 35000 },
          { make: "Ford", model: "Mondeo", price: 32000 },
          { make: "Porsche", model: "Boxter", price: 72000 }
        ],
        onReady: () => {
          $timeout(() => {
            gridOptions.api.sizeColumnsToFit();
          }, 100);
        }
      };
      
      this.gridOptions = gridOptions;
    }
  }

  angular
    .module('app.inventory')
    .controller("InventoryController", InventoryController);
}