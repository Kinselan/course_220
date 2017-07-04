var inventory; 

(function() {
  inventory = {
    collection: [],
    lastID: 0,

    setDate: function() {
      var date = new Date();
      $("#order_date").text(date.toUTCString());
    },

    retrieveTemplate: function() {
      var temp = $("#inventory_item").remove();
      this.template = temp.html();
    },

    addItem: function(e) {
      e.preventDefault();
      this.lastID += 1;
      var item = {
        id: this.lastID,
        name: "",
        stockNumber: "",
        quantity: 1
      }

      this.collection.push(item);

      var template = this.template.replace(/ID/g, this.lastID);
      $("#inventory").append(template);
    },

    deleteItem: function(e) {
      e.preventDefault();
      var $tableRow = $(e.target).closest("tr").remove();
      var id = $tableRow.find("[type=hidden]").val();
      this.collection = this.collection.filter(function(item) {
        return item.id !== +id;
      });

    },

    updateItem: function(e) {
      e.preventDefault();

      var $tableRow = $(e.target).closest("tr");
      var id = $tableRow.find("[type=hidden]").val();

      var item = this.collection.find(function(item) {
        return item.id === +id; 
      });

      item.name = $tableRow.find("[name^=item_name]").val();
      item.stockNumber = $tableRow.find("[name^=item_stock_number]").val();
      item.quantity = $tableRow.find("[name^=item_quantity]").val();

      debugger;
    },

    bindEvents: function() {
      $("#add_item").on("click", $.proxy(this.addItem, this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },

    init: function() {
      this.setDate();
      this.retrieveTemplate();
      this.bindEvents();
    }
  }
})();

$(inventory.init.bind(inventory));