import { Service } from 'egg';

/**
 * role Service
 */
export default class OrderService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.GoodOrder.findAndCountAll({
            limit: +pageSize,
            offset: pageSize * (page-1),
            include:[{
                model: this.app.model.SystemFile,as:'thumbnailImage'
            }]
        })
        return list;
    }
    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async select() {
        let list = await this.app.model.GoodOrder.findAll()
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        let results = { code: 400, message: "失败" }
        let mechantModel = await this.app.model.Merchant.findOne({where:{id: options.mechantId}});;
        let addressModel = await this.app.model.UserAddress.findOne({where:{id: options.addressId}});

        if(!addressModel){
            results = { code: 0, message: "添加成功", }
            return results
        }
        let orderModel = {
            addressId: options.addressId,
            address: addressModel.province+addressModel.city+addressModel.district+addressModel.township+addressModel.place,
            linkMan: addressModel.linkMan,
            linkPhone: addressModel.linkPhone,
            goodsTotalQty: options.goodList.length,
            totalAmount: options.goodList.reduce((next,cur)=>next+cur.salePrice*cur.qty,0),
            merchantId: options.mechantId,
            shopName: mechantModel.name,
            remark: options.remark,
            userId: ctx.session.user.id,
            userName: ctx.session.user.name
        }
        const order = await ctx.model.GoodOrder['create'](orderModel)
        .then((res) => {
            results = { code: 0, message: "添加成功", }
            return res
        }).catch(err => {
            results = { code: 400, message: err, }
        })
        const { Op } = this.app.Sequelize;
        const goods = await this.app.model.Good.findAll({
            where: {
                [Op.or]:{
                    id: options.goodList.map(item=>item.id)
                }
            },
            include:[
                {model: this.app.model.SystemFile,as:'thumbnailImage'}
            ]
        }) 
        const goodLines = options.goodList.map(item=>{
            const good = goods.find(g=>g.id==item.id)
            return {
                goodId: item.id,
                goodName: good.name,
                salePrice: good.salePrice,
                marketPrice: good.marketPrice,
                qty: item.qty,
                amount: good.salePrice * item.qty,
                orderId: order.id,
                goodPic: good.thumbnailImage.url,
                goodSpecId: item.goodSpecId,
                goodSpecName: item.goodSpecName,
                goodCategoryName: item.goodCategoryName,
                goodCategoryId: item.goodCategoryId,
            }
        })
        await this.ctx.model.GoodOrderLine.bulkCreate(goodLines);
        return results
    }

    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.GoodOrder.findOne({
            where: {id}
        })
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.GoodOrder.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }

}
