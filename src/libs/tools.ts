import path from "path";
import bcrypt from 'bcryptjs';

export async function comparePassword(passwordStored: string, passwordInserted: string){
  return await bcrypt.compare(passwordInserted, passwordStored);
}

export function createURLFile(basepath: string, id: string, namefile: string){
    console.log( 'ruta', `${ basepath }${id}${path.extname(namefile)}`);
    return `${ basepath }${id}${path.extname(namefile)}`;
}