// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'


const TOP_DISTANCE = 1000;
const types = ['pop','new','sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {page: 0, list: []},
      new: {page: 0, list: []},
      sell: {page: 0, list: []}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 1. 请求轮播图 推荐数据
    this._getMultidata()

    // 2. 请求商品数据
    // this._getGoodsData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  //-------------------------网络请求函数------------------
  _getMultidata(){
    getMultiData().then(res => {
      // 请求轮播图和推荐数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      // 把banner和recommend放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },

  _getGoodsData(type){
    // 1. 获取页码
    const page = this.data.goods[type].page + 1;

    // 2. 发送网络请求
    getGoodsData(type, page).then(res => {
      // 2.1取出数据
      const list = res.data.data.list;
      // console.log(res)
      // 2.2数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);
      // 2.3 数据设置到data的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

  //------------------------事件监听函数----------------------
  handleTabClick(event) {
    //取出index 
    const index = event.detail.index;
    
    //设置currentType
    this.setData({
      currentType: types[index]
    }) 
  },

  //上拉加载更多
  onReachBottom() {
    this._getGoodsData(this.data.currentType)
  },

  onPageScroll(options) {
    //1.取出scrollTop
    const scrollTop = options.scrollTop;

    //2.修改showBackTop的属性
    this.setData({
      showBackTop: scrollTop >= TOP_DISTANCE
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})