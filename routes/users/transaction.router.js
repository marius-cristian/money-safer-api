const router = require('express').Router({ mergeParams: true });
const transactionController = require('../../controllers/transactionController')();

router.post("/create-transaction", transactionController.createTransaction);
router.post("/update-transaction", transactionController.updateTransaction);
router.post("/delete-transaction", transactionController.deleteTransaction);

router.get("/all-transaction", transactionController.getAllTransactions);
router.get("/one-transaction", transactionController.getSingleTransaction);

router.get("/total-balance", transactionController.totalBalance);
router.get("/total-income", transactionController.totalIncome);
router.get("/total-outcome", transactionController.totalOutcome);

module.exports = router;