import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onServiceCreate, onServiceUpdate } from './functions/service-functions';

admin.initializeApp(functions.config().firebase);

exports.onServiceCreated = onServiceCreate();

exports.onServiceUpdate = onServiceUpdate();