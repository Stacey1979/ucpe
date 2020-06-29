# ucpe

[![CircleCI](https://circleci.com/gh/thinkshout/ucpe.svg?style=shield)](https://circleci.com/gh/thinkshout/ucpe)
[![Dashboard ucpe](https://img.shields.io/badge/dashboard-ucpe-yellow.svg)](https://dashboard.pantheon.io/sites/d3f50927-9ebf-4479-8d38-a06824918c15#dev/code)
[![Dev Site ucpe](https://img.shields.io/badge/site-ucpe-blue.svg)](http://dev-ucpe.pantheonsite.io/)

# Local Development

Local development for this site is done using [Lando](https://docs.lando.dev/config/pantheon.html).

## Requirements

You must have the following on your machine to build this site:

1. A console/terminal, where you can type commands. 
2. Git version 2.19.0 or later. You can test this by typing `git version` into your console.
3. [Lando](https://docs.lando.dev/basics/installation.html) version v3.0.0-rrc.3 or later. You can test this by typing `lando version` into your console.
4. The ability to visit [The ucpe Pantheon dashboard](https://dashboard.pantheon.io/sites/d3f50927-9ebf-4479-8d38-a06824918c15#dev/code) -- you'll need this to authenticate with Lando and pull down code.

## First time building

1. Pull down this repository. If you are on a Mac, place it somewhere OUTSIDE of the `~/Sites` directory.

    ```yaml
    git clone git@github.com:thinkshout/ucpe.git
    ```

2. Start up lando so you can run composer install:

    ```yaml
    lando start
    lando composer install
    ```

3. Continue to the [Each time you begin a new set of work.](#each-time-you-begin-a-new-set-of-work) instructions below.

## Each time you begin a new set of work.

1. From within the root of this repo, see if lando is already running:
    ```yaml
    lando list --app=ucpe
    ```

    If not, start it up and verify you're logged in to Pantheon:
    ```yaml
    lando start
    lando terminus auth:whoami
    ```

    You can also get the list of available urls using `lando info` to get lots of information. You can also show urls for your lando site using:
    
    ```yaml
    lando info | grep urls
    ```
    
    
    If Pantheon doesn't know who you are, you can log in with:

    ```yaml
    lando terminus auth:login
    ```

    You can avoid this step by adding an SSH key to pantheon from your local machine (change the path as needed):

    ```yaml
    terminus ssh-key:add ~/.ssh/id_rsa.pub
    ```

    Or you can do it [through the Pantheon UI](https://pantheon.io/docs/ssh-keys).

2. Pull the latest database backup down from Pantheon:

    ```yaml
    lando composer db-install
    ```

    If the last backup on Pantheon is old, you can refresh it with:
    ```yaml
    lando composer refresh-pantheon-backup
    ```

    You should now have a built site at https://ucpe.lndo.site:44??/ (you can get the port from `lando info` -- look for the https one) with the latest code from the [dev server](http://dev-ucpe.pantheonsite.io/)

3. Create a new branch for your changes:

    ```yaml
    git checkout -b issue-#-my-work
    ```

4. Sync configuration:

    ```yaml
    lando drush cim -y
    ```

    You are now ready to work on your new feature!

# Development workflow
See the wiki for a video and flowchart of the [development workflow](https://github.com/thinkshout/ucpe/wiki/Development-workflow).

# How to...

## Log into the site as user 1

```yaml
lando drush user:login
```

## Install a new module

```yaml
lando composer require drupal/the_module
lando drush en the_module
```

## Fix phpcs errors

If you are having failing circle tests, you might have a code sniffer error (usually for things like extra spaces). You
can run the code sniff fixer to clean up many of these automatically:

```yaml
lando composer -n code-sniff-fix
```

You can validate you got everything by testing locally too:

```yaml
lando composer -n code-sniff
```

## Debug Behat failures

In Lando, run:

```yaml
lando ssh
./vendor/bin/behat --config=tests/behat/behat-lando.yml
```

## Build your theme

Instructions are in the [theme's README](https://github.com/thinkshout/ucpe/tree/master/web/themes/custom/ucpe_theme/README.md).

All commands in that README.md should be run within your theme directory

```yaml
cd web/themes/custom/ucpe_theme
```

## Work with the Visual Regression (backstop) tool

You can add items to the Visual Regression tool [BackstopJS](https://github.com/garris/BackstopJS#backstopjs) that runs with each new pull request by altering the file at `.ci/test/visual-regression/backstopConfig.js`. It will test against any paths in the `pathsToTest` variable:

```
const pathsToTest = {
    'Homepage': '/',
    'Hello World': '/hello-world/',
}
```

You can also alter which screen sizes you take comparisons at by changing the `viewports` configuration.

