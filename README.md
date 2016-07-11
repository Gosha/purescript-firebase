# Purescript-firebase

[![Latest release](http://img.shields.io/bower/v/purescript-firebase.svg)](https://github.com/mostalive/purescript-firebase/releases)
[![Build Status](https://travis-ci.org/mostalive/purescript-firebase.svg?branch=master)](https://travis-ci.org/mostalive/purescript-firebase)

Purescript bindings for firebase.

Status: not for public consumption just yet. It eventually should follow the [purescript style guide](https://github.com/purescript/purescript/wiki/Style-Guide).

## Building

```
pulp -w test
```

should work. For instructions on how to build from scratch, see 'travis.yml'.

## Security

There is a set of rules in test/rules.bolt, they are meant to test access denied errors. If you want to do your own experiments with it, change the database in 'test/Main.purs' and 'firebase.json' to one that you control, generate security rules with the 'bolt' compiler with

```
npm run bolt
```

and deploy the security rules

```
firebase deploy:rules
```

You'll notice that one path is open for writing by default.

## Style

The style guide recommends separating a literal translation of the API in a separate package / repository from a more purescript-ish interface. For now they are together, until we figure out what goes where. Web.Firebase.Monad.Aff has the start of a more idiomatic API. Eventually I'd like to produce signals for callbacks that can be fired more than once ( on()). That way it should be relatively easy to use firebase for uni-directional data flow with one of the many signal-based UI libraries for purescript.

Pull requests welcome. The tests will tell you what's been done so far, and what I'm thinking about doing next.

# Credits

[Pascal Hartig](https://github.com/passy) - The only purescript code I could find that was using firebase was this https://github.com/passy/giflib . I extracted the firebase code and started working from there.
