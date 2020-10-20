import production from './production'
import development from './development'
import dotenv from 'dotenv';
dotenv.config();
const { NODE_ENV } = process.env


let currentEnviroment = development

if(NODE_ENV === 'production'){
    currentEnviroment = production;
}

export default currentEnviroment;