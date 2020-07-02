// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:"A饭店",
    orderlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('order').where({
      store: this.data.store
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          orderlist: res.data
        })
        console.log("aaa", this.data.orderlist)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})