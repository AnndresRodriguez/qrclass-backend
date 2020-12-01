import path from "path";

export function createURLFile(basepath: string, id: string, namefile: string){
    console.log( 'ruta', `${ basepath }${id}${path.extname(namefile)}`);
    return `${ basepath }${id}${path.extname(namefile)}`;
}