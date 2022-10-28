const fs = require('fs');
const path = require('path');
exports.getAdminPage = (req, res, _next) => {
  const bannerPageStringArray = [];
  const indexPerksContent = [];
  const folderNames = fs.readdirSync('page-text/');

  folderNames.forEach((folder) => {
    const fileName = fs.readdirSync(`page-text/${folder}/banner-text`);
    const fileContent = fs.readFileSync(
      `page-text/${folder}/banner-text/${fileName}`,
      'utf-8'
    );
    bannerPageStringArray.push(fileContent);
  });

  const indexInfoSectiontext = fs.readFileSync(
    'page-text/page-1/info/info.txt',
    'utf-8'
  );

  const indexPerks = fs.readdirSync('page-text/page-1/perks');

  indexPerks.forEach((indexPerk) => {
    const fileContent = fs.readFileSync(
      `page-text/page-1/perks/${indexPerk}`,
      'utf-8'
    );

    indexPerksContent.push(fileContent);
  });

  console.log(indexPerksContent);

  const formattedIndexPerks = indexPerks.map((indexPerk) => {
    return indexPerk.split('.')[0];
  });

  res.render('admin/edit-page', {
    path: '/admin/edit-page',
    bannerStringArray: bannerPageStringArray,
    indexInfoSectionText: indexInfoSectiontext,
    perks: formattedIndexPerks,
    perksContent: indexPerksContent,
    pageTitle: 'Admin Edit Site Page',
    csrfToken: req.csrfToken(),
  });
};

exports.postBannerText = (req, res, next) => {
  const bannerTextNumber = req.body['banner-text-number'];
  const bannerText = req.body['banner-text'];

  let redirectPage;

  switch (bannerTextNumber) {
    case 'page-1':
      redirectPage = '/';
      break;
    case 'page-2':
      console.log('entered');
      redirectPage = '/quem-somos';
      break;
    case 'page-3':
      redirectPage = '/o-que-fazemos';
      break;
    case 'page-4':
      redirectPage = '/RCInsights';
      break;
    default:
      redirectPage = '/';
  }

  const filePath = `page-text/${bannerTextNumber}`;

  fs.writeFileSync(filePath + '/banner-text' + '/banner-text.txt', bannerText);

  req.flash(
    'message',
    `Texto do Banner da página ${
      redirectPage !== '/' ? "`${redirectPage.split('/')[1]}`" : 'Index'
    } atualizado com sucesso.`
  );

  res.redirect(302, redirectPage);
};

exports.postStartingPageInfoSection = (req, res, next) => {
  const infoText = req.body['index-info-section'];

  const filePath = `page-text/page-1`;

  fs.writeFileSync(filePath + '/info' + '/info.txt', infoText);

  req.flash(
    'message',
    `Texto da seção "info" da página Index atualizado com sucesso.`
  );

  res.redirect(302, '/');
};

exports.postStartingPagePerksEdit = (req, res, next) => {};
