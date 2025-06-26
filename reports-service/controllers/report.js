const Report  = require('../models/report');


async function list (req, res){
    const doctorId = req.user_id
    console.log('doctorId', doctorId)
    try {
        const reports = await Report.findAll({where: {
            id_doctor: doctorId
        }})
        return res.json(reports);
    } catch (err) {
        return res.status(500).json({error: "Database error"})
    }
}

async function listpatient (req, res){
    const patientId = req.user_id
    try {
        const reports = await Report.findAll({where: {
            id_patient: patientId
        }})
        return res.json(reports);
    } catch (err) {
        return res.status(500).json({error: "Database error"})
    }
}

async function read (req, res){
    const reportId = req.params.id
    try{
        const report = await Report.findByPk(reportId)
        res.json(report)
    } catch (err){
        res.status(500).json({error: "Database error"})
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
        await Report.create(report)
        res.json({
            'message': "Report created succesfully"
        })
    } catch (err) {
        res.status(500).json({"error": `Database error: ${err}, ${JSON.stringify(req.body)}`})
    }
}

async function update (req, res){
    const id = req.params.id;
    try{
        Report.update(req.body, {
            where: {id: id}
        })
        res.json({
            'message': "Report updated successfully"
        })
    } catch (err) {
        res.status(500).json({error: 'Cannot update report'})
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
        message: "can not delete report"
    }
}

module.exports = {
    list,
    read,
    create,
    update,
    remove,
    listpatient
}
