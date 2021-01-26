<template>
   <!-- 采购管理--产品供应商推荐管理--产品供应商推荐变更-->
   <div id="app">
     <div id="head">
     	<el-breadcrumb separator="/">
     		<el-breadcrumb-item>采购管理</el-breadcrumb-item>
     		<el-breadcrumb-item>产品供应商推荐管理</el-breadcrumb-item>
     		<el-breadcrumb-item>产品供应商推荐变更</el-breadcrumb-item>
     	</el-breadcrumb>
     </div>
     <br />
     <el-divider></el-divider>

     <div>
       <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <div id="butt">
           <el-form-item>
             <div id="butt2">
               <el-button type="warning" size="medium" @click="table = true">新添加</el-button>
               <el-button type="warning" size="medium">新删除</el-button>
               <el-button type="success" size="medium" @click="onSubmit">重新提交</el-button>
               <el-button type="danger" size="medium" @click="back()">返回</el-button>
             </div>
           </el-form-item>
         </div>

         <center>
           <div id="kp">
             <el-card class="box-card">
               <h4>供应商推荐单</h4>
               <br />
               <div>
               <label class="sp1">推荐单编号：{{this.$route.query.row.id}}</label>登记人：{{this.$route.query.row.registrar}}<label>                                                    </label>
               </div>
               <br />
               <div>
               <label class="sp1">产品名称： {{this.$route.query.row.productName}}</label><label>产品编号：{{this.$route.query.row.productNo}}</label>
               </div>
               <br />
               <el-table :data="tableData" border style="width: 100%">
                 <el-table-column label="点选" width="60">
                   <template slot-scope="scope">
                     <el-checkbox v-model="checked" size="mini"></el-checkbox>
                   </template>
                 </el-table-column>
                 	<el-table-column prop="id" label="序号">
                 	</el-table-column>
                 	<el-table-column prop="supplierNo" label="供应商编号">
                 	</el-table-column>
                 	<el-table-column prop="supplierName" label="供应商名称">
                 	</el-table-column>
                 	<el-table-column prop="supplierArea" label="所在地区">
                 	</el-table-column>
                 	<el-table-column prop="supplierQualityRank" label="优质级别">
                 	</el-table-column>
                 	<el-table-column prop="supplierPhone" label="电话">
                 	</el-table-column>
                <el-table-column  label="删除">
                	<template slot-scope="scope">
                			<el-button @click="" size="mini" type="success" plain>删除</el-button>
                		</template>
                </el-table-column>
               </el-table>
               <br />
               <div>
                 <el-form-item label="变更人:">
                   <el-input class="inp2" type="text" v-model="formInline.register"></el-input>
                 </el-form-item>
                 <el-form-item label="变更时间:">
                   <el-input class="inp2" :disabled="true" type="text" v-model="formInline.registerTime"></el-input>
                 </el-form-item>
               </div>
               <br />
               <div class="sp1">
                 <el-form-item label="推荐要求:">
                   <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入内容" v-model="formInline.remark"></el-input>
                 </el-form-item>
               </div>
             </el-card>
           </div>
         </center>
       </el-form>
     </div>

      <el-drawer :visible.sync="table" direction="rtl" size="45%">
             <div>
               <el-form :inline="true" :model="formInline" class="demo-form-inline">
                 <el-form-item label="请选择供应商产品分类">
                   <el-cascader v-model="formInline.classification" :options="options" @change="handleChange"></el-cascader>
                 </el-form-item>
                 <el-form-item label="请输入采购人编号">
                   <el-input  type="text" v-model="formInline.registerTime"></el-input>
                 </el-form-item>
                 <el-button type="primary" @click="onSubmit">搜索</el-button>
                 </el-form-item>
               </el-form>
             </div>
             <br />
             <el-table :data="gridData">
               <el-table-column prop="supplierfiles.supplierNo" label="供应商编号" width="100"></el-table-column>
               <el-table-column prop="supplierfiles.supplierName" label="供应商名称" width="100"></el-table-column>
               <el-table-column prop="supplierfiles.firstKindName" label="Ⅰ级分类" width="100"></el-table-column>
               <el-table-column prop="supplierfiles.secondKindName" label="Ⅱ级分类" width="100"></el-table-column>
               <el-table-column prop="supplierfiles.threeKindName" label="Ⅲ级分类" width="100"></el-table-column>
               <el-table-column prop="supplierfiles.supplierArea" label="所在区域" width="100"></el-table-column>
               <el-table-column label="添加">
                 <template slot-scope="scope">
                   <el-button @click.native.prevent="add(scope.$index, table)" type="text" size="small">添加</el-button>
                 </template>
               </el-table-column>
             </el-table>
           </el-drawer>

   </div>
</template>

