import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onAvaliatedUpdated, onAvaliatedCreated, onProfileRatedByOldAvaliation, onProfileRatedByNewAvaliation } from './functions/avaliation-functions';
import { onSolicitationUpdate, onSolicitationCreate } from './functions/solicitation-functions';

admin.initializeApp(functions.config().firebase);

exports.onSolicitationCreate = onSolicitationCreate();

exports.onSolicitationUpdate = onSolicitationUpdate();

exports.onAvaliationCreated = onAvaliatedCreated();

exports.onAvaliationUpdated = onAvaliatedUpdated();

exports.onProfileRatedByNewAvaliation = onProfileRatedByNewAvaliation();

exports.onProfileRatedByOldAvaliation = onProfileRatedByOldAvaliation();