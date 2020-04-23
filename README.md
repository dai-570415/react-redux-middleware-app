# プロジェクトダウンロード&起動

```bash
$ git clone $ git clone https://github.com/dai-570415/react-redux-middleware-app.git

$ cd react-redux-middleware-app

$ npm install

$ npm start
```

# Redux Middleware

Redux MiddlewareとはReduxの機能を拡張する仕組み
- Actionログをとる（下記にあり）
- localstorageに保存する（下記にあり）
- 非同期処理を可能にする
- クラッシュレポートを送信する
- ルーティングを利用する
etc

## Actionログをとる
redux-loggerのインストール

```bash
$ npm install --save redux-logger
```

### 使い方

```jsx:index.js
// applyMiddleware追加
import { createStore, applyMiddleware } from 'redux';

// redux-logger追加
import logger from 'redux-logger';

const store = createStore(
  tasksReducer,
  // createStoreの第2引数に追加
  applyMiddleware(logger)
);
```

「http://localhost:3000/todo」のフォームから入力したり、
追加するとコンソール上にログが表示されるようになります。

### 高度な使い方

```jsx:index.js
// createLoggerに変更
import { createLogger } from 'redux-logger';

// 追加　INPUT_TASK以外のログを出すように指定
// ここでADD_TASKのみログが取れる
const loggerSetting = {
  predicate: (getState, action) => action.type !== 'INPUT_TASK',
};
const logger = createLogger(loggerSetting);
```

## localstorageに保存するミドルウェアを実装

cf.ミドルウェアの基本形

```js
// ミドルウェアの基本形
const middleware = store => next => action => {
  const result = next(action);
  return result;
};
```

```jsx:index.js
// localstorageに保存するmiddlewareをつくる
const storageMiddleware = store => next => action => {
  const result = next(action);
  // localstorageにtodos-stateというkey名で保存
  window.localStorage.setItem('todos-state', JSON.stringify(store.getState()));
  return result;
};
// 保存されているitemを取得
const savedState = JSON.parse(localStorage.getItem('todos-state'));

// middlewareを登録する
const store = createStore(
  tasksReducer,
  // 追加
  savedState ? savedState : tasksReducer(undefined, { type: 'INIT' }),
  applyMiddleware(logger, storageMiddleware)
);

```

### middleware集約

```jsx:index.js
// middleware集約
const middlewares = [ logger, storageMiddleware ];

const store = createStore(
  //...省略
  // スプレッドオペレーターで登録
  applyMiddleware(...middlewares)
);
```