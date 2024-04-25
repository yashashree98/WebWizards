db = db.getSiblingDB('my_database')
db.createCollection('budget')
budgetList = db.getCollection("collectionName")
budgetList.remove({})
budgetList.insert(
    {
        budgetId:1,
        type:"expense",
        amount: 50,
        date: new Date(),
        note: "This is for groceries"
    }
)
budgetList.insert(
    {
        budgetId:2,
        type:"expense",
        amount: 8,
        date: new Date(),
        note: "Starbucks Coffee"
    }
)
budgetList.insert(
    {
        budgetId:3,
        type:"expense",
        amount: 19,
        date: new Date(),
        note: "Uber Taxi"
    }
)
budgetList.insert(
    {
        budgetId:4,
        type:"expense",
        amount: 100,
        date: new Date(),
        note: "Restaurant Bill"
    }
)