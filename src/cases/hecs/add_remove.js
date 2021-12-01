
import * as HECS from 'hecs'
const { Component, System, Not, World } = HECS.default

class A extends Component {
  static props = {};
}

class B extends Component {
  static props = {};
}

class AddB extends System {
  static queries = {
    entities: [A, Not(B)],
  };

  update() {
    this.queries.entities.forEach((entity) => {
      entity.add(B);
    });
  }
}

class RemoveB extends System {
  static queries = {
    entities: [B],
  };

  execute() {
    this.queries.entities.forEach((entity) => {
      entity.remove(B);
    });
  }
}

export default (count) => {
  let world = new World({
    systems: [AddB, RemoveB],
    components: [A, B]
  });

  for (let i = 0; i < count; i++) {
    world.entities.create().add(A).activate();
  }

  return () => {
    world.update();
  };
};
