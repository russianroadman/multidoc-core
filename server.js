const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const load = require("./document/builder");

const jp = bp.json()
const app = express()
const port = 8080

