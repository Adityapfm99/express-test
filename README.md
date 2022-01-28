Programming Challenge Express frameworks
=========================

### Challenge Description
1. API for generate four (4) types of printable random objects and store them in a single file, each object will be separated by a ",".  These are the 4 objects: alphabetical strings, real numbers, integers, alphanumerics.

> Sample extracted output :

> hisadfnnasd, 126263, assfdgsga12348fas, 13123.123,
> lizierdjfklaasf, 123192u3kjwekhf, 89181811238,122,
> nmarcysfa900jkifh  , 3.781, 2.11, ....


2. API for total number of each random objects.

> Sample output :

> ioksjjusujjosjljslsjs - alphabetical strings
> 127393283382928371237 - integer
> asdfka1j3jr9k32348fas - alphanumeric
> 1312332223932.1000223 - real numbers

## Installation

```bash
npm install
```
or

```bash
yarn install
```

## Running the app

```bash
$ yarn start
```
or
```bash
$ npm start
```

### Endpoint 
1. [POST] /api/v1/generate --> for generate the output in ```output/output.txt```, the response will provide a link to download.
2. [GET] /api/v1/report --> total number of each random objects.
    example :   "Alphanumerics : 23,
                Integer : 7,
                Alphabetical strings : 9,
                Real numbers : 14"