<script>
  export default {
    created() {
      this.formInline2.id=this.$route.query.row.id;
      this.formInline2.productId=this.$route.query.row.productId;
      this.formInline2.productNo=this.$route.query.row.productNo;
      this.formInline2.productName=this.$route.query.row.productName;//产品名称
      this.formInline2.productType=this.$route.query.row.productType;//用途类型
      this.formInline2.productGrade=this.$route.query.row.productGrade;//档次级别
      this.formInline2.registrar=this.$route.query.row.registrar;//登记人
      this.formInline2.registrartime=this.$route.query.row.registrartime;//登记时间
      this.formInline2.auditor=this.$route.query.row.auditor;//审核人
      this.formInline2.auditorTime=this.$route.query.row.auditorTime;//审核时间
      this.shijian();
      this.selectByParentId();
      this.selectAlloffer();
    },
    data() {
      return {
        id:0,
       amount:0,//
         sum:0,//数量
         index:0,
         table: false,
         checked: false,
         options: [{
             value: '01/电子',
             label: '01/电子',
             children: [{
               value: '01/计算机',
               label: '01/计算机',
               children: [{
                 value: '01/服务器',
                 label: '01/服务器'
               }]
             }]
           }

         ], //联动菜单
         gridData: [],
         formInline: {
           classification:'',
           bianhao:''
         },
         formInline2: {
           id:0,
           productId:'',//产品主键
           productNo:'',//产品编号
           productName:'',//产品名称
           productType:'',//用途类型
           productGrade:'',//档次级别
           registrar:'',//登记人
           registrartime:'',//登记时间
           auditor:'',//审核人
           auditorTime:'',//审核时间
           checkMark:'未审核'//审核标志
         },
         tableData: [],
         tableData2:[],
         datas:{}
       }
    },
    methods: {
      onSubmit() {
        this.$set(this.datas,'recommend',this.formInline2);
        this.$set(this.datas,'recommenddetails',this.tableData2);
        this.$http.post(this.$api+"/recommend/updateByPrimaryKey2",this.$qs.stringify(this.datas,{arrayFormat:'recommenddetails', allowDots: true}))
        	.then( res => {
                   if(res.status==200){
                   			this.$message({ message: '重新提交成功！',type: 'success',duration:1000});
                        this.$router.go(-1);
                   	}
                 })
        	.catch(err =>{
        		console.log(err)
        	})

      },
      handleChange(value) {
        console.log(value);
      },
      add(index) {
       this.index = index;
        //把数据添加到数组末尾
       this.tableData.push(this.gridData[this.index].supplierfiles);
       this.tableData2.push({
         supplierId:this.gridData[this.index].supplierfiles.id, //供应商主键
         supplierNo:this.gridData[this.index].supplierfiles.supplierNo,//供应商编号
         supplierName:this.gridData[this.index].supplierfiles.supplierName,//供应商名称
         supplierArea:this.gridData[this.index].supplierfiles.supplierArea,//供应商区域
         supplierQualityRank:this.gridData[this.index].supplierfiles.supplierQualityRank,//优质级别
         supplierPhone:this.gridData[this.index].supplierfiles.supplierPhone,//电话
         supplierFirstlinkmanName:this.gridData[this.index].supplierfiles.supplierFirstlinkmanName,//联系人主键
         offerId:this.gridData[this.index].offer.id//报价表id
       });
        //关闭所有模态框
        this.table = false
      },
      selectAlloffer() {
        var demo = new URLSearchParams()
        demo.append("goodsNo", this.$route.query.row.productNo);
        this.$http.post(this.$api+"/offer/selectAlloffer",demo)
          .then(res => {
            //alert("a");
            this.gridData = res.data;
          })
          .catch(err => {
            console.log(err)
          })
      },
      shijian(){
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        var time = "";
        time = year + "-" + month + "-" + date+ " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        this.formInline.registerTime=time;
      },
      sumlll(amount,index){
        this.tableData[index].subtotal=this.tableData[index].costPrice*parseInt(amount);
        this.sum+=parseInt(amount);
        this.formInline.amountSum=this.sum;
        this.formInline.costPriceSum+=parseInt(this.tableData[this.index].subtotal);
      },
      selectByParentId(){
        this.id=this.$route.query.row.id;
        var demo = new URLSearchParams()
        demo.append("parentId", this.id);
        this.$http.post(this.$api+'/recommenddetail/selectByParentId', demo).then((response) => {
        						this.tableData = response.data;
        				}).catch((error) => {
        					console.log(error)
        				})
      }

    }
  }
</script>

<style scoped>
  #butt {
    width: 450px;
    margin-left: 680px;
  }

  .box-card {
    width: 1000px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .sp1 {
    margin-right: 400px;
  }

  >>>.inp2>.el-input__inner {
    width: 18.75rem;
    margin-right: 200px;
    border-bottom: 1px solid #000000;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    border-radius: 0px;
  }
</style>
