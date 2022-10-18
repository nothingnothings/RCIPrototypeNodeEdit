const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const multer = require('multer');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const { validationResult } = require('express-validator');
const authCheckerAndRedirecter = require('./middleware/isAuth');

const flash = require('connect-flash');
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

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images/background-images');
//   },
//   filename: (req, file, cb) => {
//     // cb(null, Date.now() + '-' + file.originalname);

//     switch (req.pageName) {
//       case 'banner-1':
//         cb(null, './images/background-images/Retangulo98.png');
//       case 'banner-2':
//         cb(null, './images/background-images/Retangulo99.png');
//       case 'banner-3':
//         cb(null, './images/background-images/Retangulo100.png');
//       case 'banner-4':
//         cb(null, './images/background-images/Retangulo101.png');
//       default:
//         return;
//     }
//   },
// });

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const ImageKit = require('imagekit');

const imageKit = new ImageKit({
  publicKey: keys.imageKitPublicKey,
  privateKey: keys.imageKitPrivateKey,
  urlEndpoint: keys.imageKitUrlEndpoint,
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const upload = multer().single('file');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'images')));

// app.post('banner-edit', (req, res, next) => {
//   console.log(req.body, req.file);
//   upload(req, res, (error) => {
//     if (error instanceof multer.MulterError) {
//       console.log('MULTER ERROR HAS OCCURRED');
//     } else if (error) {
//       console.log('AN UNKNOWN ERROR HAS OCCURRED');
//       console.log(error);
//     }
//   });
//   next();
// });





app.use(
  session({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;

  next();
});




app.post('/admin/banner-edit', authCheckerAndRedirecter, (req, res, next) => {
  console.log(req.body, req.file);


   upload(req, res, function(err) {

    if (err instanceof multer.MulterError) {
      console.log(err); //MULTER ERROR WHEN UPLOADING
    } else if (err) {
      console.log(err, 'UNKNOWN ERROR');
    }

    next();

   })





  // res.json({message: "Successfully uploaded file."})

  const imageData = req.file;

  const errors = validationResult(req);
  const validationErrors = errors.array();
  console.log(validationErrors);

  const pageName = req.pageName;

  if (!imageData) {
    return res.status(422).render('admin/edit-page', {
      pageTitle: 'Admin Edit Page',
      path: 'admin/edit-page',
      errorMessage: 'O arquivo enviado não é uma imagem.',
      validationErrors: validationErrors,
    });
  }

  if (validationErrors.length > 0) {
    console.log(validationErrors);

    return res.status(422).render('admin/edit-page', {
      pageTitle: 'Admin Edit Page',
      path: 'admin/edit-page',
      errorMessage: errors.array()[0].msg,
      validationErrors: validationErrors,
    });
  }

  console.log(req.body, 'LINE');
  console.log(req.file);

  if (imageData) {
    imageKit.upload(
      {
        file: req.file,
        fileName: req.filename,
        folder: 'background_images',
      },
      (err, response) => {
        if (err) {
          return res.status(500).json({
            status: 'failed',
            message:
              'An error occured during the file upload. Please try again.',
          });
        }

        res.json({ status: 'success', message: 'Successfully uploaded file.' });
      }
    );
  }
});





const csrfProtection = csrf();

// app.use(
//   session({
//     secret: keys.sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

app.use(flash());

app.use(csrfProtection);

// app.use((req, res, next) => {
//   res.locals.isLoggedIn = req.session.isLoggedIn;

//   next();
// });

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

// next();

app.use('/admin', isAuth, adminRoutes);
app.use(indexRoutes);
app.use(authRoutes);

app.get(errorController.error500);
app.use(errorController.error404);

const serverPort = 8080;

mongoose
  .connect(MONGODB_URI)
  .then((_result) => {
    app.listen(process.env.PORT || serverPort);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(serverPort);
