﻿# muro

> muro ['muro] (Spanish) - wall

Do you have many dashboards? Do you want to show them in a big screen for your
team? Did you run out of screens?

Muro is our attempt to solve all that:

- Embbed your dashboards/data in layouts.
- Rotate them with a schedule throughout the day.
- Show valuable information for your team like Bitcoin value or weather forecast
  aside your business dashboards.

# Usage

## Docker

Docker container is used for test deployment. After every change you need to
rebuild the Dockerfile unsing `make`.

```
$ make build
```

By default muro uses sqlite mounted as a voulume in the container. (See the
`Makefile` for more details). That means that the first time you use the
container you must initialize the database like this:
```
$ make login
root@muro$ ./manage.py migrate
root@muro$ ./manage.py createsuperuser
```

# To do 

## Basic functionalities

- [x] Pages, pictures, embedded javascript are _bricks_.
- [x] _Bricks_ are organized in layouts or _muros_.
- [x] _muros_ rotates smoothly throughout the day.
- [ ] Each _muro_ can be in the rotation only during a configured interval of 
    time.
- [ ] Overlay _bricks_ on top of all the others during a 
    configured interval of time. _Layout priorities?_
    e.g.: During the stand up meeting of my team I want my ticket dashboard.
- [ ] Auto-hiding menu to pause, configure or reload the page.

## Goodies

- [ ] Web interface for setting the configuration.
- [ ] Widget overlay.
    e.g.: Show text on the top of the screen.
- [ ] External triggers.
    eg.: Slack new messages from '#urgent' channel shown on top of the rotation.

# Restrictions

- We have a Samsung smart TV using [Tizen Browser 2.0.2](https://developer.tizen.org/development/guides)
