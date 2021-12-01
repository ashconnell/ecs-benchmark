import * as HECS from 'hecs'
const { Component, System, NumberType, Not, World } = HECS.default

class A extends Component {
  static props = {
    value: { type: NumberType },
  };
}

class B extends Component {
  static props = {
    value: { type: NumberType },
  };
}

class C extends Component {
  static props = {
    value: { type: NumberType },
  };
}

class D extends Component {
  static props = {
    value: { type: NumberType },
  };
}

class E extends Component {
  static props = {
    value: { type: NumberType },
  };
}

class ASystem extends System {
  static queries = {
    entities: [A]
  };

  update() {
    this.queries.entities.forEach((entity) => {
      entity.get(A).value *= 2;
    });
  }
}

class BSystem extends System {
  static queries = {
    entities: [B]
  };

  update() {
    this.queries.entities.forEach((entity) => {
      entity.get(B).value *= 2;
    });
  }
}

class CSystem extends System {
  static queries = {
    entities: [C]
  };

  update() {
    this.queries.entities.forEach((entity) => {
      entity.get(C).value *= 2;
    });
  }
}

class DSystem extends System {
  static queries = {
    entities: [D]
  };

  update() {
    this.queries.entities.forEach((entity) => {
      entity.get(D).value *= 2;
    });
  }
}

class ESystem extends System {
  static queries = {
    entities: [E]
  };

  update() {
    this.queries.entities.forEach((entity) => {
      entity.get(E).value *= 2;
    });
  }
}

export default (count) => {
  let world = new World({
    systems: [ASystem, BSystem, CSystem, DSystem, ESystem],
    components: [A,B,C,D,E],
  });

  for (let i = 0; i < count; i++) {
    world
      .entities
      .create()
      .add(A, { value: 0 })
      .add(B, { value: 0 })
      .add(C, { value: 0 })
      .add(D, { value: 0 })
      .add(E, { value: 0 })
      .activate();
  }

  return () => {
    world.update();
  };
};
