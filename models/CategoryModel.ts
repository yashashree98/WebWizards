import * as Mongoose from "mongoose";
import { ICategoryModel } from "../interfaces/ICategoryModel";
import { DataAccess } from "../DataAccess";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

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
            this.model = mongooseConnection.model<ICategoryModel>("category",this.schema)
        }
        catch(e){
            console.error(e)
        }
    }

    public createSchema(){
        this.schema = new Mongoose.Schema({userId : String ,  name : String , description : String} ,{collection : "category"} )
    }

    public async getAllCategories(): Promise<ICategoryModel[]> {
        try {
            return await this.model.find().exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    public async getAllCategoriesByUser(userId : Mongoose.Types.ObjectId): Promise<ICategoryModel[]> {
        try {
            return await this.model.find({userId}).exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getOneCategoryById(id: string): Promise<ICategoryModel | null> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    public async createCategory(categoryData: ICategoryModel): Promise<ICategoryModel> {
        try {
            const category = new this.model(categoryData);
            return await category.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async updateCategory(categoryId: string, categoryData: Partial<ICategoryModel>): Promise<ICategoryModel | null> {
        try {
            return await this.model.findByIdAndUpdate(categoryId, categoryData, { new: true });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async deleteCategory(categoryId: string): Promise<boolean> {
        try {
            const result = await this.model.findByIdAndDelete(categoryId);
            return !!result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
export{CategoryModel}