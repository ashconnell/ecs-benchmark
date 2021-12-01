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

class ABSystem extends System {
  static queries = {
    entities: [A, B],
  };

  update() {
    this.queries.entities.forEach((entity) => {
      let a = entity.get(A);
      let b = entity.get(B);
      let x = a.value;
      a.value = b.value;
      b.value = x;
    });
  }
}

class CDSystem extends System {
  static queries = {
    entities: [C, D],
  };

  update() {
    this.queries.entities.forEach((entity) => {
      let c = entity.get(C);
      let d = entity.get(D);
      let x = c.value;
      c.value = d.value;
      d.value = x;
    });
  }
}

class CESystem extends System {
  static queries = {
    entities: [C, E],
  };

  update() {
    this.queries.entities.forEach((entity) => {
      let c = entity.get(C);
      let e = entity.get(E);
      let x = c.value;
      c.value = e.value;
      e.value = x;
    });
  }
}

export default (count) => {
  let world = new World({
    systems: [ABSystem, CDSystem, CESystem],
    components: [A,B,C,D,E],
  });

  for (let i = 0; i < count; i++) {
    world
      .entities
      .create()
      .add(A, { value: 0 })
      .add(B, { value: 1 })
      .activate();
    world
      .entities
      .create()
      .add(A, { value: 0 })
      .add(B, { value: 1 })
      .add(C, { value: 2 })
      .activate();
    world
      .entities
      .create()
      .add(A, { value: 0 })
      .add(B, { value: 1 })
      .add(C, { value: 2 })
      .add(D, { value: 3 })
      .activate();
    world
      .entities
      .create()
      .add(A, { value: 0 })
      .add(B, { value: 1 })
      .add(C, { value: 2 })
      .add(E, { value: 4 })
      .activate();
  }

  return () => {
    world.update();
  };
};
