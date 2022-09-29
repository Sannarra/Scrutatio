<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/EpitechMscProPromo2025/T-WEB-501-NAN-5-1-jobboard-lisa.bourdon">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">JobBoard</h3>

  <p align="center">
    An awesome jobboard to jumpstart your career!
    <br />
    <a href="https://github.com/EpitechMscProPromo2025/T-WEB-501-NAN-5-1-jobboard-lisa.bourdon"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is the first Epitech project in the Pre-MSc cursus. This project aims at realising a job board listing several job offers. 

We had some constraits:

* Use a database to store job advertisements.
* Frontend using javascript technologies.
* Administration API to manage offers with CRUD operations (Create, Read, Update and Delete)
* Administration Panel

In addition of those constraints, we aims to:
* Allow advertisements filter using search words/tags
* Add a profile page
* Save advertisements in profile for later candidature
* Show messages chat
* Ultra Dark mode


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With


Why ? We don't know, we are here for learning purposes.

* [![React][React.js]][React-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [![MySQL][mysql.com]][mysql-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You must install:

- npm
- php
- composer
- mysql

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/EpitechMscProPromo2025/T-WEB-501-NAN-5-1-jobboard-lisa.bourdon.git
   ```

2. Configure your environnment

   Rename the ".env.example" file as ".env". Create a new database and set the "*DB_\**" variables in the .env file in order to connect to your newly created database.
   
   Generate a key
   ```sh
   php artisan key:generate
   ```

   You can seed the database with random data using
   ```sh
   php artisan db:seed
   ```

3. Install composer packages
   ```sh
   composer install
   ```

4. Install NPM packages
   ```sh
   npm install
   ```

5. Update the database
   ```sh
   php artisan migrate
   ```

6. Run in two separated terminals
   ```sh
   npm run dev
   php artisan serve
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Sint nostrud commodo id deserunt dolore sunt sunt proident id reprehenderit aute laboris consequat ea. Proident commodo incididunt cillum tempor cillum magna minim officia incididunt. Officia quis culpa voluptate sint anim non reprehenderit commodo commodo culpa et in deserunt adipisicing.


_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


Some usefull links we used during the project and would like to give credit to.

* [Create a database diagram](https://dbdiagram.io/)
* [Markdown badges](https://github.com/Ileriayo/markdown-badges)
* [Readme Template](https://github.com/othneildrew/Best-README-Template)
* [Laravel 9/React install using Vite](https://larainfo.com/blogs/install-react-js-in-laravel-9-with-vite)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Laravel.com]: https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com 
[mysql.com]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[mysql-url]: https://mysql.com 
