import { Container } from 'typedi';
import agendaFactory from './agenda';

export default ({ mongoConnection, models }: { mongoConnection; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
      console.log('m-->',m.name)
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set('agendaInstance', agendaInstance);

  console.log(' Agenda injected into container ');

    return { agenda: agendaInstance };
  } catch (e) {
    console.log('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
