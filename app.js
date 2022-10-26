const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);

const csrf = require('csurf');

const keys = require('./config/keys');
const MONGODB_URI = keys.MONGODB_URI;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const errorController = require('./controllers/error');

const isAuth = require('./middleware/isAuth');

const User = require('./models/user');

//ONLY .PNGS - to be added
const fileFilter = (_req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  secure: true,
  cloud_name: keys.cloudinaryCloudName,
  api_key: keys.cloudinaryApiKey,
  api_secret: keys.cloudinaryApiSecret,
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const { memoryStorage } = require('multer');

const upload = multer({ storage: memoryStorage(), fileFilter: fileFilter });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

function uploadFile(req, res, next) {
  let pageNumber;
  let pageName;

  switch (req.body.pageNumber) {
    case '1':
      pageNumber = 'Retangulo1';
      pageName = '/';
      break;
    case '2':
      pageNumber = 'Retangulo2';
      pageName = '/quem-somos';
      break;
    case '3':
      pageNumber = 'Retangulo3';
      pageName = '/o-que-fazemos';
      break;
    case '4':
      pageNumber = 'Retangulo4';
      pageName = '/RCInsights';
      break;
  }

  const formattedPageName = pageName.slice(1);

  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          {
            folder: 'background-images',
            use_filename: false,
            public_id: pageNumber,
            unique_filename: false,
            overwrite: true,
            backup: false,
            invalidate: true,
          },

          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
    }

    upload(req)
      .then((_res) => {
        req.flash(
          'message',
          `Banner da página ${formattedPageName} atualizado com sucesso. Para ver a nova imagem, por favor limpe o cachê desta página.`
        );
        res.redirect(302, `${pageName}`);
      })
      .catch((_err) => {
        req.flash(
          'errorMessage',
          `Falha na alteração do Banner da página ${formattedPageName}.`
        );
        res.redirect(302, `${pageName}`);
      });
  } else {
    req.flash(
      'errorMessage',
      'Pedido negado, imagem ausente ou inválida (permitido apenas imagens no formato .png).'
    );
  }
  res.redirect(302, `${pageName}`);
}

app.use(
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;

  next();
});

app.post(
  '/admin/banner-edit',
  upload.single('file'),

  uploadFile
);

const csrfProtection = csrf();

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, _res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.use('/admin', isAuth, adminRoutes);
app.use(indexRoutes);
app.use(authRoutes);

app.get(errorController.error500);
app.use(errorController.error404);

const serverPort = 8080;

mongoose
  .connect(MONGODB_URI)
  .then((_result) => {
    //heroku setup
    // app.listen(process.env.PORT || serverPort);
    app.listen(serverPort);
  })
  .catch((err) => {
    console.log(err);
  });

//heroku setup
// app.listen(serverPort);
