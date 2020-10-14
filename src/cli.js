const { PackageService } = require('./services/package-service');
const { TableService } = require('./services/table-service');

const packageService = PackageService();
const tableService = TableService();

async function upsCLI({ locale, packageCode }) {
  const packageURL = packageService.createPackageURL(packageCode, { locale });
  const scrapedPackageActivity = await packageService.scrapePackageActivity(
    packageURL
  );
  const packageActivity = packageService.parsePackageActivity(
    scrapedPackageActivity
  );

  tableService.printActivity(packageActivity);
}

module.exports = { upsCLI };
