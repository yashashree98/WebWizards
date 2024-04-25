import * as Mongoose from "mongoose";
import { ICategoryModel } from "../interfaces/ICategoryModel";
import { response } from "express";
//import { DataAccess } from "../DataAccess";


class CategoryModel{
    public schema : any;
    public model : any;
    public dbConnectionString : string;
    
    public constructor(dbConnectionString : string) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();

    } 

    public async createModel(){
        try
        {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true} as Mongoose.ConnectOptions);
            this.model = Mongoose.model<ICategoryModel>("category",this.schema)
        }
        catch(e){
            console.error(e)
        }
    }

    public createSchema(){
        this.schema = new Mongoose.Schema(
            {
                categoryId : String ,  
                name : String , 
                description : String
            } ,{collection : "category"} )
    }

    public async retrieveAllCategories(response:any) //: Promise<ICategoryModel[]> 
    {
        var query = this.model.find({});
        try 
        {
            const categoryArray = await query.exec();
            response.json(categoryArray);
        } 
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async retrieveCategories(response:any, value: number) //: Promise<ICategoryModel | null> 
    {
        var query = this.model.findOne({categoryId : value})
        try 
        {
            const result = await query.exec();
            response.json(result);
        } 
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async retrieveCategoryCount(response : any) 
    {
        console.log("retrieve Category Count ...");
        var query = this.model.estimatedDocumentCount();
        try {
            const numberOfCategories = await query.exec();
            console.log("numberOfCategories: " + numberOfCategories);
            response.json(numberOfCategories);
        }
        catch (e) {
            console.error(e);
        }
    }
}
export{CategoryModel}