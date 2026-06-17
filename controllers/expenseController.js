import { Expense } from "../models/expense.js";

//1. Fucntion to add a new expense
export const addExpense = async (req, res) => {

    try {
        let {title , amount , category} = req.body

        amount = Number(amount)

        //validation

        if(!title || title.trim() == ""){
            res.status(400).json({message : "Please provide a valid title for the expense"})
            return
        }

        if(!amount || amount <= 0 || isNaN(amount) ){
            res.status(400).json({message : "Please provide a valid amount for the expense"})
            return
        }

        if(!category || category.trim() == ""){
            res.status(400).json({message : "Please provide a valid category for the expense"})
            return
        }

      //creating an expense object in MongoDB
        const expense = await Expense.create ({
            title,
            amount,
            category,
            userId: req.user.id
        })

        res.status(201).json({
        message: "Expense added successfully",
        expense
        })
    }

    catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
    }
};



//2. FUnction to list all the expenses
export const listExpense = async (req, res) => {

    try {

        const page =
            parseInt(req.query.page) || 1;

        const limit =
            parseInt(req.query.limit) || 5;

        const skip =
            (page - 1) * limit;

        const totalDocuments =
            await Expense.countDocuments({
                userId: req.user.id
            });

        const expenses =
            await Expense.find({
                userId: req.user.id
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        if (expenses.length === 0) {
            return res.status(404).json({
                message: "No expenses found"
            });
        }

        const totalPages =
            Math.ceil(totalDocuments / limit);

        const response = {
            page,
            limit,
            totalDocuments,
            totalPages,
            expenses
        };

        if (page > 1) {
            response.prev = {
                page: page - 1,
                limit
            };
        }

        if (page < totalPages) {
            response.next = {
                page: page + 1,
                limit
            };
        }

        return res.status(200).json(response);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
};


//3. Function to update the expense

export const updateExpense = async (req, res) => {

    try {

        const { id } = req.params;
        let { title, amount, category } = req.body;

        const updateData = {};

        // Validation + building update object

        if (title) {

            if (title.trim() === "") {
                return res.status(400).json({
                    message: "Invalid title"
                });
            }

            updateData.title = title;
        }

        if (amount !== undefined) {

            amount = Number(amount);

            if (isNaN(amount) || amount <= 0) {
                return res.status(400).json({
                    message: "Invalid amount"
                });
            }

            updateData.amount = amount;
        }

        if (category) {

            if (category.trim() === "") {
                return res.status(400).json({
                    message: "Invalid category"
                });
            }

            updateData.category = category;
        }

        // No fields provided
        //Object.Keys(any_object) , this checks if the fields were provided or not to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        // Find expense + verify ownership + update
        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: id,
                userId: req.user.id
            },
            updateData,
            {
                new: true
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message: "Expense updated successfully",
            expense: updatedExpense
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
     



//4>Function to delete the expense
export const deleteExpense = async (req, res) => {

    try{

        const {id} = req.params  //obtained from the url

        const deletedExpense = await Expense.findOneAndDelete( {
              
                _id: id, // this is the expense-id for each expense for the same user
                userId: req.user.id
           
        })

        if(!deletedExpense) {
            res.status(404).json({message : "Specified ID was not found"})
            return
        }
 
        res.status(200).json({
            message : `Specified expense delted successfully` ,
        }) 

    }
    catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
    }  
};

//5.Function to filter by category

export const filterByCat = async(req, res) => {

    try{

        const {category} = req.params

        if(!category || category.trim() == ""){
            res.status(400).json({message : "Please provide a valid category for the expense"})
            return
        }
        
        const filteredCategory = await Expense.find({
            userId: req.user.id,
            category: {
                $regex: new RegExp(`^${category}$`, "i") // i : case-insensitive i.e food = Food
            }
        });

        if(filteredCategory.length === 0){
            res.status(404).json({message : "Specified category not found"})
        }

        res.status(200).json({
            reqCategory : category ,
            Count : filteredCategory.length,
            List : filteredCategory
        })

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};




// helper functions

    // 1. Custom filtering by days of week
async function pastDays( days , userId) {

        const today = new Date();
        const oldDate = new Date();
        

        oldDate.setDate(today.getDate() - days);
        
        //filtering accordingly
        // expenses.date => today's date , weekAgo => 7 days ago
        // expenses.date >= weekAgo i.e showing expenses of last 7 days upto today's date
        
        //MongoDB filters automatically
        const result = await Expense.find({
            userId,
            date: { $gte: oldDate }
        });
        return result;
}


    //2. Custom filtering by months

async function pastMonths( months , userId) {
        const today = new Date();

        const oldDate = new Date();

        oldDate.setMonth(today.getMonth() - months)

        const result = await Expense.find({
        userId,
        date: { $gte: oldDate }
        });

        return result;
}

    //3. Custom Range given by user

async function customRange( from , to , userId){
       
        const start = new Date(from);
        const end = new Date(to);

        const result = await Expense.find({
                userId ,
                date: {
                    $gte: new Date(from),
                    $lte: new Date(to)
                }
            });

        return result;

    }

// 6. Main function to filter expenses by time

export const filterExpensesByTime = async(req,res)=>{
    try{

        const  { period  , days , months , from , to } = req.query;
        let result ;

        switch (period) {
            //1.Days or Weeks
            case "days":
                if(!days || isNaN(days) || Number(days) <= 0){
                    return res.status(400).json({
                        message: "Invalid days value"
                    });
                }

                result = await pastDays( Number(days) , req.user.id);
             break;


            //2.Months
            case "months":
                if(!months || isNaN(months) || Number(months) <= 0){
                    return res.status(400).json({
                        message: "Invalid months value"
                    });
                }
                result = await pastMonths( Number(months) , req.user.id);
             break;

            //3. Custom range
            case "custom":
                if(!from || !to || isNaN(new Date(from).getTime()) || isNaN(new Date(to).getTime()) || new Date(from) > new Date(to)){
                    return res.status(400).json({
                        message: "Please provide valid (from) and (to) dates"
                    });
                }
                result = await customRange( from, to , req.user.id);
             break;


            default:
                 return res.status(400).json({
                    message: "Invalid filter period"
                });

        }

        return res.status(200).json({
            filter: period,
            count: result.length,
            expenses: result
        });
    }

    catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Internal server error"
            });
    }
};



// 7 Function to calculate summary

export const expenseSummary = async(req, res) =>{

    try{
        
        const userExpenses = await Expense.find({userId : req.user.id})

        const transactions = userExpenses.length;
    

        if(transactions === 0) {
            res.status(404).json({message : "No expenses found for this user."})
            return
        }

        const total = userExpenses.reduce(
        (sum, expense) => sum + expense.amount,0
        );


        res.status(200).json({
            summary : {
            totalTransactions : transactions ,
            totalExpense : total 
            }
        })

    }

    catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


//helper function to filter by category

async function getExpensesByCategory(category , userId){

    const result = Expense.find({
        userId ,
        category: {
                $regex: new RegExp(`^${category}$`, "i") // i : case-insensitive i.e food = Food
            }
    } )
    return result;
}

// 8 . Summary by category
export const categorySummary = async(req,res) => {

    try{
        
        const { category } = req.params

        if(!category || category.trim() == ""){
            res.status(400).json({message : "Please provide a valid category for the expense"})
            return
        } 

        //Now filtering the expenses by category for that user
        const filteredCategory = await getExpensesByCategory ( category , req.user.id)

        if( filteredCategory.length === 0) {
                res.status(404).json({message : "Specified category not found for this user."})
                return
            }

            const total = filteredCategory.reduce(
            (sum, expense) => sum + expense.amount,0
            );

            res.status(200).json({
                summary: {
                    category,
                    totalTransactions: filteredCategory.length,
                    categoryExpense: total
                }
            })
    }

    catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

    
