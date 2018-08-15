var vm=new Vue({
	el:'.container',
	data:{
		limitNumber:3,
			addresslist:[],
			curIndex:0,
			shipping:1
	},
	mounted:function(){
		this.$nextTick(function(){
				vm.getAddressList();
		});
	},
	computed:{
      filterItems:function(){
				return this.addresslist.slice(0,this.limitNumber);
			}
	}
	,
	methods:{
		getAddressList:function(){
			var _this=this;
			this.$http.get('data/address.json',{'id':123}).then(function(res){
				console.log(res);
					var res=res.data;
					if(res.status==0){
						_this.addresslist=res.result;
					}
			});
		}
		,
		shoppingMethod:function(){

		}
		,
		showOrHide:function(){

				this.limitNumber=10;
		}
		,
		setDefault:function(addressId){
			this.addresslist.forEach(
				function(item,index){
					if(item.addressId==addressId)
					{
						item.isDefault=true;
					}else{
						item.isDefault=false;
					}
				}
			)
		}

	},

});
