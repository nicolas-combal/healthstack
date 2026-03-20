const Report  = require('../models/report');

async function list (req, res){
    const doctorId = req.user_id
    console.log('doctorId', doctorId)
    try {
        const reports = await Report.findAll({where: {
            id_doctor: doctorId
        }});
        if (!reports.length) {
            throw new AppError('NO_REPORTS', 'No reports found for this doctor', 404);
        }
        return res.json(reports);
    } catch (err) {
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}

async function listpatient (req, res){
    const patientId = req.user_id
    try {
        const reports = await Report.findAll({where: {
            id_patient: patientId
        }});
        if (!reports.length) {
            throw new AppError('NO_REPORTS', 'No reports found for this patient', 404);
        }
        return res.json(reports);
    } catch (err) {
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}

async function read (req, res){
    const reportId = req.params.id
    try{
        const report = await Report.findByPk(reportId)
        if (!report) {
            throw new AppError('REPORT_NOT_FOUND', 'Report not found', 404);
        }
        res.json(report)
    } catch (err){
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}

async function create (req, res){
    const report = {
        id_doctor: req.body.id_doctor,
        id_patient: req.body.id_patient,
        text: req.body.text
    };
    console.log('report', report)
    try {
        await Report.create(report);
        res.json({
            'message': "Report created succesfully"
        })
    } catch (err) {
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}

async function update (req, res){
    const id = req.params.id;
    try{
        Report.update(req.body, {
            where: {id: id}
        });
        res.json({
            'message': "Report updated successfully"
        })
    } catch (err) {
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}

async function remove (req, res){
    const id = req.params.id
    try{
        Report.destroy({
            where: {id: id}
        });
        res.json({
            'message': 'report deleted succesfully'
        })
    } catch (err){
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}


async function countPatientsByDoctor(req, res) {
    try {
      const number = Math.floor(Math.random() * 21);

      res.json({
        value: number
      });

    } catch (err) {
        throw new AppError(err.code || 'INTERNAL_ERROR', err.message || 'Internal error', err.status || 500);
    }
}


module.exports = {
    list,
    read,
    create,
    update,
    remove,
    listpatient,
    countPatientsByDoctor
}
