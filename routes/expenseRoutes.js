import express from 'express'
const router = express.Router()

import { 
    addExpense , 
    listExpense ,
    updateExpense ,
    deleteExpense ,
    filterByCat ,
    filterExpensesByTime , 
    expenseSummary ,
    categorySummary

} from '../controllers/expenseController.js'

import authenticateToken from '../middleware/authenticateToken.js'

router.post('/add' ,authenticateToken , addExpense);

router.get('/list'  ,authenticateToken , listExpense);

router.get('/filter',authenticateToken, filterExpensesByTime);

router.put('/update/:id' ,authenticateToken, updateExpense);

router.delete('/delete/:id' ,authenticateToken, deleteExpense);

router.get('/summary', authenticateToken, expenseSummary);

router.get('/summary/category/:category', authenticateToken, categorySummary );

router.get('/category/:category',authenticateToken,filterByCat)


export default router