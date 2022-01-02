import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        destination: function(request, file, cb){
           const destination =  path.join(__dirname, 'public');
           cb(null, destination);
        },
        filename: (request, file, callBack) => {
            const filename = `${Date.now()}-${file.originalname}`;
            callBack(null, filename);
        }
    })
}

