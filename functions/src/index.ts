import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onServiceCreate, onServiceUpdate } from './functions/service-functions';
import { onAvaliatedUpdated, onAvaliatedCreated } from './functions/avaliation-functions';

admin.initializeApp(functions.config().firebase);

exports.onServiceCreated = onServiceCreate();

exports.onServiceUpdate = onServiceUpdate();

exports.onAvaliationCreated = onAvaliatedCreated();

exports.onAvaliationUpdated = onAvaliatedUpdated();