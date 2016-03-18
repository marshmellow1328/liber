# Liber #

Liber is a web content management system built in NodeJS. It is designed with a few goals in mind:

- Flexible Metadata
- Independent of Presentation Environment
- Support Custom Workflow
- Support Information Lifecycle: Creation, Usage, Preservation, Destruction

## Installation Instructions ##

- Install MongoDB and Node on same server
- Install grunt-cli and bower
- Download and place /services folder on server
- Run `node app.js` to start services
- Download and place /web folder on web server
- Run `grunt dist`
- Expose /web/dist folder through web server
- Reverse proxy to services

## Bug Tracking ##
Bugs will be tracked on the [project's issue tracker](https://github.com/marshmellow1328/liber/issues).

## Contributing ##
Submit a pull request to contribute code. To contribute in other ways, create a question on the [issue tracker](https://github.com/marshmellow1328/liber/issues).

### Running Locally
- Install VirtualBox
- Install Vagrant
- Run `vagrant up` from repo
- Run `vagrant ssh`
- Run `/vagrant/runner.sh`
- Access Liber in browser at http://localhost:8080/liber/
