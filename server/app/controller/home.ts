import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const fs = require('mz/fs');
const path = require('path')
const dayjs = require('dayjs');
const pump = require('mz-modules/pump');

export default class HomeController extends Controller {
    @bp.get('/')
    public async index() {
        const { ctx } = this;
        ctx.body = "欢迎访问eggjs-admin"
    }
    @bp.get('/test')
    public async test() {
        const { ctx } = this;
        ctx.success()
    }
    @bp.post('/api/file/upload')
    async fileupload() {
        const { ctx } = this;
        const files = ctx.request.files;
        // ctx.logger.warn('files: %j', files);
        const images=<any>[]
        try {
          for (const file of files) {
            // const filename = file.filename.toLowerCase();
            // 基础的目录
            const uplaodBasePath = 'app/public/uploads';
            // 生成文件名
            const filename = `${Date.now()}${Math.random() * 1000}${path.extname(file.filename).toLocaleLowerCase()}`;
            // 生成文件夹
            const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
            function mkdirsSync(dirname) {
                if (fs.existsSync(dirname)) {
                    return true;
                } else {
                    if (mkdirsSync(path.dirname(dirname))) {
                        fs.mkdirSync(dirname);
                        return true;
                    }
                }
            }
            mkdirsSync(path.join(uplaodBasePath, dirname));
            // 生成写入路径
            const targetPath = path.join(uplaodBasePath, dirname, filename);
            
            // const targetPath = path.join(this.config.baseDir, 'app/public', filename);
            const source = fs.createReadStream(file.filepath);
            const target = fs.createWriteStream(targetPath);
            await pump(source, target);
            const fileStat = fs.statSync(targetPath)
            const image = {
                format: file.mime,
                url: '/public/uploads/'+ dirname+ '/'+filename,
                path:  targetPath,
                size: fileStat.size,
                name: filename,
                type: file.mime.split('/').shift(),
                creator: ctx.session.user && ctx.session.user.id
            }
            const iobj = await this.app.model.SystemFile.create(image)
            images.push(iobj)
            // ctx.logger.warn('save %s to %s', file.filepath, targetPath);
          }
        } finally {
          // delete those request tmp files
          await ctx.cleanupRequestFiles();
        }
        
        await ctx.success(images.length>1?images:images[0])
    }
}
