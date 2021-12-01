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

class SpawnB extends System {
  static queries = {
    entities: [A],
  };

  update() {
    this.queries.entities.forEach((entity) => {
      let value = entity.get(A).value;
      this.world.entities.create().add(B, { value });
      this.world.entities.create().add(B, { value });
    });
  }
}

class KillB extends System {
  static queries = {
    entities: [B]
  };

  execute() {
    this.queries.entities.forEach((entity) => {
      entity.destroy();
    });
  }
}

export default (count) => {
  let world = new World({
    systems: [SpawnB, KillB],
    components: [A,B]
  });

  for (let i = 0; i < count; i++) {
    world.entities.create().add(A, { value: i }).activate();
  }

  return () => {
    world.update();
  };
};
