# repo_watcher
Github repository watcher

Making use of Github REST API to collect information about repositories I watch.


### Usage

> At the moment, I am using Python SimpleHTTPServer. So, if you don't have it
> installed, do it, or install some fancy npm lib to start a server for you.

1. After pulling the repository, run `npm start`
1. Go to ``http://localhost:8000/src``

### Using the page

1. Add your Github information
 - User
 - Password
 - Token, if you use 2 factor authentication
 - You can use any path from the Github REST API. Just make sure it's in the
 format ``/something/optional_Something``

 