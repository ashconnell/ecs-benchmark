import * as HECS from 'hecs'
const { Component, System, NumberType, Not, World } = HECS.default

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  (name) =>
    class extends Component {
      static name = name
      static props = {
        value: { type: NumberType },
      };
    }
);

const Z = COMPS[25];

class Data extends Component {
  static props = {
    value: { type: NumberType },
  };
}

class DataSystem extends System {
  static queries = {
    entities: [Data],
  };

  update() {
    this.queries.entities.forEach((entity) => {
      let data = entity.get(Data);
      data.value *= 2;
    });
  }
}

class ZSystem extends System {
  static queries = {
    entities: [Z]
  };

  update() {
    this.queries.entities.forEach((entity) => {
      let z = entity.get(Z);
      z.value *= 2;
    });
  }
}

export default (count) => {
  let world = new World({
    systems: [DataSystem, ZSystem],
    components: [...COMPS, Data]
  });

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      world.entities
        .create()
        .add(Comp, { value: 0 })
        .add(Data, { value: 0 })
        .activate();
    }
  }

  return () => {
    world.update();
  };
};
