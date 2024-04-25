import * as Mongoose from "mongoose";
import { IBudgetModel } from "../interfaces/IBudgetModel";
import { DataAccess } from "../DataAccess";


class BudgetModel{
    public schema : any;
    public innerSchema : any;
    public model : any;
    public dbConnectionString : string;

    public constructor(dbConnectionString : string) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();

    } 

    public createSchema() : void 
    {
        this.schema = new Mongoose.Schema(
            {
                categoryId : String ,
                budget: [
                    {
                        budgetId : Number,
                        amount : Number,
                        date : Date,
                        note : String
                    }
                ]
                } ,{collection : "budget"} )
    }

    public async createModel(){
        try
        {
            await Mongoose.connect(this.dbConnectionString, {useNewUrlParser: true, useUnifiedTopology: true} as Mongoose.ConnectOptions);
            this.model = Mongoose.model<IBudgetModel>("Budget",this.schema)
        }
        catch(e){
            console.error(e)
        }
    }

    public async retrieveBudgetDetails(response:any, filter:Object) //: Promise<IBudgetModel[]> 
    {
        var query =  this.model.findOne(filter);
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


    public async retrieveBudgetCount(response:any, filter:Object) //: Promise<IBudgetModel[]> 
    {
        var query = this.model.findOne(filter);
        try 
        {
            const budgetList = await query.exec();
            if (budgetList == null)
                {
                    response.status(404);
                    response.json('{count: -1}');
                }
            else 
                {
                    console.log('List of Budget: ' + budgetList.budget.length);
                    response.json('{count:' + budgetList.budget.length + '}');
                    }
        } 
        catch (error) {
            console.error(error);
            throw error;
        }
    }

}
export{BudgetModel}