const normalizePackageActivityInfo = (packageActivityInfo) =>
  packageActivityInfo
    .replace('Comprovante de Entrega', '')
    .replace('Abrir o link em uma nova janela', '')
    .replace('\n', ' ')
    .replace(/\s{2,}/, ' ')
    .trim();

const PackageActivityMapper = {
  map: (packageActivities) =>
    packageActivities.map(([status, dateTime, location, description]) => [
      normalizePackageActivityInfo(status),
      normalizePackageActivityInfo(location),
      normalizePackageActivityInfo(dateTime),
      normalizePackageActivityInfo(description),
    ]),
};

module.exports = { PackageActivityMapper };
