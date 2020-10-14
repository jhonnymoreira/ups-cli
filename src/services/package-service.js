const puppeteer = require('puppeteer');
const { PackageActivityMapper } = require('../mappers/package-activity-mapper');

const SELECTORS = {
  CELLS: 'td',
  DETAILED_VIEW_LABEL: '#stApp_lblShipProgressTableViewDetailed',
  ROWS: 'table tbody tr[_ngcontent-c6]',
};

function PackageService() {
  return {
    createPackageURL(packageCode, { locale }) {
      return `https://www.ups.com/track?loc=${locale}&tracknum=${packageCode}&requester=ST/trackdetails`;
    },
    parsePackageActivity(scrapedPackageActivity) {
      return PackageActivityMapper.map(scrapedPackageActivity).filter(
        (activity) => {
          const [_, ...fields] = activity;
          return fields.every((value) => value !== '-');
        }
      );
    },
    async scrapePackageActivity(packageURL) {
      const browser = await puppeteer.launch();

      try {
        const page = await browser.newPage();
        await page.goto(packageURL, { waitUntil: 'networkidle2' });

        return await page.evaluate((SELECTORS) => {
          document.querySelector(SELECTORS.DETAILED_VIEW_LABEL).click();

          const rows = Array.from(document.querySelectorAll(SELECTORS.ROWS));
          return rows.map((row) => {
            const temporaryCells = Array.from(
              row.querySelectorAll(SELECTORS.CELLS)
            );
            const cells =
              temporaryCells.length === 5
                ? temporaryCells.slice(1)
                : temporaryCells;
            return cells.map((cell) => cell.innerText.trim());
          });
        }, SELECTORS);
      } catch (error) {
        throw error;
      } finally {
        await browser.close();
      }
    },
  };
}

module.exports = { PackageService };
