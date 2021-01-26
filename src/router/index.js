import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/login/register'
import updatePassword from '@/components/login/updatePassword'
import ForgetPassword from '@/components/login/ForgetPassword'
import main from '@/components/main/main'
Vue.use(Router)

export default new Router({
  routes: [{ /* 登录页面 */
      path: '/',
      name: 'login',
      component: login
    },
    { /* 注册 */
      path: '/register',
      name: 'register',
      component: register
    },
    { /* 修改密码 */
      path: '/updatePassword',
      name: 'updatePassword',
      component: updatePassword
    },
    { /* 忘记密码 */
      path: '/ForgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    { /* 主页 */
      path: '/main',
      name: 'main',
      component: main,
      children: [{ /* 图形化 */
          path: '/report',
          name: 'report',
          component: report => require(['@/components/main/report.vue'], report)
        },
        { /* 用户管理 */
          path: '/userManagement',
          name: 'userManagement',
          component: userManagement => require(['@/components/permissions/userManagement.vue'], userManagement)
        },
        { /* 角色管理 */
          path: '/roleManagement',
          name: 'roleManagement',
          component: roleManagement => require(['@/components/permissions/roleManagement.vue'], roleManagement)
        },
        { /* 菜单管理 */
          path: '/menuManagement',
          name: 'menuManagement',
          component: menuManagement => require(['@/components/permissions/menuManagement.vue'], menuManagement)
        },
        { /* 产品档案登记 */
          path: '/registration',
          name: 'registration',
          component: registration => require(['@/components/productDesign/management/registration.vue'],
            registration)
        },
        { /* 产品档案登记复核 */
          path: '/ProductReview',
          name: 'ProductReview',
          component: ProductReview => require(['@/components/productDesign/management/ProductReview.vue'],
            ProductReview)
        },
        { /* 产品档案登记复核-复核页面 */
          path: '/ProductReview-info',
          name: 'ProductReview-info',
          component: ProductReview_info => require([
              '@/components/productDesign/management/ProductReview-info.vue'
            ],
            ProductReview_info)
        },
        { /* 产品档案查询、更改、删除 */
          path: '/ProductFileChange',
          name: 'ProductFileChange',
          component: ProductFileChange => require([
              '@/components/productDesign/management/ProductFileChange.vue'
            ],
            ProductFileChange)
        },
        { /* 产品档案查询、更改、删除-查询 */
          path: '/ProductFileEnquiryInfo',
          name: 'ProductFileEnquiryInfo',
          component: ProductFileEnquiryInfo => require([
            '@/components/productDesign/management/ProductFileEnquiry-info.vue'
          ], ProductFileEnquiryInfo)
        },
        { /* 产品档案查询、更改、删除-更改 */
          path: '/ProductFileChangeInfo',
          name: 'ProductFileChangeInfo',
          component: ProductFileChangeInfo => require([
            '@/components/productDesign/management/ProductFileChange-info.vue'
          ], ProductFileChangeInfo)
        },
        { /* 物料组成设计单审核 */
          path: '/MaterialReview',
          name: 'MaterialReview',
          component: MaterialReview => require(['@/components/productDesign/material/MaterialReview.vue'],
            MaterialReview)
        },
        { /* 物料组成设计单审核-审核页面*/
          path: '/MaterialReview-info',
          name: 'MaterialReview-info',
          component: MaterialReviewInfo => require([
              '@/components/productDesign/material/MaterialReview-info.vue'
            ],
            MaterialReviewInfo)
        },
        { /* 产品生产工序设计单审核 */
          path: '/Processdesign',
          name: 'Processdesign',
          component: Processdesign => require(['@/components/Production/process/Processdesign.vue'],
            Processdesign)
        },
        { /* 产品生产工序设计单审核-审核页面*/
          path: '/Processdesign-info',
          name: 'Processdesign-info',
          component: ProcessdesignInfo => require(['@/components/Production/process/Processdesign-info.vue'],
            ProcessdesignInfo)
        },
        { /* 工序物料设计单审核 */
          path: '/Processmaterialdesign',
          name: 'Processmaterialdesign',
          component: Processmaterialdesign => require([
            '@/components/Production/ProcessMaterials/Processmaterialdesign.vue'
          ], Processmaterialdesign)
        },
        { /* 工序物料设计单审核-审核页面*/
          path: '/Processmaterialdesign-info',
          name: 'Processmaterialdesign-info',
          meta: {
            keepAlive: true,
            isBack: false
          },
          component: ProcessmaterialdesignInfo => require([
            '@/components/Production/ProcessMaterials/Processmaterialdesign-info.vue'
          ], ProcessmaterialdesignInfo)
        },
        { /* 工序物料设计单审核-审核页面-表单详情*/
          path: '/Processmaterialdesign-info2',
          name: 'Processmaterialdesign-info2',
          component: ProcessmaterialdesignInfo2 => require([
            '@/components/Production/ProcessMaterials/Processmaterialdesign-info2.vue'
          ], ProcessmaterialdesignInfo2)
        },
        { /* 生产计划审核 */
          path: '/Productionplanreview',
          name: 'Productionplanreview',
          component: Productionplanreview => require([
              '@/components/Production/ProductionPlan/Productionplanreview.vue'
            ],
            Productionplanreview)
        },
        { /* 生产计划审核-审核页面*/
          path: '/Productionplanreview-info',
          name: 'Productionplanreview-info',
          component: ProductionplanreviewInfo => require([
            '@/components/Production/ProductionPlan/Productionplanreview-info.vue'
          ], ProductionplanreviewInfo)
        },
        { /* 产品档案查询-永久删除-恢复*/
          path: '/ProductFileDelete',
          name: 'ProductFileDelete',
          component: ProductFileDelete => require([
              '@/components/productDesign/management/ProductFileDelete.vue'
            ],
            ProductFileDelete)
        },
        { /* 生产派工单审核 */
          path: '/Workorder',
          name: 'Workorder',
          component: Workorder => require(['@/components/Production/scheduling/Workorder.vue'], Workorder)
        },
        { /* 生产派工单审核-审核页面*/
          path: '/Workorder-info',
          name: 'Workorder-info',
          component: WorkorderInfo => require(['@/components/Production/scheduling/Workorder-info.vue'],
            WorkorderInfo)
        },
        { /* 生产登记复核 */
          path: '/Productionregister',
          name: 'Productionregister',
          component: Productionregister => require(['@/components/Production/internal/Productionregister.vue'],
            Productionregister)
        },
        { /* 生产登记复核-审核页面*/
          path: '/Productionregister-info',
          meta: {
            keepAlive: true,
            isBack: false
          },
          name: 'Productionregister-info',
          component: ProductionregisterInfo => require([
              '@/components/Production/internal/Productionregister-info.vue'
            ],
            ProductionregisterInfo)
        },
        { /* 生产登记复核-审核页面-表单详情*/
          path: '/Productionregister-info2',
          name: 'Productionregister-info2',
          component: ProductionregisterInfo2 => require([
              '@/components/Production/internal/Productionregister-info2.vue'
            ],
            ProductionregisterInfo2)
        },
        { /* 物料组成设计查询-查看-变更*/
          path: '/MaterialCompositionChange',
          name: 'MaterialCompositionChange',
          component: MaterialCompositionChange => require([
            '@/components/productDesign/material/MaterialCompositionChange.vue'
          ], MaterialCompositionChange)
        },
        { /* 物料组成设计查询--查看*/
          path: '/MaterialCompositionChangeInfo',
          name: 'MaterialCompositionChangeInfo',
          component: MaterialCompositionChangeInfo => require([
            '@/components/productDesign/material/MaterialCompositionChange-info.vue'
          ], MaterialCompositionChangeInfo)
        },
        { /* 物料组成设计查询--变更*/
          path: '/MaterialCompositionChanges',
          name: 'MaterialCompositionChanges',
          component: MaterialCompositionChanges => require([
            '@/components/productDesign/material/MaterialCompositionChanges.vue'
          ], MaterialCompositionChanges)
        },
        { /* 产品生产工序设计单查询-查看-变更*/
          path: '/ProductProcessChange',
          name: 'ProductProcessChange',
          component: ProductProcessChange => require([
              '@/components/Production/process/ProductProcessChange.vue'
            ],
            ProductProcessChange)
        },
        { /* 产品生产工序设计单查询-查看*/
          path: '/ProductProcessChangeInfo',
          name: 'ProductProcessChangeInfo',
          component: ProductProcessChangeInfo => require([
            '@/components/Production/process/ProductProcessChange-info.vue'
          ], ProductProcessChangeInfo)
        },
        { /* 产品生产工序设计单查询-变更*/
          path: '/ProductProcessChanges',
          name: 'ProductProcessChanges',
          component: ProductProcessChanges => require([
              '@/components/Production/process/ProductProcessChanges.vue'
            ],
            ProductProcessChanges)
        },
        { /* 工序物料设计单查询-查看-变更*/
          path: '/MaterialDesignChange',
          name: 'MaterialDesignChange',
          component: MaterialDesignChange => require([
            '@/components/Production/ProcessMaterials/MaterialDesignChange.vue'
          ], MaterialDesignChange)
        },
        { /* 工序物料设计单查询-查看*/
          path: '/MaterialDesignChangeInfo',
          name: 'MaterialDesignChangeInfo',
          component: MaterialDesignChangeInfo => require([
            '@/components/Production/ProcessMaterials/MaterialDesignChange-info.vue'
          ], MaterialDesignChangeInfo)
        },
        { /* 工序物料设计单查询-查看-s*/
          path: '/MaterialDesignChangeInfos',
          name: 'MaterialDesignChangeInfos',
          component: MaterialDesignChangeInfos => require([
            '@/components/Production/ProcessMaterials/MaterialDesignChange-infos.vue'
          ], MaterialDesignChangeInfos)
        },
        { /* 工序物料设计单查询-变更*/
          path: '/MaterialDesignChanges',
          name: 'MaterialDesignChanges',
          component: MaterialDesignChanges => require([
            '@/components/Production/ProcessMaterials/MaterialDesignChanges.vue'
          ], MaterialDesignChanges)
        },
        { /* 工序物料设计单查询-变更-s*/
          path: '/MaterialDesignChangesInfo',
          name: 'MaterialDesignChangesInfo',
          component: MaterialDesignChangesInfo => require([
            '@/components/Production/ProcessMaterials/MaterialDesignChanges-info.vue'
          ], MaterialDesignChangesInfo)
        },
        { /* 生产计划管理-查询*/
          path: '/ProductionPlanSelect',
          name: 'ProductionPlanSelect',
          component: ProductionPlanSelect => require([
              '@/components/Production/ProductionPlan/ProductionPlanSelect.vue'
            ],
            ProductionPlanSelect)
        },
        { /* 生产计划管理-查询-s*/
          path: '/ProductionPlanSelectInfo',
          name: 'ProductionPlanSelectInfo',
          component: ProductionPlanSelectInfo => require([
            '@/components/Production/ProductionPlan/ProductionPlanSelect-info.vue'
          ], ProductionPlanSelectInfo)
        },
        { /* 安全库存配置单复核 */
          path: '/Safestock',
          name: 'Safestock',
          component: Safestock => require(['@/components/inventory/SafetyStock/Safestock.vue'], Safestock)
        },
        { /* 安全库存配置单复核-审核页面*/
          path: '/Safestock-info',
          name: 'Safestock-info',
          component: SafestockInfo => require(['@/components/inventory/SafetyStock/Safestock-info.vue'],
            SafestockInfo)
        },
        { /* 生产派工单查询*/
          path: '/ProductionDispatchSelect',
          name: 'ProductionDispatchSelect',
          component: ProductionDispatchSelect => require([
            '@/components/Production/scheduling/ProductionDispatchSelect.vue'
          ], ProductionDispatchSelect)
        },
        { /* 生产派工单查询-s*/
          path: '/ProductionDispatchSelectInfo',
          name: 'ProductionDispatchSelectInfo',
          component: ProductionDispatchSelectInfo => require([
            '@/components/Production/scheduling/ProductionDispatchSelect-info.vue'
          ], ProductionDispatchSelectInfo)
        },
        { /* 生产查询*/
          path: '/ProductionSelect',
          name: 'ProductionSelect',
          component: ProductionSelect => require(['@/components/Production/internal/ProductionSelect.vue'],
            ProductionSelect)
        },
        { /* 生产查询-s*/
          path: '/ProductionSelectInfo',
          name: 'ProductionSelectInfo',
          component: ProductionSelectInfo => require([
              '@/components/Production/internal/ProductionSelect-info.vue'
            ],
            ProductionSelectInfo)
        },
        { /* 入库申请登记审核 */
          path: '/Joinregister',
          name: 'Joinregister',
          component: Joinregister => require(['@/components/inventory/enterRequest/Joinregister.vue'],
            Joinregister)
        },
        { /* 入库申请登记审核-审核页面*/
          path: '/Joinregister-info',
          name: 'Joinregister-info',
          component: JoinregisterInfo => require(['@/components/inventory/enterRequest/Joinregister-info.vue'],
            JoinregisterInfo)
        },
        { /* 安全库存配置单-查看-变更*/
          path: '/InventoryConfigurationChange',
          name: 'InventoryConfigurationChange',
          component: InventoryConfigurationChange => require([
            '@/components/inventory/SafetyStock/InventoryConfigurationChange.vue'
          ], InventoryConfigurationChange)
        },
        { /* 安全库存配置单-查看*/
          path: '/InventoryConfigurationChangeInfo',
          name: 'InventoryConfigurationChangeInfo',
          component: InventoryConfigurationChangeInfo => require([
            '@/components/inventory/SafetyStock/InventoryConfigurationChange-info.vue'
          ], InventoryConfigurationChangeInfo)
        },
        { /* 安全库存配置单-变更*/
          path: '/InventoryConfigurationChanges',
          name: 'InventoryConfigurationChanges',
          component: InventoryConfigurationChanges => require([
            '@/components/inventory/SafetyStock/InventoryConfigurationChanges.vue'
          ], InventoryConfigurationChanges)
        },
        { /* 出库申请登记审核 */
          path: '/Outregister',
          name: 'Outregister',
          component: Outregister => require(['@/components/inventory/comeoutRequest/Outregister.vue'],
            Outregister)
        },
        { /* 出库申请登记审核-审核页面*/
          path: '/Outregister-info',
          name: 'Outregister-info',
          component: OutregisterInfo => require(['@/components/inventory/comeoutRequest/Outregister-info.vue'],
            OutregisterInfo)
        },
        { /* 入库申请查询-查看*/
          path: '/WarehousingApplicationSelect',
          name: 'WarehousingApplicationSelect',
          component: WarehousingApplicationSelect => require([
            '@/components/inventory/enterRequest/WarehousingApplicationSelect.vue'
          ], WarehousingApplicationSelect)
        },
        { /* 入库申请查询-查看-s*/
          path: '/WarehousingApplicationSelectInfo',
          name: 'WarehousingApplicationSelectInfo',
          component: WarehousingApplicationSelectInfo => require([
            '@/components/inventory/enterRequest/WarehousingApplicationSelect-info.vue'
          ], WarehousingApplicationSelectInfo)
        },
        { /* 制定物料组成设计单*/
          path: '/Productchanges',
          name: 'Productchanges',
          component: Productchanges => require(['@/components/productDesign/material/Productchanges.vue'],
            Productchanges)
        },
        { /* 制定物料组成设计单2*/
          path: '/Productchanges2',
          name: 'Productchanges2',
          component: Productchanges2 => require(['@/components/productDesign/material/Productchanges2.vue'],
            Productchanges2)
        },
        { /* 入库申请查询-查看-s*/
          path: '/OutboundApplicationSelect',
          name: 'OutboundApplicationSelect',
          component: OutboundApplicationSelect => require([
            '@/components/inventory/comeoutRequest/OutboundApplicationSelect.vue'
          ], OutboundApplicationSelect)
        },
        { /* 入库申请查询-查看-s*/
          path: '/OutboundApplicationSelectInfo',
          name: 'OutboundApplicationSelectInfo',
          component: OutboundApplicationSelectInfo => require([
            '@/components/inventory/comeoutRequest/OutboundApplicationSelect-info.vue'
          ], OutboundApplicationSelectInfo)
        },
        { /* 入库查询*/
          path: '/WarehouseQueries',
          name: 'WarehouseQueries',
          component: WarehouseQueries => require(['@/components/inventory/enterAdmin/WarehouseQueries.vue'],
            WarehouseQueries)
        },
        { /* 入库查询-s*/
          path: '/WarehouseQueriesInfo',
          name: 'WarehouseQueriesInfo',
          component: WarehouseQueriesInfo => require([
              '@/components/inventory/enterAdmin/WarehouseQueries-info.vue'
            ],
            WarehouseQueriesInfo)
        },
        { /* 入库登记复核 */
          path: '/Joinbankregister',
          name: 'Joinbankregister',
          component: Joinbankregister => require(['@/components/inventory/enterAdmin/Joinbankregister.vue'],
            Joinbankregister)
        },
        { /* 入库登记复核-审核页面*/
          path: '/Joinbankregister-info',
          name: 'Joinbankregister-info',
          component: JoinbankregisterInfo => require([
              '@/components/inventory/enterAdmin/Joinbankregister-info.vue'
            ],
            JoinbankregisterInfo)
        },
        { /* 出库申请登记审核 */
          path: '/Outbankregister',
          name: 'Outbankregister',
          component: Outbankregister => require(['@/components/inventory/comeoutAdmin/Outbankregister.vue'],
            Outbankregister)
        },
        { /* 出库申请登记审核-审核页面*/
          path: '/Outbankregister-info',
          name: 'Outbankregister-info',
          component: OutbankregisterInfo => require([
              '@/components/inventory/comeoutAdmin/Outbankregister-info.vue'
            ],
            OutbankregisterInfo)
        },
        { /* 出库查询*/
          path: '/OutboundQuery',
          name: 'OutboundQuery',
          component: OutboundQuery => require(['@/components/inventory/comeoutAdmin/OutboundQuery.vue'],
            OutboundQuery)
        },
        { /* 出库查询-s*/
          path: '/OutboundQueryInfo',
          name: 'OutboundQueryInfo',
          component: OutboundQueryInfo => require(['@/components/inventory/comeoutAdmin/OutboundQuery-info.vue'],
            OutboundQueryInfo)
        },
        { /* 动态库存查询*/
          path: '/DynamicInventorySelect',
          name: 'DynamicInventorySelect',
          component: DynamicInventorySelect => require([
              '@/components/inventory/dynamic/DynamicInventorySelect.vue'
            ],
            DynamicInventorySelect)
        },
        { /* 制定安全库存配置单*/
          path: '/allocationlist',
          name: 'allocationlist',
          component: allocationlist => require(['@/components/inventory/SafetyStock/allocationlist.vue'],
            allocationlist)
        },
        { /* 制定安全库存配置单2*/
          path: '/allocationlist2',
          name: 'allocationlist2',
          component: allocationlist2 => require(['@/components/inventory/SafetyStock/allocationlist2.vue'],
            allocationlist2)
        },
        { /* 入库申请登记*/
          path: '/warehouse',
          name: 'warehouse',
          component: warehouse => require(['@/components/inventory/enterRequest/warehouse.vue'], warehouse)
        },
        { /* 制定出库单*/
          path: '/chuku',
          name: 'chuku',
          component: chuku => require(['@/components/inventory/dispatch/chuku.vue'], chuku)
        },
        { /* 制定出库单2*/
          path: '/chuku2',
          name: 'chuku2',
          component: chuku2 => require(['@/components/inventory/dispatch/chuku2.vue'], chuku2)
        },
        { /* 制定出库单3*/
          path: '/chuku3',
          name: 'chuku3',
          component: chuku3 => require(['../components/inventory/dispatch/chuku3.vue'], chuku3)
        },
        { /* 制定入库单*/
          path: '/delivery',
          name: 'delivery',
          component: delivery => require(['@/components/inventory/dispatch/delivery.vue'], delivery)
        },
        { /* 制定入库单2*/
          path: '/delivery2',
          name: 'delivery2',
          component: delivery2 => require(['@/components/inventory/dispatch/delivery2.vue'], delivery2)
        },
        { /* 制定入库单3*/
          path: '/delivery3',
          name: 'delivery3',
          component: delivery3 => require(['@/components/inventory/dispatch/delivery3.vue'], delivery3)
        },
        { /* 制定产品生产工序设计单*/
          path: '/shengchan',
          name: 'shengchan',
          component: shengchan => require(['@/components/Production//process/shengchan.vue'], shengchan)
        },
        { /* 制定工序物料设计单*/
          path: '/wuliao',
          name: 'wuliao',
          component: wuliao => require(['@/components/Production/ProcessMaterials/wuliao.vue'], wuliao)
        },
        { /* 制定工序物料设计单2*/
          path: '/wuliao2',
          name: 'wuliao2',
          component: wuliao2 => require(['@/components/Production/ProcessMaterials/wuliao2.vue'], wuliao2),
          meta: {
            keepAlive: true,
            isBack: false
          },
          component: wuliao2 => require(['@/components/Production/ProcessMaterials/wuliao2.vue'], wuliao2)
        },
        { /* 制定工序物料设计单3*/
          path: '/wuliao3',
          name: 'wuliao3',
          component: wuliao3 => require(['@/components/Production/ProcessMaterials/wuliao3.vue'], wuliao3)
        },
        { /* 制定工序物料设计单4*/
          path: '/wuliao4',
          name: 'wuliao4',
          component: wuliao4 => require(['@/components/Production/ProcessMaterials/wuliao4.vue'], wuliao4)
        },
        { /* 新发生生产计划登记*/
          path: '/xinshengchan',
          name: 'xinshengchan',
          component: xinshengchan => require(['@/components/Production/ProductionPlan/xinshengchan.vue'],
            xinshengchan)
        },
        { /* 制定生产派工单*/
          path: '/paigong',
          name: 'paigong',
          component: paigong => require(['@/components/Production/scheduling/paigong.vue'], paigong)
        },
        { /* 制定生产派工单2*/
          path: '/paigong2',
          name: 'paigong2',
          meta: {
            keepAlive: true,
            isBack: false
          },
          component: paigong2 => require(['@/components/Production/scheduling/paigong2.vue'], paigong2)
        },
        { /* 制定生产派工单3*/
          path: '/paigong3',
          name: 'paigong3',
          component: paigong3 => require(['@/components/Production/scheduling/paigong3.vue'], paigong3)
        },

        { /* 生产登记*/
          path: '/dengji',
          name: 'dengji',
          component: dengji => require(['@/components/Production/internal/dengji.vue'], dengji)
        },
        { /* 生产登记2*/
          path: '/dengji2',
          name: 'dengji2',
          meta: {
            keepAlive: true,
            isBack: false
          },
          component: dengji2 => require(['@/components/Production/internal/dengji2.vue'], dengji2)
        },
        { /* 生产登记3*/
          path: '/dengji3',
          name: 'dengji3',
          component: dengji3 => require(['@/components/Production/internal/dengji3.vue'], dengji3)
        },
        { /* 出库申请登记*/
          path: '/chukshenq',
          name: 'chukshenq',
          component: chukshenq => require(['@/components/inventory/comeoutRequest/chukshenq.vue'], chukshenq)
        },
        { /*产品生产工序设计单-设计 */
          path: '/shengchanInfo',
          name: 'shengchanInfo',
          component: shengchanInfo => require(['@/components/Production/process/shenngchan-info.vue'],
            shengchanInfo)
        },
        { /*入库登记 */
          path: '/ruku',
          name: 'ruku',
          component: ruku => require(['@/components/inventory/enterAdmin/ruku.vue'], ruku)
        },
        { /*入库登记 */
          path: '/ruku2',
          name: 'ruku2',
          component: ruku2 => require(['@/components/inventory/enterAdmin/ruku2.vue'], ruku2)
        },
        { /*出库登记 */
          path: '/cku',
          name: 'cku',
          component: cku => require(['@/components/inventory/comeoutAdmin/cku.vue'], cku)
        },
        { /*出库登记 */
          path: '/cku2',
          name: 'cku2',
          component: cku2 => require(['@/components/inventory/comeoutAdmin/cku2.vue'], cku2)
        },
        { /*供应商申请审批登记 */
          path: '/ApplyForRegistration',
          name: 'ApplyForRegistration',
          component: ApplyForRegistration => require([
            '@/components/procurement/SupplierApplication/ApplyForRegistration.vue'
          ], ApplyForRegistration)
        },
        { /*供应商申请审批登记-info */
          path: '/ApplyForRegistrationInfo',
          name: 'ApplyForRegistrationInfo',
          component: ApplyForRegistrationInfo => require([
            '@/components/procurement/SupplierApplication/ApplyForRegistrationInfo.vue'
          ], ApplyForRegistrationInfo)
        },
        { /*供应商申请审批登记-s */
          path: '/ApplyForRegistrations',
          name: 'ApplyForRegistrations',
          component: ApplyForRegistrations => require([
            '@/components/procurement/SupplierApplication/ApplyForRegistrations.vue'
          ], ApplyForRegistrations)
        },
        { /*供应商申请审批登记审核*/
          path: '/VerificationRequest',
          name: 'VerificationRequest',
          component: VerificationRequest => require([
            '@/components/procurement/SupplierApplication/VerificationRequest.vue'
          ], VerificationRequest)
        },
        { /*供应商申请审批登记审核-s*/
          path: '/VerificationRequests',
          name: 'VerificationRequests',
          component: VerificationRequests => require([
            '@/components/procurement/SupplierApplication/VerificationRequests.vue'
          ], VerificationRequests)
        },
        { /*供应商申请查询-变更*/
          path: '/RequestForChanges',
          name: 'RequestForChanges',
          component: RequestForChanges => require([
              '@/components/procurement/SupplierApplication/RequestForChanges.vue'
            ],
            RequestForChanges)
        },
        { /*供应商申请查询-变更-查看*/
          path: '/RequestForChangeslook',
          name: 'RequestForChangeslook',
          component: RequestForChangeslook => require([
            '@/components/procurement/SupplierApplication/RequestForChangeslook.vue'
          ], RequestForChangeslook)
        },
        { /*供应商申请查询-变更-变更*/
          path: '/RequestForChangesInfo',
          name: 'RequestForChangesInfo',
          component: RequestForChangesInfo => require([
            '@/components/procurement/SupplierApplication/RequestForChangesInfo.vue'
          ], RequestForChangesInfo)
        },
        { /*供应商申请查询-处理*/
          path: '/RequestDispose',
          name: 'RequestDispose',
          component: RequestDispose => require([
              '@/components/procurement/SupplierApplication/RequestDispose.vue'
            ],
            RequestDispose)
        },
        { /*供应商申请查询-处理-s*/
          path: '/RequestDisposes',
          name: 'RequestDisposes',
          component: RequestDisposes => require([
              '@/components/procurement/SupplierApplication/RequestDisposes.vue'
            ],
            RequestDisposes)
        },
        { /*数据报表excel*/
          path: '/DataReportExcel',
          name: 'DataReportExcel',
          component: DataReportExcel => require(['@/components/procurement/DataReport/DataReportExcel.vue'],
            DataReportExcel)
        },
        { /*制定采购执行单 */
          path: '/purchaseOrder',
          name: 'purchaseOrder',
          component: purchaseOrder => require(['@/components/procurement/scheduling/purchaseOrder.vue'],
            purchaseOrder)
        },
        { /*制定采购执行单 */
          path: '/purchaseOrderInfo',
          name: 'purchaseOrderInfo',
          component: purchaseOrderInfo => require(['@/components/procurement/scheduling/purchaseOrder-info.vue'],
            purchaseOrderInfo)
        },
        { /*采购执行单审核 */
          path: '/purchaseOrderAudit',
          name: 'purchaseOrderAudit',
          component: purchaseOrderAudit => require([
              '@/components/procurement/scheduling/purchaseOrder-Audit.vue'
            ],
            purchaseOrderAudit)
        },
        { /*采购执行单审核 */
          path: '/purchaseOrderAuditinfo',
          name: 'purchaseOrderAuditinfo',
          component: purchaseOrderAuditinfo => require([
            '@/components/procurement/scheduling/purchaseOrder-Audit-info.vue'
          ], purchaseOrderAuditinfo)
        },
        { /*采购执行单查询 */
          path: '/purchaseOrderSelect',
          name: 'purchaseOrderSelect',
          component: purchaseOrderSelect => require([
              '@/components/procurement/scheduling/purchaseOrderSelect.vue'
            ],
            purchaseOrderSelect)
        },
        { /*产品供应商推荐登记 */
          path: '/supplierRegistration',
          name: 'supplierRegistration',
          component: supplierRegistration => require([
              '@/components/procurement/recommend/supplierRegistration.vue'
            ],
            supplierRegistration)
        },
        { /*产品供应商推荐登记 */
          path: '/supplierRegistration2',
          name: 'supplierRegistration2',
          component: supplierRegistration2 => require([
              '@/components/procurement/recommend/supplierRegistration2.vue'
            ],
            supplierRegistration2)
        },
        { /*产品供应商档案登记 */
          path: '/Infostration',
          name: 'Infostration',
          component: Infostration => require(['@/components/procurement/supplierprofile/Infostration.vue'],
            Infostration)
        },
        { /*供应商档案登记 */
          path: '/Infostration',
          name: 'Infostration',
          component: Infostration => require(['@/components/procurement/supplierprofile/Infostration.vue'],
            Infostration)
        },
        { /*供应商档案登记复核列表 */
          path: '/Infostrationreview',
          name: 'Infostrationreview',
          component: Infostrationreview => require([
              '@/components/procurement/supplierprofile/Infostrationreview.vue'
            ],
            Infostrationreview)
        },
        { /*供应商档案登记复核页面*/
          path: '/Infostrationreview2',
          name: 'Infostrationreview2',
          component: Infostrationreview2 => require([
              '@/components/procurement/supplierprofile/Infostrationreview2.vue'
            ],
            Infostrationreview2)
        },
        { /*供应商档案查询、删除、变更页面*/
          path: '/InfoChange',
          name: 'InfoChange',
          component: InfoChange => require(['@/components/procurement/supplierprofile/InfoChange.vue'],
            InfoChange)
        },
        { /*供应商档案变更页面*/
          path: '/InfoChange2',
          name: 'InfoChange2',
          component: InfoChange2 => require(['@/components/procurement/supplierprofile/InfoChange2.vue'],
            InfoChange2)
        },
        { /*供应商档案信息详情页面*/
          path: '/InfoChangeinfo',
          name: 'InfoChangeinfo',
          component: InfoChangeinfo => require(['@/components/procurement/supplierprofile/InfoChange-info.vue'],
            InfoChangeinfo)
        },
        { /*供应商档案永久删除与恢复页面*/
          path: '/InfoDelete',
          name: 'InfoDelete',
          component: InfoDelete => require(['@/components/procurement/supplierprofile/InfoDelete.vue'],
            InfoDelete)
        },
        { /*供应商档案永久删除与恢复页面*/
          path: '/InfoChange-info',
          name: 'InfoChangeinfo',
          component: InfoChangeinfo => require(['@/components/procurement/supplierprofile/InfoChange-info.vue'],
            InfoChangeinfo)
        },
        { /*发票信息登记列表*/
          path: '/Invoicestration',
          name: 'Invoicestration',
          component: Invoicestration => require([
              '@/components/procurement/invoicemanagement/Invoicestration.vue'
            ],
            Invoicestration)
        },
        { /*发票信息登记*/
          path: '/Invoicestration2',
          name: 'Invoicestration2',
          component: Invoicestration2 => require([
              '@/components/procurement/invoicemanagement/Invoicestration2.vue'
            ],
            Invoicestration2)
        },
        { /*发票信息登记复核列表*/
          path: '/Invoicestrationreview',
          name: 'Invoicestrationreview',
          component: Invoicestrationreview => require([
            '@/components/procurement/invoicemanagement/Invoicestrationreview.vue'
          ], Invoicestrationreview)
        },
        { /*发票信息登记复核*/
          path: '/Invoicestrationreview2',
          name: 'Invoicestrationreview2',
          component: Invoicestrationreview2 => require([
            '@/components/procurement/invoicemanagement/Invoicestrationreview2.vue'
          ], Invoicestrationreview2)
        },
        { /*发票信息查询*/
          path: '/Invoicequery',
          name: 'Invoicequery',
          component: Invoicequery => require(['@/components/procurement/invoicemanagement/Invoicequery.vue'],
            Invoicequery)
        },
        { /*发票详细信息查询*/
          path: '/Invoicequery2',
          name: 'Invoicequery2',
          component: Invoicequery2 => require(['@/components/procurement/invoicemanagement/Invoicequery2.vue'],
            Invoicequery2)
        },
        { /*质检结果登记 */
          path: '/qualitydJ',
          name: 'qualitydJ',
          component: qualitydJ => require(['@/components/procurement/quality/qualitydJ.vue'],
            qualitydJ)
        },
        { /*质检结果登记 */
          path: '/qualitydj2',
          name: 'qualitydj2',
          component: qualitydj2 => require(['@/components/procurement/quality/qualitydj2.vue'],
            qualitydj2)
        },
        { /*质检结果登记复核 */
          path: '/qualitysh',
          name: 'qualitysh',
          component: qualitysh => require(['@/components/procurement/quality/qualitysh.vue'],
            qualitysh)
        },
        { /*质检结果登记复核 */
          path: '/qualitysh2',
          name: 'qualitysh2',
          component: qualitysh2 => require(['@/components/procurement/quality/qualitysh2.vue'],
            qualitysh2)
        },
        { /*产品供应商推荐登记 */
          path: '/audit',
          name: 'audit',
          component: audit => require(['@/components/procurement/recommend/audit.vue'],
            audit)
        },
        { /*产品供应商推荐登记 */
          path: '/audit2',
          name: 'audit2',
          component: audit2 => require(['@/components/procurement/recommend/audit2.vue'],
            audit2)
        },
        { /*产品供应商推荐登记--查询 */
          path: '/query',
          name: 'query',
          component: query => require(['@/components/procurement/recommend/query.vue'],
            query)
        },
        { /*采购管理--采购计划管理--新发生采购计划登记 */
          path: '/plan',
          name: 'plan',
          component: plan => require(['@/components/procurement/procurementplan/plan.vue'],
            plan)
        },
        { /*采购管理--采购计划管理--采购计划审核 */
          path: '/review',
          name: 'review',
          component: review => require(['@/components/procurement/procurementplan/review.vue'],
            review)
        },
        { /*采购管理--采购计划管理--采购计划审核 */
          path: '/review2',
          name: 'review2',
          component: review2 => require(['@/components/procurement/procurementplan/review2.vue'],
            review2)
        },
        { /*采购管理--采购计划管理--采购计划查询 */
          path: '/Planquery',
          name: 'Planquery',
          component: Planquery => require(['@/components/procurement/procurementplan/Planquery.vue'],
            Planquery)
        },
        { /*产品供应商推荐变更 */
          path: '/changes',
          name: 'changes',
          component: changes => require(['@/components/procurement/recommend/changes.vue'],
            changes)
        },
        { /*产品供应商推荐变更 */
          path: '/changes2',
          name: 'changes2',
          component: changes2 => require(['@/components/procurement/recommend/changes2.vue'],
            changes2)
        },
        { /*产品供应商推荐登记--查询 */
          path: '/query',
          name: 'query',
          component: query => require(['@/components/procurement/recommend/query.vue'],
            query)
        },
        { /*采购管理--采购计划管理--新发生采购计划登记 */
          path: '/plan',
          name: 'plan',
          component: plan => require(['@/components/procurement/procurementplan/plan.vue'],
            plan)
        },
        { /*采购管理--采购计划管理--采购计划审核 */
          path: '/review',
          name: 'review',
          component: review => require(['@/components/procurement/procurementplan/review.vue'],
            review)
        },
        { /*采购管理--采购计划管理--采购计划审核 */
          path: '/review2',
          name: 'review2',
          component: review2 => require(['@/components/procurement/procurementplan/review2.vue'],
            review2)
        },
        { /*采购管理--采购计划管理--采购计划查询 */
          path: '/Planquery',
          name: 'Planquery',
          component: Planquery => require(['@/components/procurement/procurementplan/Planquery.vue'],
            Planquery)
        }
      ]
    }
  ]
})
