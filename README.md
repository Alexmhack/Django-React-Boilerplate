# Django-React-Boilerplate
Boilerplate project for Django2 and React integration and making things easy for development.

# Introduction
This repo contains a ready to use boilerplate for developing a project with Django2 and React integrated to
make awesome frontend components alongside django templates.

**Please note that this boilerplate is not complete react frontend and django backend but a combination of
both react and django frontend, React components inside Django templates.**

We have made defined some custom command that can be used with react for renaming and copying the react 
build files and folders in the django static files folder. This way we don't have to run build and rename and copy paste the build files in django static files folder.

Here django's **static files folder** is referred to the folder that django uses to serve the **CSS, JS, MEDIA** files in local environment for example,

```
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

Now the files that are placed in the **static** folder will be used to serve in the django templates using 
**staic** template tag,

```
{% load static %}
...
<script src="{% static 'js/output/app.js' %}"></script>
```

If you run django `collectstatic` command then all the files from **static** folder will be copied to 
`STATIC_ROOT` folder which is **staticfiles**.

# Usage
Just git clone this repo and install python dependencies using either of the ways given below,

**If you use pipenv then run below command where *Pipfile* exists**
```
pipenv install
```

Now install npm packages by running,

```
cd frontend
npm install
```

This will install all the dependencies of our React project.

Now we can simply run the django server and go at [http://127.0.0.1:8000/](http://127.0.0.1:8000/) and
you will find the default react project page.

Make any change in the **frontend/App.js** file and run

```
# from frontend folder
npm run collect
```

The above command is defined in the **frontend/package.json** file in the `"scripts"`. What this 
command does is,

1. Run build command for react files => `npm run build`
2. Rename the build folder files => `npm run build-rename`
	What happens by renaming is that we can easily refer to that file only once rather than changing the file name again after running build command.
3. Copying the build folder files into django's `STATICFILES_DIRS` folder.
	`npm run copy-buildfiles` copies the files into respective folders inside `staticfiles` folder (we use staticfiles folder)
4. Runs collecstatic command of django which collects these files in `STATIC_ROOT` folder for production serving.

After running the `collect` command you just need to **refresh** the browser and you will find 
the changes in the webpage.

# Creation
You can follow the below steps to integrate django and react from scratch yourself in your local 
machine.

1. Create a virtualenv or virtual environment for python, either use [pipenv](https://docs.pipenv.org/en/latest/) or [virtualenv](https://virtualenv.pypa.io/en/latest/) or any other virtual environment tool that you wish to use.
	
	**using pipenv**
	```
	pip install pipenv
	pipenv install django djangorestframework django-cors-headers
	```

	**using virtualenv**
	```
	pip install virtualenv
	virtualenv env
	# for windows
	cd env/Scripts/
	activate
	# for linux or macos
	source env/bin/activate
	# now install modules
	pip install django djangorestframework django-cors-headers 
	```

2. Start django project and react app, make sure your virtualenv is activated
	```
	django-admin startproject boilerplate .
	npx create-react-app frontend
	```

3. Add the commands from **frontend/package.json** file from this repo to your **package.json** file

	```
    "collect": "react-scripts build && npm run build-rename && npm run copy-buildfiles && npm run collectstatic",
    "build-rename": "npm run build-rename-js && npm run build-rename-css && npm run build-rename-logo",
    "build-rename-logo": "renamer --regex --find \"([^\\.])\\.[^\\.]+\\.(\\w+)\" --replace \"$1.$2\" build/static/media/*",
    "build-rename-js": "renamer --regex --find \"main\\.[^\\.]+\\.js\" --replace \"reactify-django.ui.js\" build/static/js/*.js",
    "build-rename-css": "renamer --regex --find \"main\\.[^\\.]+\\.css\" --replace \"reactify-django.ui.css\" build/static/css/*.css",
    "copy-buildfiles": "npm run copy-build-js && npm run copy-build-css && npm run copy-build-logo",
    "copy-build-logo": "copyfiles -f \"build/static/media/*\" \"../static/img/\"",
    "copy-build-js": "copyfiles -f \"build/static/js/*.js\" \"../static/js/\"",
    "copy-build-css": "copyfiles -f \"build/static/css/*.css\" \"../static/css/\"",
    "collectstatic": "python ../manage.py collectstatic --no-input"
	```

	Wondering why we have used `\"` or double quote instead of `'` or single quote is because the single quotes will work in terminal but not in windows's command prompt.

4. Before running `npm run collect` install two more dependencies, `npm install renamer copyfiles`.

5. Now define the `STATICFILES_DIRS` & `STATIC_ROOT` settings in **boileplate/settings.py** file and they should be have the same name as we have used in the **package.json** file.

	```
	STATICFILES_DIRS = [
	    os.path.join(BASE_DIR, 'static'), 
	]
	STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
	```

6. Run the command,
	```
	npm run collect
	```
	from the **fronten** folder and when done open the **static** and **staticfiles** folder in project's root folder and you will the react build files are now copied there and ready to be used in django templates.

7. To use the react component, you need to use the **div** element with id **root** as with react, ofcourse you change the **id** to whatever you wish inside **frontend/src/index.js** file.

	**Inside the django template**
	```
	...
	<head>
		<link rel='stylesheet' href="{% static 'css/reactify-django.ui.css' %}">
	</head>
	<body>
		...
		<div id="root"></div>
		...
		<script src="{% static 'js/reactify-django.ui.js' %}"></script>
	</body>
	...
	```

If we have missed something here please refer to this repo code for integration process.
