var cron = require('node-cron');

// run every 15th minute of hour
// cron.schedule('*/15 * * * *', () => {
//     console.log('running a task every minute');
// });


cron.schedule('* * * * *', () => {
 //   console.log('running a task every minute');
});