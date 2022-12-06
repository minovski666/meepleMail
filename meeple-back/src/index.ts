import connect from './utils/connect';
import {app, logger, port, mongoUri} from './app';

const start = async () => {
    await connect(mongoUri);
    app.listen(port, () => {
        logger.info(`listening on port ${port}!!!!`);
    });
};

start();
