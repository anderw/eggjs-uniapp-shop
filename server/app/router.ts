import { Application } from 'egg';
import { Blueprint } from 'egg-blueprint'

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/test1', controller.home.test);
    Blueprint(app);
};
