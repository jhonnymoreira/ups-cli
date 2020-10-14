const { bold } = require('chalk');
const { table } = require('table');

function TableService() {
  const tableOptions = {
    columnDefault: {
      wrapWord: true,
    },
    columns: {
      0: {
        width: 15,
      },
      1: {
        width: 15,
      },
      2: {
        width: 20,
        wrapWord: false,
      },
      3: {
        width: 30,
      },
    },
  };

  return {
    generateHeaders() {
      return [
        bold('Status'),
        bold('Localização'),
        bold('Data e Horário'),
        bold('Descrição'),
      ];
    },
    generateTableData(packageActivity) {
      const headers = this.generateHeaders();
      return [headers].concat(packageActivity);
    },
    printActivity(packageActivity) {
      const tableData = this.generateTableData(packageActivity);
      console.log(table(tableData, tableOptions));
    },
  };
}

module.exports = { TableService };
