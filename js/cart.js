 var vm=new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkALlFlag:false,
		delFlag:false,
		curProduct:''
	},
	filters:{
      formatMoney:function(value){
        return value.toFixed(3)+'$';
      }
	},
	mounted:function(){
		this.$nextTick(function(){
      vm.cartView();
    });
	},
	methods:{

		cartView:function(){
			let _this = this;

			this.$http.get("data/cartData.json",{"id":123}).then(res=>{
  				this.productList = res.data.result.list;
      });
		},

    changeMoney:function(item,type){
      if(type==-1){
        item.productQuantity--;
        if(item.productQuantity<1){
            item.productQuantity=  1;
        }
      }else if(type == 1){
        item.productQuantity++;
      }
      this.calcTotalPrice();
    },
    selectedProduct:function(item){
      if(typeof item.checked =='undefined')
      {
        Vue.set(item,'checked',true);
      }else
      {
        item.checked=!item.checked;
      }
      this.calcTotalPrice();
    },

    checkAll:function(value){
        this.checkALlFlag=value;
        this.productList.forEach(function(item ,index){
          if(typeof item.checked =='undefined')
          {
            Vue.set(item,'checked',value);
          }else
          {
            item.checked=value;
          }
        });
        // var _this=this;
        // for(item in this.productList){
        //     if(typeof item.checked =='undefined')
        //     {
        //       _this.$set(item,'checked',value);
        //     }else
        //     {
        //       item.checked=value;
        //     }
        // }
        this.calcTotalPrice();
    },
    calcTotalPrice:function(){
      var _this=this;
      _this.totalMoney =0;
      this.productList.forEach(function(item,index){
          if(item.checked){
            _this.totalMoney+=item.productPrice*item.productQuantity;
          }
      });
    },
    delConfirm:function(item){
      this.delFlag=true;
      this.curProduct=item;
    },
    delProduct:function(){
      var index=this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.delFlag=false;
    }

  }

});
Vue.filter('money',function(value,type){
  return  '¥'+value.toFixed(3)+type;
})
