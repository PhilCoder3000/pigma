type Event = 'pop_history';
type Subs = Partial<Record<Event, Function[]>>

class EventEmitter {
  #subs: Subs = {};

  subscribe(key: Event, func: Function) {
    if (key in this.#subs) {
      this.#subs[key]!.push(func)
    } else {
      this.#subs[key] = [func]
    }
  }

  dispatch(key: Event) {
    if (key in this.#subs) {
      this.#subs[key]!.forEach((fn) => fn())
    }
  }
}

export const eventEmitter = new EventEmitter()