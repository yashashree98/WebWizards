import * as Mongoose from "mongoose";
import { IBudgetModel } from "../interfaces/IBudgetModel";
import { DataAccess } from "../DataAccess";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class BudgetModel{
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
            this.model = mongooseConnection.model<IBudgetModel>("budget",this.schema)
        }
        catch(e){
            console.error(e)
        }
    }

    public createSchema(){
        this.schema = new Mongoose.Schema({userId : String ,  name : String , description : String} ,{collection : "budget"} )
    }

    public async getAllBudget(): Promise<IBudgetModel[]> {
        try {
            return await this.model.find().exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    public async getAllBudgetByUser(userId : Mongoose.Types.ObjectId): Promise<IBudgetModel[]> {
        try {
            return await this.model.find({userId}).exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getOneBudgetById(id: string): Promise<IBudgetModel | null> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    public async createBudget(budgetData: IBudgetModel): Promise<IBudgetModel> {
        try {
            const budget = new this.model(budgetData);
            return await budget.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async updateBudget(budgetId: string, budgetData: Partial<IBudgetModel>): Promise<IBudgetModel | null> {
        try {
            return await this.model.findByIdAndUpdate(budgetId, budgetData, { new: true });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async deleteBudget(budgetId: string): Promise<boolean> {
        try {
            const result = await this.model.findByIdAndDelete(budgetId);
            return !!result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
export{BudgetModel}