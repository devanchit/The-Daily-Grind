const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
// mongoose.connect(process.env.MONGODB_URI);


const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45w345wegw345';
const uploadMiddleware = multer({ dest: 'uploads/' });
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname +'/uploads'));

// mongoose.connect('mongodb+srv://devanshchitransh:lKPHlp0bjbIwaSrJ@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// mongoose.connect('mongodb+srv://devanshchitransh:lKPHlp0bjbIwaSrJ@cluster0.ef1jfbi.mongodb.net/HealthConnect?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://devanshchitransh:lKPHlp0bjbfwaSrJ@cluster0.ef1jfbi.mongodb.net/?retryWrites=true&w=majority');

// mongoose.connect(process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('MongoDB connection error:', err));



app.post('/register', async (req,res)=> {
    const {username,password} = req.body;

    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
        });
    } catch(e){
        res.status(400).json(e);
    }
});

app.listen(4000);

app.post('/login', async (req,res)=> {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    console.log(userDoc);
    const passOk = bcrypt.compareSync(password, userDoc.password); 
    
    if(passOk)
    {
        // loggedin
        jwt.sign({username,id:userDoc._id},secret,{}, (err,token) => {
            if(err) throw err;
            res.cookie('token',token).json({
                id: userDoc._id,
                username: userDoc.username,
            });
        }); 
    }
    else
    {
        res.status(400).json('wrong credentials');
    }

});

app.get('/profile',(req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
        if(err) throw err;
        
        res.json(info);
    });
    res.json(req.cookies);
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

app.post('/post',uploadMiddleware.single('file'), async(req,res) => {
    const {originalname,path} = req.file;  // without file it will fail.
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path + '.'+ ext;
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async(err,info) => {
        if(err) throw err;
        
        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
    });
    res.json(postDoc);
    });
    
  });


  app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      const id_update = postDoc._id;
      await postDoc.updateOne(
       {
        title,
        summary,  
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
  
      res.json(postDoc);
    });
  
  });


  app.get('/post', async (req,res) => {
    
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({createdAt: -1})
            .limit(20)
    );
  });


  app.get('/post/:id', async (req,res) => {
    
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  });
// const passOk = bcrypt.compareSync(password, userDoc.password);
//     res.json(passOk)
//mongodb+srv://devanshchitransh:lKPHlp0bjbIwaSrJ@cluster0.ef1jfbi.mongodb.net/?retryWrites=true&w=majority

//mongodb+srv://devanshchitransh:lKPHlp0bjbIwaSrJ@cluster0.1oy6pik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// nodemon index.js



// app.post('/login', async (req,res)=> {
//     const {username,password} = req.body;
//     const userDoc = await User.findOne({username});
//     res.json(userDoc);

// });