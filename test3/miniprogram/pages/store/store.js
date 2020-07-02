wx.cloud.init();
const db = wx.cloud.database({});
const cont = db.collection('river_data');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    store: "A饭店",
    ne:[],
    kindlist:[],
    kindres: [],
    select_kind:"",
    manulist:[],
    manures:[],
    kindinput:"",
    nameinput:"",
    priceinput:0,
    addkindhidden: true,
    addmanuhidden: true,
    warninghidden: true,
    existhidden: true,
    nocancel: false,
    deletename: "",
    deletenameid: ""
  },
  
  //点击分类
  selectkind: function (e) {
    console.log('select kind', e.currentTarget.dataset.kind)
    console.log(this.data.kindlist[e.currentTarget.dataset.kind].kind)
    this.setData({
      select_kind: this.data.kindlist[e.currentTarget.dataset.kind].kind
    })
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          manulist: res.data
        })
      }
    })
  },

  //增加分类
  addkind: function(e){
    this.setData({
      addkindhidden: false
    })
  },

  //增加菜品
  addmanu: function(e){
    this.setData({
      addmanuhidden: false
    })
  },

  //输入新增分类
  kindinput: function (e) {
    this.setData({
      kindinput: e.detail.value
    });
    console.log(this.data.kindinput)
  },

  //输入新增菜品名称
  nameinput: function(e){
    this.setData({
      nameinput: e.detail.value
    });
    console.log(this.data.nameinput)
  },

  //输入新增菜品价格
  priceinput: function (e) {
    this.setData({
      priceinput: e.detail.value
    });
    console.log(this.data.priceinput)
  },

  //取消新增分类
  addkindcancel: function () {
    this.setData({
      addkindhidden: true
    });
  },

  //取消新增菜品
  addmanucancel: function(){
    this.setData({
      addmanuhidden: true
    });
  },

  //确认新增分类
  addkindconfirm: function () {
    if(!this.data.kindinput){
      this.setData({
        warninghidden: false
      });
    }else{
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
      console.log("store:", this.data.store)
      console.log("kindinput:", this.data.kindinput)
      db.collection('kind').where({
        kind: this.data.kindinput,
        store: this.data.store
      }).get({
        success: res => {
          this.setData({
            kindres: res.data
          })
        }
      });
      console.log("kindres length:",this.data.kindres.length)
      console.log(this.data.kindres)
      if(this.data.kindres.length==0){
        db.collection('kind').add({
          data: {
            kind: this.data.kindinput,
            store: this.data.store
          },
          success: function (res) {
            console.log()
          }
        })
        this.setData({
          addkindhidden: true
        });
        db.collection('kind').where({
          store: this.data.store
        }).get({
          success: res => {
            this.setData({
              kindlist: res.data,
            })
          }
        })
        console.log("clicked confirm");
      }else{
        this.setData({
          existhidden: false,
          kindres: []
        })
      }
    }
  },

  //确认新增菜品
  addmanuconfirm: function(){
    if(!this.data.nameinput | !this.data.priceinput){
      this.setData({
        warninghidden: false
      });
    }else{
      const db = wx.cloud.database({
        env: "waimai-4ukpu"
      })
      db.collection('manu').where({
        store: this.data.store,
        kind: this.data.select_kind,
        name: this.data.nameinput
      }).get({
        success: res => {
          console.log(res.data)
          this.setData({
            manures: res.data
          })
        }
      });
      console.log("manures length:",this.data.manures.length)
      if(this.data.manures.length==0){
        db.collection('manu').add({
          data: {
            kind: this.data.select_kind,
            name: this.data.nameinput,
            price: this.data.priceinput,
            store: this.data.store
          },
          success: function (res) {
            console.log()
          }
        })
        this.setData({
          addmanuhidden: true
        });
        db.collection('manu').where({
          store: this.data.store,
          kind: this.data.select_kind
        }).get({
          success: res => {
            console.log(res.data)
            this.setData({
              manulist: res.data
            })
          }
        });
        this.setData({
          nameinput: "",
          priceinput: 0
        });
        console.log("clicked confirm");
      }else{
        this.setData({
          existhidden: false,
          manures: []
        })
      }
    }
  },
  
  warningconfirm: function(e){
    this.setData({
      warninghidden: true
    });
  },

  existconfirm: function(e){
    this.setData({
      existhidden: true
    });
  },

  deletemanu: function(e){
    this.setData({
      deletename: e.currentTarget.dataset.name
    })
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind,
      name: this.data.deletename
    }).remove();
    //console.log(this.data.deletenameid)
    db.collection('manu').where({
      store: this.data.store,
      kind: this.data.select_kind
    }).get({
      success: res => {
        //console.log(res.data)
        this.setData({
          manulist: res.data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const db = wx.cloud.database({
      env: "waimai-4ukpu"
    })
    db.collection('kind').where({
      store: this.data.store
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          kindlist: res.data
        })
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