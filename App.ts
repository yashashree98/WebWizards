import * as express from 'express';
import * as bodyParser from 'body-parser';
// import {UserModel} from './models/UserModel'; 
import {CategoryModel} from './models/CategoryModel';
import {BudgetModel} from './models/BudgetModel';
// import { OffersModel } from './models/OffersModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  // public Users : UserModel;
  public Category : CategoryModel;
  public Budget : BudgetModel;
  // public Offers : OffersModel;

  //Run configuration methods on the Express instance.
  constructor(mongoDBConnection:string)
  {
    this.expressApp = express();
    this.middleware();
    this.routes();
    // this.Users = new UserModel(mongoDBConnection);
    this.Category = new CategoryModel(mongoDBConnection);
    this.Budget = new BudgetModel(mongoDBConnection);
    // this.Offers = new OffersModel(mongoDBConnection);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use( (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
   
    //get all users
    router.get('/app/category/:categoryId/count', async (req , res) => {
      var id = req.params.categoryId;
      console.log('Query single budget with id:' +id);
      await this.Budget.retrieveBudgetCount(res , {categoryId : id});
    });

    router.get('/app/category/:categoryId', async (req, res) =>{
      var id = req.params.categoryId;
      console.log('Query single list with id:' + id);
      await this.Budget.retrieveBudgetCount(res, {categoryId : id});

    });

    router.get('/app/category/:categoryId', async (req, res) => 
      {
      var id = parseInt(req.params.categoryId);
      console.log('Query single list with id: ' + id);
      await this.Category.retrieveCategories(res, id);
    });

    router.post('/app/category/', async (req, res) => 
    {
      const id = crypto.randomBytes(16).toString("hex");
      console.log(req.body);
      var jsonObj = req.body;
      jsonObj.categoryId = id;
      try
      {
        await this.Category.model.create([jsonObj]);
        res.send('{"id""' + id + '"}');
      }
      catch(e)
      {
        console.error(e);
        console.log('object creation failed');
      }
    });

    router.post('/app/category2/', async (req, res) => 
      {
        const id = crypto.randomBytes(16).toString("hex");
        console.log(req.body);
          var jsonObj = req.body;
          jsonObj.categoryId = id;
          const doc = new this.Category.model(jsonObj);
          try 
          {
            await doc.save();
            res.send('{"id":"' + id + '"}');
          }
          catch (e) 
          {
            console.log('object creation failed');
            console.error(e);
          }        
    });

    router.get('/app/category/', async (req, res) => {
      console.log('Query All Categories');
      await this.Category.retrieveAllCategories(res);
  });

  router.get('/app/categorycount', async (req, res) => {
    console.log('Query the number of category elements in db');
    await this.Category.retrieveCategoryCount(res);
  });

    router.get('/app/category/:categoryId/budgets', async (req, res) => 
      {
        var id = req.params.categoryId;
        console.log('Query single Category with id: ' + id);
        await this.Budget.retrieveBudgetDetails(res, {categoryId: id});
    });

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname+'/app/json'));
    this.expressApp.use('/images', express.static(__dirname+'/img'));
    this.expressApp.use('/', express.static(__dirname+'/pages'));
    
  }

}

export {App};