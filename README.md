# Macguider firebase-backend

Deprecated Backend Repository for [Macguider](https://macguider.io)

(Firebase Functions, Firestore)

## Execution Guides

### Firebase CLI Configuration

```bash
$ npm install -g firebase-tools
$ firebase login
```

### Installation

```bash
$ cd functions
$ npm install
```

### Environment Configuration

#### Environment Variable Registration

```bash
$ firebase functions:config:set fooobj.barproperty="somestring"
```

#### Local Environment Setup

```bash
$ firebase functions:config:get > .runtimeconfig.json
```

### Execution

#### Local Serve

```bash
$ npm run serve
```

#### Deployment

```bash
$ npm run deploy
```
