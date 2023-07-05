import store from '../database/store';
import targets from './targets';
import collect from './collect';
import { Coupang, CoupangTarget } from '../../entity/coupang.entity';
import delay from '../util/delay';

const update = async (): Promise<void> => {
  const collectEach = async (
    promise: Promise<Coupang[]>,
    target: CoupangTarget,
  ): Promise<Coupang[]> => {
    const collection = await promise;
    await delay(Math.random() * 1000);

    const result = await collect(target);
    console.log(result);
    return [...collection, result];
  };

  const updateEach = async (object: Coupang): Promise<void> => {
    const { itemId, optionId, price, time } = object;
    const date = new Date(time).toISOString().split('T')[0];

    const items = await store
      .collection('item')
      .where('itemId', '==', itemId)
      .where('optionId', '==', optionId)
      .get();

    await Promise.all(
      items.docs.map(async (doc) => {
        await doc.ref.update({ time });
        await doc.ref.collection('coupang').doc(date).set({
          date,
          price,
        });
      }),
    );
  };

  const collection = await targets().reduce(collectEach, Promise.resolve([]));
  await Promise.all(collection.map(updateEach));
};

export default update;
