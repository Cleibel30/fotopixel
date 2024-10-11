import multer from "multer";
import path from 'path'
import { nanoid } from "nanoid";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/publicaciones');
        console.log(req.file)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nombre = nanoid()
        cb(null, `${nombre}${ext}`);
    }
});

export const upload = multer({ storage: storage })