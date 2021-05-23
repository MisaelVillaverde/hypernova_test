const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET ALL THE REPORTS
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.end(JSON.stringify(reports, null, 2));
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMIT THE REPORT
router.post('/', async (req, res) => {
  const report = new Report({
    concept: req.body.concept,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    info: req.body.info,
    approvedBy: req.body.approvedBy,
  });

  try {
    const savedReport = await report.save();
    res.json(savedReport);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// GET SPECIFIC REPORT
router.get('/:reportId', async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId);
    res.json(report);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE REPORT
router.delete('/:reportId', async (req, res) => {
  try {
    const report = await Report.deleteOne({ _id: req.params.reportId });
    res.json(report);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
