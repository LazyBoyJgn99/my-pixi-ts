import { useEffect, useRef } from 'react';
import { Application, ICanvas, Sprite, Texture } from 'pixi.js';
import useGame from './hooks/useGame';
import logo from './logo.svg';
import './App.css';
import { GameContainer } from './game-object/create-unit';
import { BumpSpace } from './game-object/bump-space';
import { HitDirection } from './utils/game';

const gameNode = ({ app, x, y, name, v }: { app: Application<ICanvas>, x?: number, y?: number, name?: string, v?: number }) => {
  const container = new GameContainer({
    name,
    v,
    width: 50,
    height: 50,
    onHit: (item, hitDir) => {
      console.log('hit', item.name);
      switch (hitDir) {
        case HitDirection.B:
          item.speedY = -Math.abs(item.speedY);
          break;
        case HitDirection.T:
          item.speedY = Math.abs(item.speedY);
          break;
        case HitDirection.L:
          item.speedX = Math.abs(item.speedX);
          break;
        case HitDirection.R:
          item.speedX = -Math.abs(item.speedX);
          break;
        case HitDirection.TR:
          item.speedY = Math.abs(item.speedY);
          item.speedX = -Math.abs(item.speedX);
          break;
        case HitDirection.TL:
          item.speedY = Math.abs(item.speedY);
          item.speedX = Math.abs(item.speedX);
          break;
        case HitDirection.BR:
          item.speedY = -Math.abs(item.speedY);
          item.speedX = -Math.abs(item.speedX);
          break;
        case HitDirection.BL:
          item.speedY = -Math.abs(item.speedY);
          item.speedX = Math.abs(item.speedX);
          break;
        default:
          item.speedX = -item.speedX;
          item.speedY = -item.speedY;
          break;
      }

    }
  });
  // container.width = 50
  // container.height = 50

  // Create a new texture
  const texture = Texture.from(logo);
  const bunny = new Sprite(texture);
  bunny.anchor.set(0.5);
  container.addChild(bunny);
  container.x = x || 0;
  container.y = y || 0;


  app.ticker.add((delta) => {
    container.width = 50
    container.height = 50
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
    if (container.x < 0 || container.x > app.screen.width) {
      container.speedX = -container.speedX
    }
    if (container.y < 0 || container.y > app.screen.width) {
      container.speedY = -container.speedY
    }
    container.run();
  });
  return container
}

function App() {
  const myRef = useRef<HTMLDivElement>(null)
  const { app } = useGame({ myRef: myRef, background: '#1099bb' })

  useEffect(() => {
    if (!app) {
      return;
    }
    const bumpSpace = new BumpSpace();
    // [50, 250], [250, 250],
    [[50, 50], [50, 250], [250, 250], [200, 50], [100, 100], [300, 100], [100, 250], [250, 0]].map((item, i) => {
      const container = gameNode({ app: app, x: item[0], y: item[1], name: `元素${i}`, v: i % 3 })
      bumpSpace.add(container)
      app.stage.addChild(container);
    })

    app.ticker.add(() => {
      bumpSpace.run();
    });

  }, [app])

  return (
    <div className="App" >
      <div className='game1' ref={myRef} />
    </div>
  );
}

export default App;
