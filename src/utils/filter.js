import {filtersProps} from '../data';
import {isEventFuture, isEventPast} from '../utils/utils';

export const filter = {
  [filtersProps.ALL]: (events) => events.filter((event) => event),
  [filtersProps.FUTURE]: (events) => events.filter((event) => isEventFuture(event.start)),
  [filtersProps.PAST]: (events) => events.filter((event) => isEventPast(event.start)),
};