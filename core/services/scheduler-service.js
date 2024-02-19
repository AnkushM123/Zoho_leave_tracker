const cron = require('node-cron');
const leaveRecordModel = require('../schema/leaveRecord-schema');

const task = async () => {
    try {
        await leaveRecordModel.updateMany({ leaveId: '659bc3c101e2f1640c262616' }, { $inc: { balance: 1.5 } });
    } catch (error) {
        throw Error(error);
    }
};

cron.schedule('0 0 1 * *', task);